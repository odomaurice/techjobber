const validateSignupSchema = require('../../services/user/validateSignupSchema')
const { checkEmailExists, signupUser } = require('../../services/user/user.service') 
const { sendMail }  = require('../../Utils/mail/sendMail')
const crypto = require('crypto')


const SignupHandler = async function(req, res, next)
    {
        try 
        {
         

          console.log(' Signing Up new User  ') 

           // Validate Signup Schema 
            await validateSignupSchema( req.body ) 
           
           // Check If Email Used Already 
            await checkEmailExists( req.body.email ) 

            // signup user 
           const emailVerificationCode = crypto.randomBytes(16).toString('hex') 
           req.body.emailVerificationCode = emailVerificationCode 
           const newUser =  await signupUser( req.body ) 

           // Send Signup mail 
           const mailDoc = 
           {
               from:'fibrelearn@gmail.com',
               to: req.body.email, 
               subject:'Verify Email',
               text:' Welcome to tech Jobber, please verify your email to continue ',
               html: null 
           }


           const mailVariables = 
           { firstname: req.body.firstname, emailVerificationLink: `http://${req.headers.host}/api/v1/verifyEmail/${emailVerificationCode}`}
           await sendMail('verifyEmail', mailDoc,mailVariables)


           // Signup successfull 
           console.log(' New User signup successfull ') 
           return res.status(201).json({ success: true, msg:"new user created successfully ", newUser })
        }
        catch(e)
        {

           // Error Variables 
           const errorType = e.type 
           const errorMsg = e.message 

           console.log(errorType)
           // Send Error response 
           switch( errorType )
           {
                case 'server': 
                                return res.render('pages/serverError',{error: errorMsg})
                

                case 'schema':
                case 'emailAlreadyRegistered':
                               return res.render('pages/user/signup',{ error: errorMsg })

                default: 
                        return res.status(500).json({success: false, msg:'unknown error type '})
           }

        }
    }


const getSignupPage = function(req, res, next)
{
    try 
    {
        var error = req.flash('error')
        res.render('pages/user/signup',{ error })
    }
    catch(e)
    {
        console.log('Error occured while getting signup page ')
        console.log(e) 
        res.render('pages/serverError',{ error: e }) 
    }
}



module.exports = { SignupHandler, getSignupPage  }
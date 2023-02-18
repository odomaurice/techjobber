require('dotenv').config() 


// Validation Schemas 
const validateSignupSchema = require('../../services/user/validateSignupSchema')

// Services 
const { checkEmailExists, signupUser, findUserWithEmail } = require('../../services/user/user.service') 
const { createUserDashboard } = require('../../services/user/dashboard.service') 

// Functions 
const { sendMail }  = require('../../Utils/mail/sendMail')
const {sendNotificationToUser } = require('../../Utils/notification/sendNotification')


// Modules 
const crypto = require('crypto')
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt') 


// Models 
const User = require('../../models/User.model') 



const SignupHandler = async function(req, res, next)
    {
        try 
        {
         
                     /////////////  Temp //////////////////////////
           //create jwt 
           const payload = { email: req.body.email } 
           const token = jwt.sign( payload, 'secret', {expiresIn: '10m' })
           res.cookie('session_token', token ) 
           ////////////   Temp //////////////////////////


          console.log(' Signing Up new User  ') 

           // Validate Signup Schema 
            await validateSignupSchema( req.body ) 
           
           // Check If Email Used Already 
            await checkEmailExists( req.body.email ) 

            // create user email verification code 
           const emailVerificationCode = crypto.randomBytes(16).toString('hex') 
           req.body.emailVerificationCode = emailVerificationCode 

           // signup new user 
            const user_id =   await signupUser( req.body ) 

            // create new user dashboard 
            await createUserDashboard( user_id)

            // send notification to user 
            const notification = { "title":"title", "date": Date.now() , "message":"message", "type":"system", "actionLink":"www.google.com"}

            await sendNotificationToUser( user_id,notification)
            
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
          // await sendMail('verifyEmail', mailDoc,mailVariables)


           // Signup successfull 
           
           console.log(' New User signup successfull ') 
           res.status(201)
           return res.render('pages/success_msg') // should redirect to a signup successfull page 
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
                                res.status(500) 
                                return res.render('pages/serverError',{error: errorMsg})
                

                case 'schema':
                case 'emailAlreadyRegistered':

                                req.flash('signup_errors', errorMsg ) 
                                req.flash('user','testuser') 
                               return res.redirect('/api/v1/signup')

                default: 
                        return res.status(500).json({success: false, msg:'unknown error type '})
           }

        }
    }


const getSignupPage = function(req, res, next)
{
    try 
    {
        const errorArray = req.flash('signup_errors')
        const error = errorArray[0]
        console.log( typeof error )
        console.dir( errorArray ) 
        res.render('pages/user/user_signup',{ error })
    }
    catch(e)
    {
        console.log('Error occured while getting signup page ')
        console.log(e) 
        res.render('pages/serverError',{ error: e }) 
    }
}


const signinPageHandler = function(req, res, next)
{
    try 
    {
        var errors = req.flash('errors')  
        res.render('pages/user/user_signin',{errors}) 
    }
    catch(e)
    {
        console.log(' Error occured while getting signin page ')
        console.log(e)
        res.render('pages/serverError',{ error: ' Ops Server encountered error '})
    }
}


const signinHandler = async function(req, res, next)
{
    try 
    {
        console.log(' Signing in User ')
        const { email, password } = req.body

        
        // Find User 
        const user = await findUserWithEmail(email) 

        // Check Password Valid 
        const passwordValid = await bcrypt.compare( password, user.password )

        if( !passwordValid )
        { 
            console.log('User password incorrect ')
            return res.redirect('pages/user_signin',{ error: 'check login details '})
        } 

        console.log(' User Password Valid ') 

        // CREATE USER JWT TOKEN 
        const token = await jwt.sign({ email }, process.env.JWT_SECRET,{ 'expiresIn': '5m' })
        res.cookie('AUTH_TOKEN', token ) 


        // Set user to request 
        const userType = user.userType 
        const _id = user._id 
        req.user = { email, userType, _id }


        console.log(' USer type is ' + userType ) 
        switch(userType)
        {
            case 'talent': // redirect user to talent dashboard;
                            return res.redirect('/api/v1/talent/dashboard')

            case 'client': // redirect user to client dashboard;
                            return res.redirect('/api/v1/client/dashboard') 
                            

            case 'admin' : // redirect user to admin dashboard; 
                            res.redirect('/api/v1/admin/dashboard') 
                            return; 

            default: // Unknown User Type 
                    console.log(" Unknown User Type ") 
                    res.redirect('/api/v1/signin',{errors: ' Unknown User'})
                    return; 
        }


        
    }
    catch(e)
    {
        const errorType = e.type 
        const errorMsg = e.message 

        switch(errorType)
        {

            case 'SERVER': return res.render('serverError', { error: errorMsg })

            case 'USER_INPUT':  req.flash('errors', errorMsg ) 
                                return res.redirect('/api/v1/signin')

        }

    }
}



module.exports = { SignupHandler, getSignupPage, signinPageHandler, signinHandler  }
require('dotenv').config() 


// Validation Schemas 
const validateSignupSchema = require('../../services/user/validateSignupSchema')

// Services 
const { checkEmailExists, signupUser, findUserWithEmail, verifyEmail } = require('../../services/user/user.service') 
const { createUserDashboard } = require('../../services/user/dashboard.service') 


// Functions 
const { sendMail }  = require('../../Utils/mail/sendMail')


// Modules 
const crypto = require('crypto')
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt') 


// Models 
const User = require('../../models/User.model') 


const verifyEmailHandler = async function(req,res, next)
{
    try 
    {
        console.log(' Verify Email Handler ')
        const verificationCodeValid = await verifyEmail( req.params.code ) 

        if( verificationCodeValid )
        {
            return res.render('pages/email_verified')
        }
        else 
        {
            return res.render('pages/email_not_verified')
        }
 
    }
    catch(e)
    {
        return res.render('pages/serverError',{ error: e.message })
    }
}



const signupSuccessHanler = async function(req, res, next)
{
    try 
    {
        console.log(' Redirecting user to signup success page ')
        return res.render('pages/success_msg')
    }
    catch(e)
    {
        console.log(' Error occured while serving signup success page')
        console.log(e)
        return res.send('Visit email to verify account')
    }
}


const SignupHandler = async function(req, res, next)
    {
        try 
        {
         
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
           { firstname: req.body.firstname, emailVerificationLink: `http://${req.headers.host}/verify/email/${emailVerificationCode}`}
           await sendMail('verifyEmail', mailDoc,mailVariables)

           // Signup successfull 
           
           console.log(' New User signup successfull ') 
           res.status(201)
           return res.redirect('/signup/success') // should redirect to a signup successfull page 
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
                               return res.redirect('/signup')

                default: 
                        return res.ender('pages/serverError',{ error:'server error'})
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
            return res.status(200).redirect('pages/user_signin')
        } 

        console.log(' User Password Valid ') 


        // CREATE USER JWT TOKEN 
        const saveFields = { email, firstname: user.firstname, lastname: user.lastname, userType: user.userType, _id: user._id  }
        const token = await jwt.sign(saveFields, process.env.JWT_SECRET,{ 'expiresIn': '50m' })
        res.cookie('AUTH_TOKEN', token ) 


        // Set user to request 
        const userType = user.userType 
        const _id = user._id 
        const firstname = user.firstname 
        const lastname = user.lastname 

        req.user = { email, userType, _id, firstname, lastname }
        req.session.user = { email, userType, _id, firstname, lastname }


        console.log(' USer type is ' + userType ) 
        switch(userType)
        {
            case 'user': // redirect user to talent dashboard;
                            return res.status(200).redirect('/dashboard')

            case 'client': // redirect user to client dashboard;
                            return res.status(200).redirect('/client/dashboard') 
                            

            case 'admin' : // redirect user to admin dashboard; 
                            res.status(200).redirect('/admin/dashboard') 
                            return; 

            case 'superAdmin': 
                            res.status(200).redirect('/dashboard')

            default: // Unknown User Type 
                    console.log(" Unknown User Type ") 
                    res.redirect(200,'/signin')
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
                                return res.redirect('/signin')

        }

    }
}



module.exports = { SignupHandler, getSignupPage, signinPageHandler, signinHandler, signupSuccessHanler, verifyEmailHandler   }
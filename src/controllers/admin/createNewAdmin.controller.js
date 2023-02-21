require('dotenv').config() 


// Validation Schemas 
const AdminSignupSchema = require('../../validation_schema/user/validateAdminSignupSchema') 



// Services 
const { checkEmailExists, signupUser  } = require('../../services/user/user.service') 
const { createUserDashboard } = require('../../services/user/dashboard.service') 


// Functions 
const { sendMail }  = require('../../Utils/mail/sendMail')


// Modules 
const crypto = require('crypto')
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt') 


// Models 
const User = require('../../models/User.model') 



const getSignupAdminPage = async function(req, res, next )
{
    try 
    {
        const error = req.flash('error') 
        return res.render('pages/admin/addAdmin',{ error })
    }
    catch(e)
    {
        return res.render('pages/serverError',{ error:'error occured while signing up new admin '})
    }
}



const SignupAdminHandler = async function( req, res, next  )
    {
        try 
        {
         
           console.log(' Signing New Admin  ') 


           // Validate Signup Schema 
            await AdminSignupSchema.validateAsync(req.body)  
           console.log(' Admin signup schema validated ')

            // Set required fields 
            req.body.password = 'password'
            req.body.certificateId = 'certificatedId'
            req.body.userType = 'admin'

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
           
           console.log(' Admin Signed up successfully ') 
           return res.render('pages/adminSignupSuccess')
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
                                console.log(' Server encountered error while adding new admin ')
                                console.log(e) 
                                return res.render('pages/adminSignupError')
                                
                

                case 'schema':
                case 'emailAlreadyRegistered':

                                console.log(' Error occured while adding new admin ')
                                console.log(e) 
                                req.flash('signup_errors', errorMsg ) 
                                return res.render('pages/adminSignupError')
                              

                default: 
                        console.log(' Server error occured while adding new admin ')
                        console.log(e) 
                        return res.render('pages/adminSignupError')
                        
           }

        }
    }









module.exports = { SignupAdminHandler, getSignupAdminPage }
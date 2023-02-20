require('dotenv').config() 


// Validation Schemas 
const AdminSignupSchema = require('../../validation_schema/user/validateAdminSignupSchema') 


// Services 
const { checkEmailExists, signupUser  } = require('../../services/user/user.service') 
const { createUserDashboard, createAdminDashboard } = require('../../services/user/dashboard.service') 


// Functions 
const { sendMail }  = require('../../Utils/mail/sendMail')


// Modules 
const crypto = require('crypto')
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt') 


// Models 
const User = require('../../models/User.model') 
const AdminVerification = require('../../models/AdminVerification') 


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


const getAdminSignupPage = async function(req, res, next )
{
    try 
    {
        const error = req.flash('error') 
        return res.render('pages/admin/adminSignup',{ error })
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

           // find admin verification doc 
           const validSignup = await AdminVerification.findOne({ admin_email: req.body.email }) 

           if( !validSignup )
           {
                 return res.redirect('/')
           }


           // Validate Signup Schema 
           await AdminSignupSchema.validateAsync(req.body)  


           console.log(' Admin signup schema validated ')

            // Set required fields 
           req.body.userType = 'admin' 

           // Check If Email Used Already 
            await checkEmailExists( req.body.email ) 

           // create user email verification code 
           req.body.emailVerificationCode = '' 


           // signup new user 
            const user_id =   await signupUser( req.body ) 

            // create Admin Dashboard 
            await createAdminDashboard( user_id)
            
           console.log(' Admin Signed up successfully ') 
           req.flash('success','Signup successfull')
           return res.redirect('/signin') 
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
                                req.flash('error',errorMsg)
                                return res.redirect('/admin/signup/abc')
                                
                

                case 'schema':
                case 'emailAlreadyRegistered':

                                console.log(' Error occured while adding new admin ')
                                console.log(e) 
                                req.flash('error', errorMsg ) 
                                return req.redirect('/admin/signup/abc')
                              

                default: 
                        console.log(' Server error occured while adding new admin ')
                        console.log(e) 
                        return res.render('/admin/signup/abc')
                        
           }

        }
    }







    const sendAdminSignupEmail = async function( req, res, next  )
    {
        try 
        {
         
         
          const emailVerificationCode =   crypto.randomBytes(16).toString('hex') 

          const doc = { admin_email: req.body.email, emailVerificationCode }
          const newAdminVerificationDoc = new AdminVerification(doc) 
          const createdDoc =  await newAdminVerificationDoc.save() 
          console.log( createdDoc )
           

          // Send Signup mail 
           const mailDoc = 
           {
               from:'techjobber@gmail.com',
               to: req.body.email, 
               subject:'Admin Signup email',
               text:' Welcome to tech Jobber, please verify your email to continue ',
               html: null 
           }


           const mailVariables = 
           { firstname: req.body.firstname, emailVerificationLink: `http://${req.headers.host}/admin/signup/${emailVerificationCode}`}
           await sendMail('adminSignup', mailDoc,mailVariables)

           // Signup successfull 
        
           console.log(' Signup mail sent to email successfully ') 
           req.flash('success','Successfully sent signup email to admin')
           
           return res.redirect('/dashboard')
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
                                req.flash('error','could not send signup mail to admin')
                                return res.render('pages/adminSignupError')
                                
                

                case 'schema':
                case 'emailAlreadyRegistered':

                                console.log(' Error occured while adding new admin ')
                                console.log(e) 
                                req.flash('error', errorMsg ) 
                                return res.redirect('/dashboard')
                              
                default: 
                        console.log(' Server error occured while adding new admin ')
                        console.log(e) 
                        return res.render('pages/adminSignupError')
                        
           }

        }
    }



module.exports = { SignupAdminHandler, getSignupAdminPage,  getAdminSignupPage,  sendAdminSignupEmail }
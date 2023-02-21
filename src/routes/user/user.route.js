const express = require('express')
const router = express.Router() 


// Controllers 
const user = require('../../controllers/user/user.controller')
const  { getDashboard  } = require('../../controllers/user/userDashboard.controller')
const { fetchUserNotificationsHandler, deleteNotificationHandler } = require('../../controllers/user/userNotification')

const { authenticateAccessToken } = require('../../middlewares/auth/authenticateAccessToken')

// User Profile Handlers 
const { getProfile, updateBioDetailsHandler, addExperienceHandler, 
    getExperiencesHandler, updateExperienceHandler, removeExperienceHandler,
 addItemToPortfolioHandler, getPortfolioHandler, updatePortfolioItemHandler,
removePortfolioItemHandler, getAddExperiencePageHandler, getAddPortfolioPageHandler } = require('../../controllers/user/profile.controller')


module.exports = function(app)
    {
        try 
        {

            console.log(' Building User routes ') 


            // signup 
            router.post('/signup', user.SignupHandler )
            router.get('/signup', user.getSignupPage )
            router.get('/signup/success', user.signupSuccessHanler ) 
            
            // signin 
            router.get('/signin', user.signinPageHandler ) 
            router.post('/signin', user.signinHandler ) 

            // password reset 
            router.get('/forgotpassword', user.forgotPasswordPageHandler )
            router.post('/forgotpassword', user.forgotPasswordHandler )

            router.get('/resetpassword/:code', user.getResetPasswordPage )
            router.post('/resetpassword', user.resetPasswordHandler )

            // signout 
            router.get('/signout', authenticateAccessToken, user.signoutHandler ) 
            

            // Verify Email 
            router.get('/verify/email/:code', user.verifyEmailHandler)

            // Dashboard 
            router.get('/dashboard', authenticateAccessToken, getDashboard )


            // Notifications 
            router.get('/dashboard/notifications', fetchUserNotificationsHandler )
            router.patch('/dashboard/notifications', deleteNotificationHandler ) 

            // profile 
            router.get('/dashboard/profile',authenticateAccessToken, getProfile )
            router.patch('/dashboard/profile', authenticateAccessToken, updateBioDetailsHandler )
            router.post('/dashboard/profile/experience', authenticateAccessToken,  addExperienceHandler )
            router.get('/dashboard/profile/experience', authenticateAccessToken, getExperiencesHandler )
            router.get('/dashboard/profile/experience/add',    authenticateAccessToken,    getAddExperiencePageHandler ) // add experience page 
            router.get('/dashboard/profile/portfolio/add', authenticateAccessToken,  getAddPortfolioPageHandler )
            router.patch('/dashboard/profile/experience', authenticateAccessToken, updateExperienceHandler )
            router.delete('/dashboard/profile/experience', authenticateAccessToken, removeExperienceHandler )

       
            // Portfolio 
            router.post('/dashboard/profile/portfolio', authenticateAccessToken,  addItemToPortfolioHandler ) 
            router.get('/dashboard/profile/portfolio',  authenticateAccessToken,getPortfolioHandler ) 
            router.patch('/dashboard/profile/portfolio', authenticateAccessToken, updatePortfolioItemHandler ) 
            router.delete('/dashboard/profile/portfolio', authenticateAccessToken, removePortfolioItemHandler ) 

            
            // ASSIGN ROUTES TO APP 
            app.use('/', router )
            console.log(' User Routes Built ')
        }
        catch(e)
        {
            console.log(' Error occured while building user routes ')
            console.log( e ) 
        }
    }
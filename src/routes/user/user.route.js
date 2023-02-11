const express = require('express')
const router = express.Router() 

// Controllers 
const user = require('../../controllers/user/user.controller')


module.exports = function(app)
    {
        try 
        {
            console.log(' Building User routes ') 


            // signup 
            router.post('/signup', user.SignupHandler )
            router.get('/signup', user.getSignupPage )

            
            // signin 
            router.get('/signin', user.signinPageHandler ) 
            router.post('/signin', user.signinHandler ) 


            app.use('/api/v1', router )
            console.log(' User Routes Built ')
        }
        catch(e)
        {
            console.log(' Error occured while building user routes ')
            console.log( e ) 
        }
    }
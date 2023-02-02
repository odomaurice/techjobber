const express = require('express')
const router = express.Router() 
const user = require('../../controllers/user/user.controller')


module.exports = function(app)
    {
        try 
        {
            console.log(' Building User routes ') 

            router.post('/signup', user.SignupHandler )

            app.use('/api/v1', router )
            
            console.log(' User Routes Built ')
        }
        catch(e)
        {
            console.log(' Error occured while building user routes ')
            console.log( e ) 
        }
    }
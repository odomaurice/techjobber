const express = require('express') 
const router = express.Router() 
const recruiter = require('../../controllers/recruiter/recruiter.controller')
const {authenticateAccessToken} = require('../../middlewares/auth/authenticateAccessToken') 

module.exports = function(app)
    {
        try 
        {
            console.log(' Building Recruiter Routes ') 

            router.get('/dashboard', authenticateAccessToken, recruiter.getRecruiterDashboard ) 
            app.use('/api/v1', router)
        }
        catch(e)
        {
            console.log(' Error occured while building Recruiter Route ')
            console.log(e) 
        }
    }
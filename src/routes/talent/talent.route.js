const express = require('express')
const router = express.Router() 
const { authenticateAccessToken } = require('../../middlewares/auth/authenticateAccessToken') 
const talent = require('../../controllers/talent/talentDashboard.controller') 


module.exports = function(app)
{
    try 
    {
        router.get('/dashboard', authenticateAccessToken, talent.getDashboard )   
        app.use('/api/v1/talent', router)
    }
    catch(e)
    {
        console.log(' Error occured while building talent routes ') 
        console.log(e) 
    }
}
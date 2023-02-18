const express = require('express')
const router = express.Router() 
const landingPageHandler = require('../../controllers/landingPage/landingPage.controller') 



module.exports = function indexRoutes(app)
{
    try 
    {
        router.get('/landing', landingPageHandler.serveLandingPage )
        app.use('/', router) 
    }
    catch(e)
    {
        console.log(' Error occured while building index routes ')
        console.log(e) 
    }
}




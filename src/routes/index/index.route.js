const express = require('express')
const router = express.Router() 
const index = require('../../controllers/index/index.controller') 


module.exports = function(app)
    {
        try
        {

            router.get('/', index.getIndexPage )
            app.use('/', router )
        }
        catch(e)
        {
            console.log(' Error occured while creating index routes ')
            console.log(e) 
        }
    }
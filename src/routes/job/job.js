const express = require('express') 
const router = express.Router() 


// Handlers 
const {  getJobsHandler  } = require('../../controllers/admin/job.controller')


module.exports = function(app)
    {
        try 
        {

            // Jobs 
            router.get('/jobs', getJobsHandler )

            app.use('/', router)
        }
        catch(e)
        {
            console.log(' Error occured while building Admin Routes')
            console.log(e) 
        }
    }
const express = require('express') 
const router = express.Router() 


// Handlers 
const { postJobHandler, getJobsHandler, getJobHandler, updateJobHandler, deleteJobPostHandler, getCreateJobPageHandler } = require('../../controllers/admin/job.controller')


module.exports = function(app)
    {
        try 
        {

            // Jobs 
            router.get('/dashboard/job/', getCreateJobPageHandler)
            router.post('/admin/job', postJobHandler )
            router.get('/admin/job', getJobsHandler ) 
            router.get('/admin/job/:id', getJobHandler ) 
            router.patch('/admin/job/:id', updateJobHandler)
            router.delete('/admin/job/:id', deleteJobPostHandler )

            app.use('/', router)
        }
        catch(e)
        {
            console.log(' Error occured while building Admin Routes')
            console.log(e) 
        }
    }
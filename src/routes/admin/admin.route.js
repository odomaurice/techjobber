const express = require('express') 
const router = express.Router() 


// Handlers 
const { postJobHandler, returnJobsCreatedByAdminHandler, getJobUpdatePage, getJobsHandler, getJobHandler, updateJobHandler, deleteJobPostHandler, getCreateJobPageHandler } = require('../../controllers/admin/job.controller')
const { authenticateAccessToken } = require('../../middlewares/auth/authenticateAccessToken')

module.exports = function(app)
    {
        try 
        {

            // Jobs 
            router.get('/dashboard/job/add', authenticateAccessToken, getCreateJobPageHandler)
            router.post('/dashboard/jobs/:id', authenticateAccessToken, updateJobHandler)
            router.post('/jobs', authenticateAccessToken, postJobHandler )
            router.get('/dashboard/jobs', authenticateAccessToken, returnJobsCreatedByAdminHandler )


            router.get('/admin/job', getJobsHandler ) 
            router.get('/admin/job/:id', getJobHandler ) 
           
            router.get('/dashboard/jobs/:id', authenticateAccessToken, getJobUpdatePage )

          
            router.delete('/admin/job/:id', deleteJobPostHandler )

            app.use('/', router)
        }
        catch(e)
        {
            console.log(' Error occured while building Admin Routes')
            console.log(e) 
        }
    }
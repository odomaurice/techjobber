const express = require('express') 
const router = express.Router() 


// Handlers 
const { SignupAdminHandler, getSignupAdminPage, sendAdminSignupEmail, getAdminSignupPage} = require('../../controllers/admin/createNewAdmin.controller')
const { postJobHandler, returnJobsCreatedByAdminHandler,  getJobUpdatePage, getJobsHandler, getJobHandler, updateJobHandler, deleteJobPostHandler, getCreateJobPageHandler } = require('../../controllers/admin/job.controller')
const { authenticateAccessToken } = require('../../middlewares/auth/authenticateAccessToken')

module.exports = function(app)
    {
        try 
        {

            // Signup Admin 

            // get page to enter admin email, post 
            router.get('/dashboard/admin/add', authenticateAccessToken, getSignupAdminPage ) 
            router.post('/dashboard/admin/add',authenticateAccessToken, sendAdminSignupEmail )

            // get pages for admin to signup 
            router.post('/admin/signup/:code', SignupAdminHandler)
            router.get('/admin/signup/:code', getAdminSignupPage )

            // sign 'admin'
            
            // Jobs 
            router.get('/dashboard/job/add', authenticateAccessToken, getCreateJobPageHandler)
            router.post('/dashboard/jobs/:id', authenticateAccessToken, updateJobHandler)
            router.post('/jobs', authenticateAccessToken, postJobHandler )
            router.get('/dashboard/jobs', authenticateAccessToken, returnJobsCreatedByAdminHandler )
            router.delete('/dashboard/jobs/:id', authenticateAccessToken, deleteJobPostHandler )

            

            router.get('/admin/job', getJobsHandler ) 
            router.get('/admin/job/:id', getJobHandler ) 
            router.get('/dashboard/jobs/:id', authenticateAccessToken, getJobUpdatePage )


            app.use('/', router)
        }
        catch(e)
        {
            console.log(' Error occured while building Admin Routes')
            console.log(e) 
        }
    }
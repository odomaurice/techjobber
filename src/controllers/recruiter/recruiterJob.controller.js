
// Model 
const Job = require('../../models/Jobs') 

// Service 
const { createJob, validateCreateJobSchema } = require('../../services/recruiter/recruiterJob.service') 



async function createJobHandler(req, res, next)
{
    try 
    {

        const recruiter_id = req.user._id 
        req.body.recruiter_id = recruiter_id 

        await validateCreateJobSchema( req.body ) 
        const createdJob = await createJob( req.body )    

    }
    catch(e)
    {
        const errorType = e.type 
        const errorMsg = e.message 

        switch(errorType)
        {
            
            case 'SERVER':      req.flash('errors', errorMsg )
                                return res.redirect('/api/v1/recruiter/job') 

            case 'USER_INPUT' :  req.flash('errors', errorMsg ) 
                                 return res.redirect('/api/v1/recruiter/job') 
        }
    }
}




module.exports = { createJobHandler } 
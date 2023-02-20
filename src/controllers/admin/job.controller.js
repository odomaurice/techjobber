const JobPost = require('../../models/JobPost')
const { postJob, getJobs, getJobPost, updateJobPost, deleteJobPost} = require('../../services/job/job.service')


async function postJobHandler(req, res, next)
{
    try 
    {
        console.log(' here ')
        const admin_id = 'samle_id' 
        req.body.postedBy = admin_id 
        const postedJob = await postJob( req.body )
        return res.status(201).send( postedJob ) 
    }
    catch(e)
    {
        console.log(' Error occured while posting Job ') 
        console.log(e) 
    }
}


async function getJobsHandler(req, res, next)
{
    try 
    {
        const { skip, limit } = req.body         
        const jobPosts = await getJobs(skip, limit)
        return res.send(jobPosts) 
    }
    catch(e)
    {
        
        if( e.type = 'SERVER' )
        { 
            return res.render('pages/serverError',{ error:' server encountered error while getting job posts '})
        }
        else 
        {
            return res.render('pages/serverError',{ error:'unknown server error '})
        }
    }
}

async function getCreateJobPageHandler(req, res, next)
{
    try 
    {
        return res.render('pages/post')
    }
    catch(e)
    {
        
        if( e.type = 'SERVER' )
        { 
            return res.render('pages/serverError',{ error:' server encountered error while getting job posts '})
        }
        else 
        {
            return res.render('pages/serverError',{ error:'unknown server error '})
        }
    }
}


async function getJobHandler(req, res, next)
{
    try 
    {
        const job_id = req.params.id 
        const jobPost = await getJobPost( job_id )
        return res.send(jobPost) 
    }
    catch(e)
    {
        
        if( e.type = 'SERVER' )
        { 
            return res.render('pages/serverError',{ error:' server encountered error while getting job post '})
        }
        else 
        {
            return res.render('pages/serverError',{ error:'unknown server error '})
        }
    }
}


// Shared Roles 
    // report job posting, get jobs 
// Report Job Post 
// My created jobs 

async function updateJobHandler(req, res, next)
{
    try 
    {
        const job_id = req.params.id 
        const admin_id  = 'samle_id' 
        
        await updateJobPost( job_id, admin_id, req.body )
        return res.send('Updated')
    }
    catch(e)
    {
        return res.send('pages/serverError',{ error:' error occured while updating job post'})
    }
}


async function deleteJobPostHandler(req, res, next)
{
    try 
    {
        const post_id = req.params.id 
        const admin_id = 'samle_id'  
        const result = await deleteJobPost(post_id, admin_id)
        return res.send(result) 
    }
    catch(e)
    {
        return res.render('pages/serverError',{ error:'server encountered error while deleting job post '})
    }
}



module.exports = { getCreateJobPageHandler, postJobHandler, getJobsHandler, getJobHandler, updateJobHandler, deleteJobPostHandler } 
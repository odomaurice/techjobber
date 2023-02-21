const JobPost = require('../../models/JobPost')
const { postJob,getJobsCreatedByAdmin, getJobs, getJobPost, updateJobPost, deleteJobPost} = require('../../services/job/job.service')




async function returnJobsCreatedByAdminHandler(req, res, next)
{
    try 
    {
        const admin_id = req.user._id 
        const jobPosts = await getJobsCreatedByAdmin( admin_id )
        return res.render('pages/adminJobs',{ jobPosts }) 
    }
    catch(e)
    {
        
    }
}


async function postJobHandler(req, res, next)
{
    try 
    {
        req.body.postedBy = req.user._id 
        const postedJob = await postJob( req.body )
        req.flash('success','created job post successfully ')
        return res.redirect('/dashboard') 
    }
    catch(e)
    {
        console.log(' Error occured while posting Job ') 
        console.log(e) 
        req.flash('error','error occured while creating job post ') 
        return res.redirect('/dashboard')
    }
}

async function getJobsHandler(req, res, next)
{
    try 
    {
             
        const jobPosts = await getJobs(0, 0)
        return res.render('pages/jobs',{ jobPosts })
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
        return res.render('pages/editPost')
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


async function getJobUpdatePage(req, res, next)
{
    try 
    {
        const job = await JobPost.findOne({ _id: req.params.id }) 
        return res.render('pages/editJobPost',{ job })
    }
    catch(e)
    {
        
        if( e.type = 'SERVER' )
        { 
            console.log(e) 
            return res.render('pages/serverError',{ error:' server encountered error while getting job post to edit '})
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
        
        req.body.job_id = req.params.id 
        req.body.postedBy = req.user._id 

        await deleteJobPost( req.body.job_id, req.body.admin_id)
        await updateJobPost( req.body )

        req.flash('success','job updated successfully')
        return res.redirect('/dashboard')
    }
    catch(e)
    {
        console.log(e) 
        req.flash('error','error occured while updating job')
        return res.render('pages/serverError',{ error:' error occured while updating job post'})
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



module.exports = {  returnJobsCreatedByAdminHandler, getJobUpdatePage, getCreateJobPageHandler, postJobHandler, getJobsHandler, getJobHandler, updateJobHandler, deleteJobPostHandler } 
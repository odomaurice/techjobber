
// Model 
const JobPost = require('../../models/JobPost') 




async function postJob( doc )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const newJobPost = new JobPost(doc)
            const savedJobPost = await newJobPost.save() 
            resolve( savedJobPost ) 
        }
        catch(e)
        {
            console.log('SERVICE_ERROR: Error occured while creating Job Post ') 
            console.log(e) 
            e.type = 'SERVER'
            e.message = 'Could not create job Post' 
            reject(e) 
        }
    })
}


async function getJobsCreatedByAdmin( admin_id )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {

            const returnFields = { _id: 1, title: 1, employmentType: 1, experienceLevel: 1, companyName: 1, jobLocation: 1, jobLink: 1, skills: 1 }
            const jobs = await JobPost.find({ createdBy: admin_id },returnFields)
            resolve(jobs) 
        }
        catch(e)
        {
            console.log('SERVICE_ERROR: Error occured while fetching Jobs From Database ') 
            console.log(e) 
            e.type = 'SERVER'
            e.message = 'Could fetch all jobs from database' 
            reject(e) 
        }
    })
}


async function getJobs( skip,limit)
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const returnFields = { title: 1, jobType: 1, salary: 1, experienceLevel: 1, companyName: 1, jobLocation: 1, jobLink: 1 }
            const jobs = await JobPost.find({},returnFields).skip(skip).limit(limit) 
            resolve(jobs) 
        }
        catch(e)
        {
            console.log('SERVICE_ERROR: Error occured while fetching Jobs From Database ') 
            console.log(e) 
            e.type = 'SERVER'
            e.message = 'Could fetch all jobs from database' 
            reject(e) 
        }
    })
}


async function getJobPost(_id)
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const returnFields = {  title: 1, employmentType: 1, salary: 1, jobType: 1, experienceLevel: 1, companyName: 1, jobLocation: 1, jobLink: 1 }
            const job = await JobPost.findOne({ _id },returnFields)
            resolve( job ) 
        }
        catch(e)
        {
            console.log('SERVICE_ERROR: Error occured while fetching Job From Database ') 
            console.log(e) 
            e.type = 'SERVER'
            e.message = ' Could not fetch job details from database' 
            reject(e) 
        }
    })
}


async function updateJobPost(  doc )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            // console.log(' Updating Job ')
            // const updateKeys = Object.keys( doc ) 
            // const update = { $set: { } } 

            // for( var i = 0; i < updateKeys.length; i++ )
            // {
            //     update.$set[`${updateKeys[i]}`] = doc[`${updateKeys[i]}`]
            // }


            const newJobPost = new JobPost(doc) 
            const result =  await newJobPost.save() 
            console.log(' Job Post updated ')
            resolve(result) 
        }
        catch(e)
        {
            console.log('SERVICE_ERROR: Error occured while updating job ')
            console.log(e)
            e.type = 'SERVER'
            e.message = 'Server encountered error while updating job'
            reject(e) 
        }
    })
}


async function deleteJobPost( post_id, admin_id )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const filter = { _id: post_id, postedBy: admin_id }
            const result = await JobPost.deleteOne(filter)

            if( result )
            {
                console.log(' Job Post Deleted ')
                return resolve('Post deleted') 
            }
            else 
            {
                console.log(' Job Post not deleted ') 
                return resolve('Post not deleted, not created by current user ')
            }
    

        }
        catch(e)
        {
            console.log('SERVICE_ERROR: Error occured while deleting Job Post ')
            console.log(e)
            e.type = 'SERVER'
            e.message = 'Error occured while deleting Job Post' 
            reject(e) 
        }
    })
}


module.exports = { postJob, getJobs, getJobPost, updateJobPost, deleteJobPost, getJobsCreatedByAdmin } 
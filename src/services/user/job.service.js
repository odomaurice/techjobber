
// Model 
const JobPost = require('../../models/JobPost') 


async function getJobFeed(  order, skip, limit, userSkills )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            // Quick Fix 
            const filter = { $in:{ skills: userSkills }}
            const returnFields =  { title: 1, employmentType: 1, experienceLevel: 1, companyName: 1, jobLocation: 1, jobLink: 1, skills: 1 }
            const jobPosts = await JobPost.find(filter,returnFields).sort({ createdOn: order }).skip(skip).limit(limit)
            resolve( jobPosts ) 
        }
        catch(e)
        {
            console.log('SERVICE_ERROR: Server Encountered error while fetching user job feed')
            console.log(e) 
            e.type = 'SERVER'
            e.message = 'Server Encountered error while fetching job feed' 
            reject(e) 
        }
    })
}


module.exports = { getJobFeed } 

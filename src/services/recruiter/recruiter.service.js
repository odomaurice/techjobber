
// Model 
const RecruiterDashboard = require('../../models/RecruiterDashboard') 


async function createRecruiterDashboard(recruiter_id)
{
    return new Promise(async(resolve, reject)=>{
        try 
        {   
            const doc = { recruiter_id } 
            const newRecruiterDashboard = new RecruiterDashboard(doc)
            await newRecruiterDashboard.save() 
            resolve() 
        }
        catch(e)
        {
            console.log(' Server Encountered error while creating Recruiter Dashboard ')
            console.log(e)
            e.message = 'Server Encountered error while creating Recruiter Dashbaord '
            e.type = 'SERVER' 
            reject() 
        }
    })
}



async function getRecruiterDashboard(recruiter_id)
{
   return new Promise(async(resolve, reject)=>{
        try 
        {
            const dashboardItems = { jobsPosted: 1, contractsResolved: 1, pendingContracts: 1, transactions: 1 }
            const dashboard = await RecruiterDashboard.findOne({ recruiter_id },dashboardItems) 
            resolve(dashboard) 
        }
        catch(e)
        {
            console.log(' Server Encountered Error while retrieving Recruiter Dashboard')
            console.log(e)
            reject() 
        }
   })
}




module.exports = { createRecruiterDashboard,getRecruiterDashboard } 
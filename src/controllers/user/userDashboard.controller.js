
// Model 
const UserDashboard = require('../../models/UserDashboard') 



// Service 
const  { getJobFeed } = require('../../services/user/job.service')

async function getDashboard(req, res, next)
{
    try 
    {
        console.log(' Getting User Dashboard ') 

       //  const { _id } = req.user 
        const dataToRetrieve = { number_of_notifications: 1, _id: 0, skills: 1 }

        const dashboardData = await UserDashboard.findOne({ user_id: "63e729574396b20fad91f78c" },dataToRetrieve)
        

        // fetch job feed 
        // order, skip, limit, userSkills 
        const order = 1 
        const skip = 0 
        const limit = null 
        
        const jobFeed = await getJobFeed( order, skip, limit, dashboardData.skills ) 
        console.log(' Fetched User Dashboard ')
        console.log( dashboardData ) 
        
        
        return res.render('pages/user/user_dashboard',{ dashboardData, jobFeed })
    }
    catch(e)    
    {
        console.log(' Error occured while getting User Dashboard ')
        console.log(e)
        return res.render('serverError',{ error: ' Server Encountered error while getting User Dashboard '})
    }
}



module.exports = { getDashboard } 
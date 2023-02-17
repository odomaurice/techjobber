
// Model 
const UserDashboard = require('../../models/UserDashboard') 


async function getDashboard(req, res, next)
{
    try 
    {
        console.log(' Getting User Dashboard ') 

       //  const { _id } = req.user 
        const dataToRetrieve = { number_of_notifications: 1, _id: 0 }

        const dashboardData = await UserDashboard.findOne({ user_id: "63e729574396b20fad91f78c" },dataToRetrieve)
        
        console.log(' Fetched User Dashboard ')
        console.log( dashboardData ) 
        
        
        return res.render('pages/user/user_dashboard',{ dashboardData })
    }
    catch(e)    
    {
        console.log(' Error occured while getting User Dashboard ')
        console.log(e)
        return res.render('serverError',{ error: ' Server Encountered error while getting User Dashboard '})
    }
}



module.exports = { getDashboard } 

// Model 
const TalentDashboard = require('../../models/TalentDashboard') 

async function getDashboard(req, res, next)
{
    try 
    {
        console.log(' Getting Talent Dashboard ') 

        const { email, _id } = req.user 
        const dataToRetrieve = { _id: 0, numberOfMessageNotifications: 1, notificationsCount: 1, numberOfJobNotifications: 1, balance: 1, 
        numberOfResolvedContracts: 1, numberOfPendingContracts: 1, transactions: 1 }

        const dashboardData = await TalentDashboard.findOne({ userEmail: email },dataToRetrieve)
        
        console.log(' Fetched Talent Dashboard ')
        console.log( dashboardData ) 

        
        return res.render('pages/user/user_dashboard',{ dashboardData })
    }
    catch(e)    
    {
        console.log(' Error occured while getting Talent Dashboard ')
        console.log(e)
        return res.render('serverError',{ error: ' Server Encountered error while getting talent Dashboard '})
    }
}

module.exports = { getDashboard } 
const TalentDashboard = require('../../models/TalentDashboard') 

function createTalentDashboard(email)
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            console.log(' Creating New Talent Dashboard ')

            const dashboardDoc = { userEmail: email } 
            const newTalentDashboard = new TalentDashboard(dashboardDoc)
            await newTalentDashboard.save() 
            resolve() 
        }
        catch(e)
        {
            console.log(' Error occured while creating New Talent Dashboard ')
            console.log(e) 
            e.type = 'server'
            e.message = ' Server Encountered error while creating new user '
            reject(e) 
        }
    })
}


module.exports = { createTalentDashboard } 
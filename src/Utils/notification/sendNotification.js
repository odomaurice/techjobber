
const UserDashboard = require('../../models/UserDashboard') 


async function sendNotificationToUser(user_id, notification )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const update = { $push:{ notifications: notification }, $inc:{ numberOfNotifications: 1 }}
            await UserDashboard.updateOne({ user_id }, update )
            resolve()
        }
        catch(e)
        {
            console.log(' Error occured while sending notification to user ')
            console.log(e) 
            e.type = 'SERVER'
            e.message = 'server error while sending user notification' 
            reject() 
        }
    })
}


module.exports = { sendNotificationToUser } 
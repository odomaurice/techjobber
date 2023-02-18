const UserDashboard = require('../../models/UserDashboard') 


async function fetchUserNotifications( user_id )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {

            const user = await UserDashboard.findOne({ user_id },{ nofications: 1, _id: 0 })
            resolve( user ) 
        }
        catch(e)
        {
            console.log(' Server encountered error while fetching user notifications ')
            console.log(e) 
            e.type = 'SERVER'
            e.message = ' Server encountered error while fetching user notifications '
            reject(e) 
        }
    })
}

async function deleteNotification( user_id, notification_id )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const update = { $pull:{ "notifications":{ _id: notification_id } }}
            await UserDashboard.updateOne({ user_id }, update )
            resolve() 
        }
        catch(e)
        {
            console.log('SERVER_ERROR: Error occured while deleting notification from user notifications ')
            console.log(e)
            e.type = 'SERVER'
            e.message = 'Server Encountered error while deleting notification '
            reject(e) 
        }
    })
}
module.exports = { fetchUserNotifications, deleteNotification  }
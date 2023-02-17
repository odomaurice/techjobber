

// Service 
const { fetchUserNotifications, deleteNotification } = require('../../services/user/notification.service')


async function fetchUserNotificationsHandler(req, res, next )
{
    try 
    {
        const user_id = '63e729574396b20fad91f78c'
        const notifications = await fetchUserNotifications( user_id ) 
        console.log( notifications ) 
        return res.send(notifications) 
    }
    catch(e)
    {
        console.log('Error occured while fetching user notifications ')
        console.log(e) 
    }
}


async function deleteNotificationHandler(req, res, next )
{
    try 
    {
        const user_id = '63efdbb59db27217f2ebfc2f'
        const notification_id = '63efdbb59db27217f2ebfc33' 
        await deleteNotification( user_id, notification_id ) 
        return res.send(" Notification Deleted s") 
    }
    catch(e)
    {
        console.log('Error occured while fetching user notifications ')
        console.log(e) 
        return res.status(500).send(' Could not delete notification')
    }
}

module.exports = { fetchUserNotificationsHandler, deleteNotificationHandler } 
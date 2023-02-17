const mongoose = require('mongoose') 
const Schema = mongoose.Schema 


const NotificationSchema = require('./SubSchemas/USER/notifications/notificationSchema')


const UserDashboardSchema = new Schema 
    (
        {
            user_id: 
            {
                type: mongoose.Types.ObjectId, 
                required: true 
            },
            numberOfNotifications:
            {
                type: Number, 
                required: true, 
                default: 0 
            },
            notifications: 
            {
                type:[NotificationSchema],
                required: true, 
                default: [] 
            }
        }
    )


    const UserDashboard = mongoose.model('userDashboard', UserDashboardSchema ) 
    module.exports = UserDashboard 
const mongoose = require('mongoose') 
const Schema = mongoose.Schema 


const NotificationSchema = new Schema
    (
        {
            title: 
            {
                type: String, 
                required: true, 
                trim: true 
            },
            date:
            {
                type: Date, 
                required: true, 
                default: Date.now 
            },
            message: 
            {
                type: String, 
                required: true, 
                trim: true 
            },
            type: 
            {
                type: String,
                required: true 
            },
            actionLink:
            {
                type: string 
            }
        }
    )


    module.exports = NotificationSchema 
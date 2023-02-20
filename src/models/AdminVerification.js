require('dotenv').config() 
const config = require('config') 
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema  = mongoose.Schema 


const AdminVerificationSchema = new Schema 
    ( 
        {
            admin_email:
            {
                type: String, 
                required: true 
            },
            emailVerificationCode:
            {
                type: String, 
                trim: true,
                required: true
            }
        },
        {
            timestamps: true 
        }
    )



const AdminVerification = mongoose.model('adminverification', AdminVerificationSchema)

module.exports = AdminVerification 
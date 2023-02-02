
const mongoose = require('mongoose')
const Schema  = mongoose.Schema 



const UserSchema = new Schema 
    ( 
        {
            email:
            {
                type: String, 
                required: true, 
                trim: true 
            },
            firstname:
            {
                type: String, 
                required: true, 
                trim: true 
            },
            lastname:
            {
                type: String, 
                required: true, 
                trim: true 
            },
            password:
            {
                type: String, 
                required: true, 
                trim: true 
            },
            cohort:
            {
                type: Number,
                required: true
            },
            emailVerificationCode:
            {
                type: String, 
                trim: true 
            },
            isVerified:
            {
                type: Boolean, 
                required: true, 
                default: false 
            },
            isAdmin:
            {
                type: Boolean, 
                required: true 
            }
        },
        {
            timestamps: true 
        }
    )


const User = mongoose.model('user', UserSchema )

module.exports = User 
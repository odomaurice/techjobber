require('dotenv').config() 
const config = require('config') 
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema  = mongoose.Schema 
const crypto = require('crypto') 
const { string } = require('joi')


const UserSchema = new Schema 
    ( 
        {
            email:
            {
                type: String, 
                required: true, 
                unique: true, 
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
            userType:
            {
                type: String, 
                required: true,
                trim: true
            },
            cohort:
            {
                type: Number
            },
            emailVerificationCode:
            {
                type: String, 
                trim: true,
                required: true
            },
            emailVerified: 
            {
                type: Boolean, 
                required: true, 
                default: true 
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
                required: true,
                default: false 
            },
            certificateId:
            {
                type: String,
                required: true 
            }
        },
        {
            timestamps: true 
        }
    )


UserSchema.pre("save",async function(next){

    const user = this 
    var plainTextPassword = user.password 

    if( user.password )
    {
        const saltWorkFactor = await bcrypt.genSalt(config.get('BCRYPT_SALT_WORK_FACTOR') )
        const hashPassword = await bcrypt.hash(plainTextPassword, saltWorkFactor)
        user.password = hashPassword 
    }
    
    next() 
})



const User = mongoose.model('user', UserSchema )

module.exports = User 
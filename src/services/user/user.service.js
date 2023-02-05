const User = require('../../../models/User.model')


// Functions 
const { sendMail } = require('../../Utils/mail/sendMail') 

// promisify 
async function checkEmailExists(email)
{
    try 
    {
        const userExists = await User.findOne({ email },{ _id: 0, email: 1 })
        if( userExists )
        {
            console.log(' Email Registered Already ')
            const e = new Error('Email Already Registered ')
            e.type = 'emailAlreadyRegistered'
            throw e 
        }
    }   
    catch(e)
    {
        if( e.type === 'emailAlreadyRegistered' )
        {
            throw e 
        }
        else 
        {
            e.message = 'server encountered error while checking if email registered'
            e.type = 'server' 
            throw e
        }
    }
}

// promisify 
async function signupUser( userDoc )
{
    try 
    {
        const newUser = new User(userDoc)
        const savedUser = await newUser.save() 
        return savedUser
    }
    catch(e)
    {
        console.log(' Error occured while saving new user ') 
        console.log(e)

        e.type = 'server'
        e.message = 'server encountered error while signing up new user' 
        throw e 
    }
}



module.exports = { checkEmailExists, signupUser  }
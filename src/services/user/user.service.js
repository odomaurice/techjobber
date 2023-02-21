const User = require('../../models/User.model')
const bcrypt = require('bcrypt') 

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
        return savedUser._id 
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


async function findUserWithEmail(email)
{
    return new Promise(async(resolve, reject)=>{
        try 
        {

            const user = await User.findOne({ email },{ _id: 1, password: 1, userType: 1, firstname: 1, lastname: 1 })

            console.log( user ) 
            if( user )
            {
                console.log(' User Found ')
                resolve(user)
            }
            else 
            {
                console.log(' User with this email does not exist ') 
                const inputError = new Error(' please enter valid signin details ')
                inputError.type = 'USER_INPUT' 
                reject(inputError)
            }
        }
        catch(e)
        {
            console.log(' Server encountered error while finding user with email ')
            console.log(e) 
            e.type = 'SERVER'
            e.message = ' Server encountered error during usersignin '
            reject(e) 
        }
    })
}

async function deleteUserWithEmail(email)
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
             await User.deleteOne({ email } )
             resolve() 
        }
        catch(e)
        {
            console.log(' Error occured while deleting user, at signup failed  ')
            console.log( e )
            reject() 
        }
    })
}


async function verifyEmail( code )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const fields = { _id: 1, emailVerificationCode: 1, emailVerified: 1 } 
            const user = await User.findOne({ emailVerificationCode: code }, fields)

            if( user._id )
            { 

                user.emailVerified = true 
                await user.save() 
                resolve(true)

             }
            else{ resolve(false) }

        }
        catch(e)
        {
            console.log('SERVICE_ERROR: Server encountered error while verifying signup email ')
            console.log(e) 
            e.type = 'SERVER'
            e.message = 'server encountered error while verifying email '
            reject(e) 
        }
    })
}



module.exports = { checkEmailExists, signupUser, findUserWithEmail, findUserWithEmail, verifyEmail, deleteUserWithEmail }
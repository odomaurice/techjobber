const UserProfile = require('../../models/UserProfiles') 


// Create User Profile 
async function createUserProfile(user_id)
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            console.log(' Creating User Profile ') 

            const doc = { user_id } 
            const newUserProfile = new UserProfile(doc)
            const savedProfile = await newUserProfile.save() 
            console.log( savedProfile )
            console.log(' new User Profile Created ')
            resolve(savedProfile)
        }
        catch(e)
        {
            console.log(' Error occured while creating new User Profile ')
            console.log(e) 
            e.type = 'SERVER' 
            e.message = 'Error occured while creating new user Profile ' 
            reject(e) 
        }
    })
}

// Update Bio Details Handler 
async function updateBioDetails( user_id, doc )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {

           const userProfile = await UserProfile.findOne({ user_id},{ bioDetails: 1 })

           console.log( userProfile )
           const updateKeys = Object.keys( doc ) 

           console.log( updateKeys  ) 

           for( var i = 0;  i < updateKeys.length; i++ )
           {
                userProfile.bioDetails[updateKeys[i]] = doc[updateKeys[i]]
           }

            await  userProfile.save() 
           resolve()
        }
        catch(e)
        {
            console.log(' Error occured while Updating User Profile BioDetails ')
            console.log(e) 
            e.type = 'SERVER' 
            e.message = ' Server Encountered Error while updating bio details ' 
            reject(e) 
        }
    })
}



// EXPERIENCE 
async function addExperience(user_id, doc) 
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const updated = await UserProfile.findOneAndUpdate({ user_id },{ $push:{ experience: doc }})
            console.log( update ) 
            resolve() 
        }
        catch(e)
        {

            console.log(' Server Encountered Error while adding User Experience ') 
            console.log(e) 
            e.type = 'SERVER' 
            e.message = ' Server Encountered Error while adding User experience ' 
            reject(e) 
        }
    })
}


async function getExperiences( user_id )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const fields = { experience: 1 , _id: 0 }
            const experiences = await UserProfile.findOne({ user_id},fields)
            resolve(experiences) 
        }
        catch(e)
        {
            console.log(' Error occured while getting user experiences ')
            console.log(e) 
            e.type = 'SERVER' 
            e.message = 'Server encountered error while getting user experiences' 
            reject(e) 
        }
    })   
}

async function updateExperience()
{

}

async function removeExperience()
{
    return new Promise(async(resolve, reject)=>{
        try 
        {

        }
        catch(e)
        {
            console.log(' Error occured while removing experience ')
            console.log(e)
            e.type = 'SERVER'
            e.message = 'SERVER ENCOUNTERED ERROR WHILE REMOVING EXPERIENCE'
            reject(e) 
        }
    })
}


// PORTFOLIO 
async function addPortfolio(user_id, doc) 
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const updated = await UserProfile.findOneAndUpdate({ user_id },{ $push:{ experience: doc }})
            console.log( update ) 
            resolve() 
        }
        catch(e)
        {

            console.log(' Server Encountered Error while adding User Experience ') 
            console.log(e) 
            e.type = 'SERVER' 
            e.message = ' Server Encountered Error while adding User experience ' 
            reject(e) 
        }
    })
}



async function getExperiences( user_id )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const fields = { experience: 1 , _id: 0 }
            const experiences = await UserProfile.findOne({ user_id},fields)
            resolve(experiences) 
        }
        catch(e)
        {
            console.log(' Error occured while getting user experiences ')
            console.log(e) 
            e.type = 'SERVER' 
            e.message = 'Server encountered error while getting user experiences' 
            reject(e) 
        }
    })   
}

async function updateExperience()
{

}

async function removeExperience()
{
    return new Promise(async(resolve, reject)=>{
        try 
        {

        }
        catch(e)
        {
            console.log(' Error occured while removing experience ')
            console.log(e)
            e.type = 'SERVER'
            e.message = 'SERVER ENCOUNTERED ERROR WHILE REMOVING EXPERIENCE'
            reject(e) 
        }
    })
}


module.exports = { createUserProfile, updateBioDetails  } 
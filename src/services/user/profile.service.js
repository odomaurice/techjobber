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

// Add Experience 
async function addExperience(user_id, doc) 
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            console.log(' Adding User Experience ')
            const updated = await UserProfile.updateOne({ user_id },{ $push:{ experience: doc }},{ returnDocument: true })
            console.log( updated ) 
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


// get Experiences 
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


// get Experience 


// update Experience 
async function updateExperience(user_id, experience_id,  doc)
{
    return new Promise(async(resolve, reject)=>{
        try 
        {

            // Get fields to update 
            const updateKeys = Object.keys( doc ) 

            // set update query 
            const update = {$set: { }}
            
            // set new field values  to update query 
            for( var i = 0;  i < updateKeys.length; i++ )
            {
                update.$set[`experience.$.${updateKeys[i]}`] = doc[updateKeys[i]]
            }

            // update 
            const updateStatus = await UserProfile.updateOne({ user_id, "experience._id": experience_id  }, update,{ returnDocument: true } )
            console.log( updateStatus ) 
            resolve() 
        }
        catch(e)
        {
            console.log(' Error occured while updating experience ')
            console.log(e) 
            e.type = 'SERVER'
            e.message = 'Error occured while updating experience'
            reject(e) 
        }
    })
}

// remove Experience 
async function removeExperience(user_id, experience_id)
{
    return new Promise(async(resolve, reject)=>{
        try 
        {

            const update = { $pull:{ "experience":  { _id: experience_id }}}
            await UserProfile.updateOne({ user_id },update)
            console.log('Done')
            resolve() 
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


// PORTFOLIO  ///////////////////


// Add To Portfolio 
async function addToPortfolio(user_id, doc) 
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const updated = await UserProfile.updateOne({ user_id },{ $push:{ portfolio: doc }},{ returnDocument: true })
            console.log( updated ) 
            resolve() 
        }
        catch(e)
        {

            console.log(' Server Encountered Error while adding item to portfolio ') 
            console.log(e) 
            e.type = 'SERVER' 
            e.message = ' Server Encountered Error while adding item to portfolio ' 
            reject(e) 
        }
    })
}

// Get portfolio 
async function getPortfolio( user_id )
{
    return new Promise(async(resolve, reject)=>{
        try
        {
            console.log(' Getting User Porfolio ') 
            const portfolio = await UserProfile.findOne({ user_id },{ portfolio: 1, _id: 0 })
            console.log( portfolio ) 
            resolve(portfolio) 
        }
        catch(e)
        {
            console.log(' Error occured while getting user Portfolio ')
            console.log(e) 
            reject(e) 
        }
    })
}

// Update Portfolio 
async function updatePortfolioItem(user_id, item_id, doc )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            
            const updateKeys = Object.keys( doc ) 
            console.log( updateKeys ) 
            const update = { $set:{ }}

            for( var i = 0;  i < updateKeys.length ; i++ )
            {
                update.$set[`portfolio.$.${updateKeys[i]}`] = doc[updateKeys[i]]
            }

            console.log( update ) 

            const updated = await UserProfile.updateOne({ user_id, "portfolio._id": item_id  }, update)
            resolve(updated) 
        }
        catch(e)
        {
            console.log(' Error occured while getting updating portfolio item ')
            console.log(e) 
            reject(e) 
        }
    })
}



module.exports = { createUserProfile, updateBioDetails,
     addExperience, getExperiences, updateExperience,
      removeExperience, addToPortfolio, getPortfolio, updatePortfolioItem  } 


// Models 
const UserDashboard = require('../../models/UserDashboard') 


async function createUserDashboard( user_id )
{
   return new Promise(async(resolve, reject)=>{
    try 
    {
        console.log(' Creating new user dashboard ') 
        const newUserDashboard = new UserDashboard({ user_id })
        await newUserDashboard.save() 
        console.log(' Created new user Dashboard ') 
        resolve() 
    }
    catch(e)
    {
        console.log(' Error occured while creating user Dashboard ')
        console.log(e)
        e.type = 'SERVER'
        e.message = 'ERROR OCCURED WHILE CREATING USER DASHBOARD'
        reject(e)
    }
   })
}


module.exports = { createUserDashboard } 
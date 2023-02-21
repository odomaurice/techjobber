

// Models 
const UserDashboard = require('../../models/UserDashboard') 
const AdminDashboard = require('../../models/AdminDashboard') 

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

async function createAdminDashboard( user_id )
{
   return new Promise(async(resolve, reject)=>{
    try 
    {
        console.log(' Creating new user dashboard ') 
        const newAdminDashboard = new AdminDashboard({ user_id })
        await newAdminDashboard.save() 
        console.log(' Created new Admin Dashboard ') 
        resolve() 
    }
    catch(e)
    {
        console.log(' Error occured while creating Admin Dashboard ')
        console.log(e)
        e.type = 'SERVER'
        e.message = 'ERROR OCCURED WHILE CREATING Admin DASHBOARD'
        reject(e)
    }
   })
}


module.exports = { createUserDashboard, createAdminDashboard  } 

// Models 
const UserProfile = require('../../models/UserProfiles') 

// Service 
const { createUserProfile, updateBioDetails, addExperience, getExperiences } = require('../../services/user/profile.service') 


async function getProfile(req, res, next)
{
    try 
    {

        console.log(' Getting User Profile ')
      
        const user_id = '63e729574396b20fad91f78c'
        const firstname = 'firstname'
        const lastname = 'lastname'


        const fields = { _id: 0, bioDetails: 1, experience: 1, portfolio: 1 } 
        const userProfile = await UserProfile.findOne({ user_id }, fields ) 

        if( !userProfile )
        {
            console.log(' User Profile not found, creating new user profile ') 
            const userProfile = await createUserProfile( user_id ) 
            return res.render('pages/user/test',{ userProfile, names:{ firstname, lastname }})

        }

        return res.render('pages/user/test',{ userProfile, names:{ firstname, lastname } })

    }
    catch(e)
    {
        console.log(e) 
        return res.render('pages/serverError',{error: [' Server Encountered error while fetching user profile ']})
    }
}


async function updateBioDetailsHandler(req, res, next)
{
    try 
    {
        const user_id = '63e729574396b20fad91f78c'
        const doc = { roleTitle: 'roleTitle', bio:'this is a short bio', technologies:['html','css','js'], profilePicture: 'url'}
        // validate user input
        await updateBioDetails( user_id, doc ) 
        return res.json({ good: true })
    }   
    catch(e)
    {
        console.log(' Error occured while updating user details ') 
        console.log(e) 
    }
}


async function addExperienceHandler(req, res, next)
{
    try 
    {
        const user_id = '63e729574396b20fad91f78c'
        const addedExperience = await addExperience( user_id, req.body ) 
        console.log( addedExperience ) 
        return res.send('Ok')
    }
    catch(e)
    {
        console.log(e) 
        return res.render('pages/serverError',{ error:['error occured while adding experience ']})
    }
}


async function getExperiencesHandler(req, res, next)
{
    try 
    {
        const user_id = '63e729574396b20fad91f78c'
        const experiences = await getExperiences( user_id ) 
        return res.json( experiences ) 
    }
    catch(e)
    {
        return res.render('pages/serverError',{ error:['server encountered error while fetchning experiences']})
    }
}


module.exports = { getProfile, updateBioDetailsHandler, addExperienceHandler, getExperiencesHandler } 
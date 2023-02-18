
// Models 
const UserProfile = require('../../models/UserProfiles') 

// Service 
const { createUserProfile, updateBioDetails, addExperience, 
    getExperiences, updateExperience, removeExperience ,
    getPortfolio,  addToPortfolio, updatePortfolioItem, 
removePortfolioItem, saveSkillsToUserDashboard  } = require('../../services/user/profile.service') 



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
        const doc = { roleTitle: 'roleTitle', bio:'this is a short bio', skills:['html','css','js'], profilePicture: 'url'}

        // validate user input
        await updateBioDetails( user_id, doc ) 
      
        if( skills )
        {
            // save skills to user dashboard 
            await saveSkillsToUserDashboard( user_id, skills )
        }
        


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


async function updateExperienceHandler(req, res, next)
{
    try 
    {
        
        console.log(' Updating experience ') 
        const user_id = '63e729574396b20fad91f78c'
        const experience_id = '63ee6ef6b78cbef1ba2aec53'
        const doc = { organization: "GraceVille", roleType:"ceo" }
        await updateExperience( user_id, experience_id, doc )
        return res.send('Ok') 
    }
    catch(e)
    {
        return res.render('pages/serverError',{ error:['server encountered error while updating experience ']})
    }
}


async function removeExperienceHandler(req, res, next)
{
    try 
    {
        
        console.log(' removing experience ') 
        const user_id = '63e729574396b20fad91f78c'
        const experience_id = "63ee6ef6b78cbef1ba2aec53"

        await removeExperience(user_id, experience_id)
        return res.send('Ok') 
    }
    catch(e)
    {
        console.log(e) 
        return res.render('pages/serverError',{ error:['server encountered error while updating experience ']})
    }
}

async function addItemToPortfolioHandler(req, res, next)
{
    try 
    {
        console.log(' Add Item to portfolio Handler ')
        const user_id = '63e729574396b20fad91f78c'
        const addedItem = await addToPortfolio( user_id, req.body ) 
        console.log( addedItem ) 
        return res.send('Ok')
    }
    catch(e)
    {
        console.log(e) 
        return res.render('pages/serverError',{ error:['error occured while adding experience ']})
    }
}


async function getPortfolioHandler(req, res, next)
{
    try 
    {
        console.log(' Get portfolio Handler ')
        const user_id = '63e729574396b20fad91f78c'
        const addedItem = await getPortfolio( user_id )
        console.log( addedItem ) 
        return res.send( addedItem ) 
    }
    catch(e)
    {
        console.log(e) 
        return res.render('pages/serverError',{ error:['error occured while adding experience ']})
    }
}


async function updatePortfolioItemHandler(req, res, next)
{
    try 
    {
        const user_id = '63e729574396b20fad91f78c' 
        const item_id = '63eea6ab2a7ecf1c8faf5eba'
        const updatedItem = await updatePortfolioItem( user_id,item_id, req.body )
        return res.send(updatedItem) 
    }
    catch(e)
    {
        console.log(' Error occured while updating Portfolio Item ')
        console.log('here')
        console.log(e) 
        return res.send(e) 
    }
}


async function removePortfolioItemHandler(req, res, next)
{
    try 
    {
        
        console.log(' removing Portfolio Item ') 
        const user_id = '63e729574396b20fad91f78c'
        const item_id = "63eea6ab2a7ecf1c8faf5eba"

        await removePortfolioItem(user_id, item_id)
        return res.send('Ok') 
    }
    catch(e)
    {
        console.log(e) 
        return res.render('pages/serverError',{ error:['server encountered error while removing portfolio item  ']})
    }
}



module.exports = { getProfile, updateBioDetailsHandler, addExperienceHandler, getExperiencesHandler,
         updateExperienceHandler, removeExperienceHandler, addItemToPortfolioHandler, 
        getPortfolioHandler, updatePortfolioItemHandler, removePortfolioItemHandler  } 
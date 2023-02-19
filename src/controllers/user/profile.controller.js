
// Models 
const UserProfile = require('../../models/UserProfiles') 


// Service 
const { createUserProfile, updateBioDetails, addExperience, 
    getExperiences, updateExperience, removeExperience ,
    getPortfolio,  addToPortfolio, updatePortfolioItem, 
removePortfolioItem, saveSkillsToUserDashboard  } = require('../../services/user/profile.service') 



async function getAddExperiencePageHandler(req, res, next)
{
    try 
    {
        return res.render('pages/user/editExperience')
    }
    catch(e)
    {
       console.log(' Error occured while getting add experience page handler ')
       console.log(e) 
       return res.render('pages/serverError',{ error:'Server encountered error while getting edit profile page'})
    }
}


async function getAddPortfolioPageHandler(req, res, next)
{
    try 
    {
        return res.render('pages/user/editPortfolio')
    }
    catch(e)
    {
       console.log(' Error occured while getting add experience page handler ')
       console.log(e) 
       return res.render('pages/serverError',{ error:'Server encountered error while getting edit profile page'})
    }
}


async function getProfile(req, res, next)
{
    try 
    {

        console.log(' Getting User Profile ')

        const errorMessages = req.flash('error')
        const successMessages = req.flash('success') 

        console.log('here')
        console.log( errorMessages )
        console.log( successMessages ) 

        const {  firstname, lastname } = req.user 
        const _id = req.user._id 

        console.log(` Firstname: ${ firstname }`)
        console.log(` lastname: ${ lastname }`)
        

        const fields = { _id: 0, bioDetails: 1, experience: 1, portfolio: 1 } 
        const userProfile = await UserProfile.findOne({ user_id: _id }, fields ) 


        if( !userProfile )
        {
            console.log(' User Profile not found, creating new user profile ') 
            const userProfile = await createUserProfile( _id ) 
            const { bioDetails, experience, portfolio } = userProfile 
            return res.render('pages/user/profile',{errorMessages, successMessages,  bioDetails, experience, portfolio, names:{ firstname, lastname }})
        }


        const { bioDetails, experience, portfolio } = userProfile 
        return res.render('pages/user/profile',{errorMessages, successMessages, bioDetails, experience, portfolio, names:{ firstname, lastname }})

    }
    catch(e)
    {
        console.log('Error occured while getting user profile ') 
        console.log(e) 
        return res.render('pages/serverError',{error: [' Server Encountered error while fetching user profile ']})
    }
}



async function updateBioDetailsHandler(req, res, next)
{
    try 
    {
        const user_id = req.user._id 
        // validate user input
        await updateBioDetails( user_id, req.body ) 
      
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
        console.log(req.body.skills) 
        // Turn Skills to array 
        var skills = req.body.skills 
        var temp = skills.split(",")
        req.body.skills = temp 

        const startDate = req.body.startDate 
        const endDate = req.body.endDate 

        console.log(' Debug ') 
        console.log( startDate ) 
        console.log( endDate ) 


        const user_id = req.user._id 
        const addedExperience = await addExperience( user_id, req.body ) 
        console.log(' Experience added ') 
        req.flash('success','Successfully Added Experience')
        return res.redirect('/dashboard/profile')
    }
    catch(e)
    {
        console.log(e) 
        req.flash('error','Error occured while adding Experience')
        return res.redirect('/dashboard/profile')
    }
}


async function getExperiencesHandler(req, res, next)
{
    try 
    {
        const user_id = req.user._id 
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
        const user_id = req.user._id 
        await addToPortfolio( user_id, req.body ) 
        req.flash('success','Item added to portfolio successfully') 
        return res.redirect('/dashboard/profile')
    }
    catch(e)
    {
        console.log(' Error occured while adding error to portfolio ')
        console.log(e) 
        req.flash('error','Server error occured while adding item to portfolio ')
        return res.redirect('/dashboard/profile') 
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
        getPortfolioHandler, updatePortfolioItemHandler, removePortfolioItemHandler, getAddExperiencePageHandler , getAddPortfolioPageHandler} 
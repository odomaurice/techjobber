
// Model 
const UserDashboard = require('../../models/UserDashboard') 


// Service 
const  { getJobFeed } = require('../../services/user/job.service')


async function getDashboard(req, res, next)
{
    try 
    {
        console.log(' Getting User Dashboard ') 
        const errorMessages = req.flash('error')
        const successMessages = req.flash('success') 


        console.log('-------DEBUG----------')
        console.log( req.session )
        console.log( req.user ) 
        console.log('-----------------------')

        var user  

        if( req.session.user !== undefined  )
        {
            console.log(' Session')
            var user = req.session.user 
        }else 
        if( req.user )
        {
            console.log(' req.user ')
           var  user = req.user
           
        }


        if( user.userType === 'superAdmin' ) 
        {
            // RETURN SUPER ADMIN DASHBOARD 
            console.log(' super admin ')
            return res.render('pages/admin/admin_dashboard',{ errorMessages, successMessages })
        } 


        const user_id = user._id 
        const dataToRetrieve = { number_of_notifications: 1, _id: 0, skills: 1 }

        const dashboardData = await UserDashboard.findOne({ user_id  },dataToRetrieve)
        console.log('here') 
        console.log( dashboardData )

        // fetch job feed 
        // order, skip, limit, userSkills 
        const order = 1 
        const skip = 0 
        const limit = null 
        
        const jobFeed = await getJobFeed( order, skip, limit, dashboardData.skills ) 
        console.log(' Fetched User Dashboard ')
        console.log( dashboardData ) 
        
        

        return res.render('pages/user/user_dashboard',{ dashboardData, jobFeed, errorMessages, successMessages  })
    }
    catch(e)    
    {
        console.log(' Error occured while getting User Dashboard ')
        console.log(e)
        return res.render('pages/serverError',{ error: ' Server Encountered error while getting User Dashboard '})
    }
}



module.exports = { getDashboard } 
const userRoutes = require('./user/user.route') 
const landingPageRoutes = require('./landingPage/index.route')
const talentRoutes = require('./talent/talent.route') 
const indexRoutes = require('./index/index.route') 
const adminRoutes = require('./admin/admin.route')
const jobRoutes = require('./job/job')


module.exports = function(app)
    {
        try 
        {

            console.log(' Building User Routes ')

            // Index Routes 
            indexRoutes(app) 

            // Admin Routes 
            adminRoutes(app) 

            // Job Routes 
            jobRoutes(app) 
            
            // Building User Routes 
            userRoutes(app) 

            // Building Landing Page Routes 
            landingPageRoutes(app) 

            // talent route 
            talentRoutes(app) 
            

            console.log(' Application Routes Built ')
        }
        catch(e)
        {
            console.log(' Error occured while building application routes ')
            console.log(e)
        }
    }
const userRoutes = require('./user/user.route') 
const landingPageRoutes = require('./landingPage/index.route')

module.exports = function(app)
    {
        try 
        {

            console.log(' Building User Routes ')

            // Building User Routes 
            userRoutes(app) 

            // Building Landing Page Routes 
            landingPageRoutes(app) 

            console.log(' Application Routes Built ')
        }
        catch(e)
        {
            console.log(' Error occured while building application routes ')
            console.log(e)
        }
    }
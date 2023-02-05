const userRoutes = require('./user/user.route') 


module.exports = function(app)
    {
        try 
        {

            console.log(' Building User Routes ')

            // Building User Routes 
            userRoutes(app) 


            console.log(' Application Routes Built ')
        }
        catch(e)
        {
            console.log(' Error occured while building application routes ')
            console.log(e)
        }
    }
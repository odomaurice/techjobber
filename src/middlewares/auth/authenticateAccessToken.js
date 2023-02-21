require('dotenv').config() 
const jwt = require('jsonwebtoken') 


async function authenticateAccessToken(req, res, next)
{
    try 
    {
        
        const { AUTH_TOKEN } = req.cookies 

        // Validate AUTO_TOKEN 
        jwt.verify(AUTH_TOKEN, process.env.JWT_SECRET,(err, decoded)=>{
            if( err )
            {
                res.redirect('/signin') 
            }
            
            console.log(' Token Valid')
            req.user = decoded 
            return next() 
        } )

    }
    catch(e)
    {
        console.log(' Server encountered error while authenticating request token ') 
        console.log(e) 
        const errors = ['server encountered error while authenticating route access ']
        res.redirect('/signin')
    }
} 

module.exports = { authenticateAccessToken } 
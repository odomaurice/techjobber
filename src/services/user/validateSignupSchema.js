const SignupSchema = require('../../validation_schema/user/signup')


async function validateSignupSchema( schema )
{
    try 
    {
        await SignupSchema.validateAsync( schema ) 
        console.log(' signup schema valid ')
    }
    catch(e)
    {
        console.log(' Error occured while validating signup schema ')
        console.log(e) 
        
        e.type = 'schema' 
        throw e 
    }
}


module.exports = validateSignupSchema 
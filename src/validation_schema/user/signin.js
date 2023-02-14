const JOI = require('joi') 


const SigninSchema = JOI.object
    (
        {
            email: JOI.string().email().required(), 
            password: JOI.string().required() 
        }
    )


    module.exports = SigninSchema
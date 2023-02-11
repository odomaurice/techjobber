const JOI = require('joi') 



const SignupSchema = JOI.object
    (
        {
            email: JOI.string().email().required(),
            firstname: JOI.string().min(2).max(30).required(),
            lastname: JOI.string().min(2).max(30).required(), 
            password: JOI.string().min(5).max(30).required(),
            userType: JOI.string().required(), 
        }
    )



module.exports = SignupSchema 
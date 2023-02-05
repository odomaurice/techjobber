const JOI = require('joi') 



const SignupSchema = JOI.object
    (
        {
            email: JOI.string().email().required(),
            firstname: JOI.string().min(2).max(30).required(),
            lastname: JOI.string().min(2).max(30).required(), 
            password: JOI.string().min(5).max(30).required(),
            cohort: JOI.number().integer().min(1).required()
        }
    )



module.exports = SignupSchema 
const JOI = require('joi') 


    const AdminSignupSchema = JOI.object
    (
        {
            email: JOI.string().email({ minDomainSegments: 2,  tlds:{ allow:["com","net"], deny:["xyz"]}}).required(),
            firstname: JOI.string().min(2).max(30).required(),
            lastname: JOI.string().min(2).max(30).required(), 
            password: JOI.string().min(5).max(30).message('check password').required(),
            repeatPassword: JOI.ref('password'),
        }
    )


module.exports =  AdminSignupSchema 
const JOI = require('joi') 


const  CreateJobSchema  = JOI.object 
    (
        {
            summary: JOI.object
                (
                    {
                        title: JOI.string().required(), 
                        description: JOI.string().required(), 
                        paymentType: JOI.string().required(), 
                        experienceLevel: JOI.string().required(), 
                        numberOfProposals: JOI.number().required(), 
                        technologies: JOI.array().sparse() 
                    }
                )   
        }
    )



module.exports = CreateJobSchema 
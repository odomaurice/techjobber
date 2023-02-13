const mongoose = require('mongoose')
const Schema = mongoose.Schema 


const JobDetailsSchema = new Schema
    (
        {
            proposals:
            {
                type: []
            },
            assignedTo:
            {
                type: [] 
            },
            completionDetails:
            {
                startedOn:
                {
                    type: Date
                },
                amountPaid:
                {
                    type: Number
                },
                completedOn:
                {
                    type: Date
                }
            },
            recruiterDetails:
            {}
        }
    )


module.exports = JobDetailsSchema
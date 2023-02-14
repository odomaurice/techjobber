const mongoose = require('mongoose')
const Schema = mongoose.Schema 


const JobSummarySchema = require('./SubSchemas/JOB/JobSummary')
const JobDetailsSchema = require('./SubSchemas/JOB/JobDetails') 

const JobSchema = new Schema 
    (
        {
            summary:
            {
                type: JobSummarySchema,
                required: true 
            },
            details:
            {
                type: JobDetailsSchema,
                required: true 
            },
            status:
            {
                type: String, 
                required: true, 
                default: 'active' 
            }
        }
    )

    
const JobsSchema = new Schema 
    (
        {
            recruiter_id:
            {
                types: mongoose.Types.ObjectId, 
                required: true 
            },
            jobs:
            {
                type: [JobSchema]
            }
        },
        {
            timestamps: true 
        }
    )



const Job = mongoose.model('job', JobsSchema)
module.exports = Job 
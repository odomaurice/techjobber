const mongoose = require('mongoose') 
const Schema = mongoose.Schema 


// Schema 
const JobDescriptionSection = require('./SubSchemas/JOB/JobDiscriptionSection')


const JobPostSchema = new Schema
    (
        {       
            postedBy:
            {
                type: String, 
                required: true
            },
            title: 
            {
                type: String, 
                required: true, 
                trim: true 
            },
            jobType: 
            {
                type: String, 
                required: true 
            }, 
            salary:
            {
                type: String 
            },
            experienceLevel: 
            {
                type: String 
            },
            companyName:
            {
                type: String, 
                required: true 
            },
            jobLocation: 
            {
                type: String, 
                required: true 
            }, 
            jobLink: 
            {
                type: String, 
                required: true 
            }, 
            skills:
            {
                type: [String],
                required: true 
            },
            descriptionSections:
            {
                type:[JobDescriptionSection]
            },
            description:
            {
                type: String 
            }
        },
        {
            timestamps: true 
        }
    )


    const JobPost = mongoose.model('jobpost', JobPostSchema )
    module.exports = JobPost 
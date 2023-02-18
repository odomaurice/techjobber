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
            employmentType: 
            {
                type: String, 
                required: true 
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
            discriptionSections:
            {
                type:[JobDescriptionSection]
            }
        },
        {
            timestamps: true 
        }
    )


    const JobPost = mongoose.model('jobpost', JobPostSchema )
    module.exports = JobPost 
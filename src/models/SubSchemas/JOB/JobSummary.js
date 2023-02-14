const mongoose = require('mongoose')
const Schema = mongoose.Schema 


const JobSummarySchema = new Schema 
    (
        {
            title: 
            {
                type: String, 
                required: true, 
                trim: true 
            },
            description:
            {
                type: String, 
                required: true, 
                trim: true
            },
            paymentType:
            {
                type: String,
                required: true, 
                trim: true 
            },
            experienceLevel:
            {
                type: String, 
                required: true, 
                trim: true 
            },
            numberOfProposals:
            {
                type: Number, 
                required: true, 
                trim: true 
            },
            technologies:
            {
                type: [String],
                required: true 
            }

        }
    )


module.exports = JobSummarySchema 
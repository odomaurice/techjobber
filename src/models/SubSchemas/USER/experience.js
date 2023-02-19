const mongoose = require('mongoose')
const Schema = mongoose.Schema 


const ExperienceSchema = new Schema 
        (
            {
                jobTitle:
                {
                    type: String 
                },
                company: 
                {
                    type: String 
                },
                employmentType: 
                {
                    type: String
                },
                startDate: 
                {
                    type: Date
                },
                location:
                {
                    type: String 
                },
                endDate: 
                {
                    type: Date 
                },
                numberOfMonthsWorked: 
                {
                    type: Number 
                },
                description: 
                {
                    type: String, 
                    required: true 
                },
                skills: 
                {
                    type: [String] 
                }
            }
        )

       
module.exports = ExperienceSchema 
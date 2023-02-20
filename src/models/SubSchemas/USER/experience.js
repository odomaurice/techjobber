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
                    type: String
                },
                location:
                {
                    type: String 
                },
                endDate: 
                {
                    type: String 
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
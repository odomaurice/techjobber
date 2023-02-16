const mongoose = require('mongoose')
const Schema = mongoose.Schema 


const ExperienceSchema = new Schema 
        (
            {
                roleTitle:
                {
                    type: String 
                },
                organization: 
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
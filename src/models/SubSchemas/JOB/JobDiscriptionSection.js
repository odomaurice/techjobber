const mongoose = require('mongoose')
const Schema = mongoose.Schema 


const JobDescriptionSectionSchema = new Schema 
    (
        {
            section_title: 
            {
                type: String
            },
            section_content:
            {
                type: String, 
            },
            type: 
            {
                type: String, 
                required: true 
            }, 
            listItems:
            {
                type: [String]
            }
        }
    )


module.exports = JobDescriptionSectionSchema 
const mongoose = require('mongoose')
const Schema = mongoose.Schema 



const PortfolioSchema = new Schema 
    (
        {
            title: 
            {
                type: String, 
                required: true
            },
            pictures: 
            {
                type: [String]
            },
            description: 
            {
                type: String, 
                required: true 
            },
            link: 
            {
                type: String 
            },
            skills: 
            {
                type: [String], 
                required: true 
            }
        }
    )


module.exports = PortfolioSchema 
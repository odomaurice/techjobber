const mongoose = require('mongoose') 
const Schema = mongoose.Schema 


const BioDetailsSchema = new Schema 
(
    {
        profilePicture:
        {
            type: String,
        }, 
        jobTitle:
        {
            type: String
        },
        technologies:
        {
            type:[String]
        },
        shortBio: 
        {
            type: String 
        },
        fullBio: 
        {
            type: String 
        }
    }
)



module.exports = BioDetailsSchema 
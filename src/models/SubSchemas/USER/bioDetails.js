const mongoose = require('mongoose') 
const Schema = mongoose.Schema 


const BioDetailsSchema = new Schema 
(
    {
        profilePicture:
        {
            type: String,
        }, 
        roleTitle:
        {
            type: String
        },
        skills:
        {
            type:[String]
        },
        bio: 
        {
            type: String 
        }
    }
)



module.exports = BioDetailsSchema 
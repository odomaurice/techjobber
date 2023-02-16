const mongoose = require('mongoose')
const Schema = mongoose.Schema 

// Sub Schemas 
const BioDetailsSchema = require('./SubSchemas/USER/bioDetails')
const ExperienceSchema = require('./SubSchemas/USER/experience') 
const PortfolioSchema  = require('./SubSchemas/USER/portfolio') 


const UserProfileSchema = new Schema 
    (
        {
            user_id: 
            {
                type: mongoose.Types.ObjectId, 
                required: true
            },
            bioDetails:
            {
                type: BioDetailsSchema,
                required: true,
                default: { } 
            },
            experience:
            {
                type: [ExperienceSchema ]
            },
            portfolio: 
            {
                type: [PortfolioSchema]
            }
        }
    )



const UserProfile = mongoose.model('userProfile', UserProfileSchema ) 
module.exports = UserProfile 
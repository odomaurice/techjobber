const mongoose = require('mongoose')
const Schema = mongoose.Schema 


const TransactionSummarySchema = new Schema 
    (
        {
            amount: 
            {
                type: String 
            }
        }
    )



const RecruiterDashoboardSchema = new Schema 
    (
        {
            recruiter_id:
            {
                type: mongoose.Types.ObjectId, 
                required: true 
            },
            jobsPosted:
            {
                type: Number, 
                required: true, 
                default: 0 
            },
            contractsResolved: 
            {
                type: Number, 
                required: true, 
                default: 0 
            },
            pendingContracts:
            {
                type: Number,
                required: true, 
                default: 0 
            },
            transactions:
            {
                type: [TransactionSummarySchema]
            }
        }
    )



    const RecruiterDashboard = mongoose.model('recruiterDashboard', RecruiterDashoboardSchema )
    module.exports = RecruiterDashboard 
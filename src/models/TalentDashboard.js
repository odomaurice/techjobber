const mongoose = require('mongoose')
const Schema = mongoose.Schema 


const TransactionSummary = new Schema 
    (
        {
            transaction_id:
            {
                type: mongoose.Types.ObjectId, 
                required: true
            },
            amount:
            {
                type: String, 
                required: true 
            },
            date:
            {
                type: Date, 
                required: true, 
                default: Date.now() 
            }
        }
    )


const TalentDashboardSchema = new Schema
    (
        {
            userEmail:
            {
                type: String, 
                required: true 
            },
            numberOfJobNotifications: 
            {
                type: Number,
                required: true,
                default: 0 
            },
            notificationsCount:
            {
                type: Number, 
                required: true,
                default: 0 
            },
            numberOfMessageNotifications:
            {
                type: Number,
                required: true,
                default: 0 
            },
            balance:
            {
                type: String, 
                required: true, 
                trim: true, 
                default: '0.0'
            },
            numberOfResolvedContracts:
            {
                type: Number, 
                required: true, 
                default: 0 
            },
            numberOfPendingContracts:
            {
                type: Number,
                required: true, 
                default: 0 
            },
            transactions:
            {
                type: [TransactionSummary]
            }
        }
    )



const TalentDashboard = mongoose.model('talentDashboard', TalentDashboardSchema )
module.exports = TalentDashboard 
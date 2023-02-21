const mongoose = require('mongoose')
const Schema = mongoose.Schema 




const PasswordResetTicketSchema = new Schema 
    (
        {
            email: 
            {
                type:String, 
                required: true
            },
            passwordResetCode: 
            {
                type: String, 
                required: true 
            }
        }
    )



const PasswordResetTicket = mongoose.model('passwordresetticket', PasswordResetTicketSchema  ) 
module.exports = PasswordResetTicket

const mongoose = require('mongoose') 
const config = require('config')

mongoose.set('strictQuery', true )


// Vars 
const MONGOOSE_DEFAULT_CONNECTION_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true }
const DB_URI = config.get('DB_URI') || ''
const MONGOOSE_CONNECTION_OPTIONS = config.get('MONGOOSE_CONNECTION_OPTIONS') || MONGOOSE_DEFAULT_CONNECTION_OPTIONS


// Functions 


// Start Database 
function start()
{
    try 
    {
        console.log(' Starting Database ')
        
        mongoose.connect(DB_URI,MONGOOSE_CONNECTION_OPTIONS)

        const db = mongoose.connection 
        
        db.on('connected',()=>{
            console.log(" Database connection created ")
        })
 

        db.on('error',(e)=>{
            console.log(' Database  Error ')
            console.log(e)
            process.exit(1) 
        })
    }
    catch(e)
    {
        console.log(' Error occured while starting database ')
        console.log(e) 
    }
}


module.exports = { start } 
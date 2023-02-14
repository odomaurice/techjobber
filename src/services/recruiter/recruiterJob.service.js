

// Schema 
const CreateJobSchema = require('../../validation_schema/recruiter/recruiterJob') 


// Model 
const Job = require('../../models/Jobs') 


async function validateCreateJobSchema( schema )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            await CreateJobSchema.validateAsync( schema ) 
            resolve() 
        }
        catch(e)
        {

            console.log(' Server Encountered error while Validating Job Schema ')
            console.log(e) 

            
            if( e.isJoi === true )
            {
                e.type = 'USER_INPUT'
                reject(e)
            }

            e.type = 'SERVER'
            e.message = 'Server Encountered error while creating Job'
            reject(e) 
        }
    })
}


async function createJob( jobDetails )
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            const newJob = new Job(jobDetails) 
            const savedJob = await newJob.save() 
            resolve(savedJob) 
        }
        catch(e)
        {
            console.log('Error occured while creating new Job ') 
            console.log(e) 
            e.message = ' Server Encountered error while creating Job '
            e.type = 'SERVER' 
            reject(e) 
        }
    })
}

async function get_n_number_of_created_jobs(recruiter_id,)
{
    return new Promise(async(resolve, reject)=>{
        try 
        {

        }
        catch(e)
        {

        }
    })
}


module.exports = { validateCreateJobSchema, createJob } 
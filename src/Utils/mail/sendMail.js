require('dotenv').config() 
const nodemailer = require('nodemailer') 
const fs = require('fs/promises')
const path = require('path')
const ejs = require('ejs')

const transport = nodemailer.createTransport(
            { 
                'service': 'gmail',
                'tls':
                {
                    rejectUnauthorized: false 
                }, 
                'auth':
                { 
                    'user': process.env.TEST_EMAIL,
                    'pass': process.env.TEST_EMAIL_PASSWORD 
                }
            }
        )

function getMailHtml(mailName, mailVariables)
{
    return new Promise(async(resolve, reject)=>{
        try 
        {
            
            if( mailVariables ) 
            {
                const filePath = path.join( __dirname + `/templates/${mailName}.ejs` )
                console.log( filePath )
                const templateFile = await fs.readFile( filePath ,'utf-8')
                const compiled = ejs.compile(templateFile) 
                const htmlFile = compiled(mailVariables)
                resolve(htmlFile) 
            }
            else 
            {
                const filePath = path.join( __dirname + `/templates/${mailName}.ejs` )
                var htmlFile = await fs.readFile(filePath,'utf-8')
                resolve(htmlFile)
            }

        }
        catch(e)
        {
            console.log(' Error occured while getting mail  html ')
            console.log(e) 
            reject(e) 
        }
    })
}

function createMail( mailName, mailBodyDoc, mailVariables)
{
   return new Promise(async (resolve, reject)=>{
        try 
        {
            // get mail body html 
            var html = await getMailHtml( mailName, mailVariables) 

            // set mail body 
            const mail = 
                    {
                        from: mailBodyDoc.from ,
                        to:  mailBodyDoc.to ,
                        subject: mailBodyDoc.subject ,
                        text: mailBodyDoc.text , 
                        html: html 
                    }

            resolve(mail)
        }
        catch(e)
        {
            console.log(' Error occured while creating mail ')
            console.log(e)
            reject(e) 
        }
   })
}

function sendMail( mailName, mailBodyDoc, mailVariables )
{
    return new Promise( async(resolve, reject)=>{
        try 
        {
            console.log(' Creating Mail ')

            const mail = await createMail(mailName, mailBodyDoc, mailVariables ) 

            transport.sendMail(mail)
            .then((info)=>{
                console.log(' Mail Sent ! ') 

                console.log(' Accepted mail Addresses ')
                console.dir( info.accepted )


                console.log(' Pending mail Addresses ')
                console.dir( info.pending ) 


                console.log(' Rejected Mail Addresses ')
                console.dir( info.rejected ) 
                resolve() 

             })
            .catch((e)=>{
                console.log(' Failed to send mail, ensure previous actions acid ')
                console.log(e) 
                e.type = 'email'
                e.message = 'server encountered error while sending mail' 
                reject(e) 
            })


        }
        catch(e)
        {
            console.log(' Error occured while sending mail ') 
            console.log(e)
            e.type = 'serveer'
            e.message = 'server encountered error while registering user'  
            reject(e)
        }
    })
}


module.exports = { sendMail }
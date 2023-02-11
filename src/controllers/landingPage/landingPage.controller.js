

async function serveLandingPage(req, res, next)
{
    try 
    {
        res.render('pages/landing')
    }
    catch(e)
    {
        console.log(' Error occured while serving landing page ')
        console.log(e) 
    }
}


module.exports = { serveLandingPage }
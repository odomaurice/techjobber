



function getIndexPage(req, res, next)
{
    try 
    {
        return res.render('pages/index')
    }
    catch(e)
    {
        console.log(" Server Encountered Error while getting index page ")
        console.log(e) 
        return res.render('serverError') 
    }
}


module.exports = { getIndexPage } 
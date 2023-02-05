

function send422Response(res,msg)
{
    return res.render('pages/signup',{ error: msg })
}


module.exports = send422Response 
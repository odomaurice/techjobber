

function send500Response(res,msg)
{
    return res.status(500).json({ success: false, msg })
}

module.exports = send500Response 
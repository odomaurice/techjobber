

// Services 
const {getRecruiterDashboard  } = require('../../services/recruiter/recruiter.service')


const getRecruiterDashboard = async function(req, res, next)
{
    try 
    {
        const dashboardData = await getRecruiterDashboard(recruiter_id)
        return res.render('pages/recruiter/recruiter_dashboard') 
    }
    catch(e)
    {
        return res.render('serverError',{ errors:['Server Encountered Error while getting user dashboard ']})
    }
}



module.exports = { getRecruiterDashboard } 
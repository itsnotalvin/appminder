const express = require('express');
const router = express.Router();
const User = require('../models/Users.js');
const Jobs = require('../models/Jobs.js');

router.get('/allUserJobs', (request, response) => {
    const loggedInEmail = request.session.email;
    Jobs.getUsersJobs(loggedInEmail)
        .then(dbRes => {
            response.json(dbRes.rows)
        })
        .catch(err => response.statusCode(500).json({ message: 'Unknown error has occurred on our end, sorry!' }))
});

router.post('/', (request, response) => {
    const { job_title, company_name, app_stage, key_date, set_reminder, notes } = request.body;
    const loggedInEmail = request.session.email;
    User.checkUserDetailsWithEmail(loggedInEmail)
        .then(dbRes => {
            const loggedInUserId = dbRes.rows[0].id;
            Jobs.createNewJob(loggedInUserId, job_title, company_name, app_stage, key_date, set_reminder, notes)
                .then(dbRes => response.json({ message: 'Job Application successfully stored' }))
                .catch(err => response.statusCode(500).json({ message: 'Unknown error occurred in storing job application, sorry!' }))
        })
        .catch(err => response.statusCode(500).json({ message: 'Could not find the right user to store job information, sorry!' }))
});

module.exports = router;
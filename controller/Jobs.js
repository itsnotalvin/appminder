const express = require('express');
const router = express.Router();
const User = require('../models/Users.js');
const Jobs = require('../models/Jobs.js');
const currentTime = require('./Date.js');

router.get('/allUserJobs', (request, response) => {
    const loggedInEmail = request.session.email;
    Jobs.getUsersJobs(loggedInEmail)
        .then(dbRes => {
            response.json(dbRes.rows)
        })
        .catch(err => response.status(500).json({ message: 'Unknown error has occurred on our end, sorry!' }))
});

router.get('/categoryCount', (request, response) => {
    const loggedInEmail = request.session.email;
    Jobs.getCategoryCount(loggedInEmail)
        .then(dbRes => {
            response.json(dbRes.rows)
        })
        .catch(err => response.status(500).json({ message: 'Could not fetch job count for user due to internal server error!' }))
});

router.post('/', (request, response) => {
    const { job_title, company_name, app_stage, key_date, set_reminder, notes } = request.body;
    const loggedInEmail = request.session.email;
    const currentTimestamp = currentTime.currentTime();
    User.checkUserDetailsWithEmail(loggedInEmail)
        .then(dbRes => {
            const loggedInUserId = dbRes.rows[0].id;
            Jobs.createNewJob(loggedInUserId, job_title, company_name, app_stage, key_date, set_reminder, notes, currentTimestamp)
                .then(dbRes => response.json({ message: 'Job Application successfully stored' }))
                .catch(err => response.status(500).json({ message: 'Unknown error occurred in storing job application, sorry!' }))
        })
        .catch(err => response.status(500).json({ message: 'Could not find the right user to store job information, sorry!' }))
});

router.patch('/updateReminder/:newStatus/:jobId', (request, response) => {
    const newStatus = request.params.newStatus;
    const jobId = request.params.jobId;
    const currentTimestamp = currentTime.currentTime();
    Jobs.updateJobReminderStatus(jobId, newStatus, currentTimestamp)
        .then(dbRes => response.json({ message: `Changed job reminder status! - for job - ${jobId}` }))
        .catch(err => response.status(500).json({ message: `Sorry! We were unable to update reminder status for job - ${jobId} due to an internal error` }))
});

router.patch('/archiveStatusChange/:newStatus/:jobId', (request, response) => {
    const newStatus = request.params.newStatus;
    const jobId = request.params.jobId;
    const currentTimestamp = currentTime.currentTime();
    Jobs.updateJobArchiveStatus(jobId, newStatus, currentTimestamp)
        .then(dbRes => response.json({ message: `Changed job archive status! - for job - ${jobId}` }))
        .catch(err => response.status(500).json({ message: `Sorry! We were unable to update archive status for job - ${jobId} due to an internal error` }))
});

router.patch('/completionStatusChange/:newStatus/:jobId', (request, response) => {
    const newStatus = request.params.newStatus;
    const jobId = request.params.jobId;
    const currentTimestamp = currentTime.currentTime();
    Jobs.updateJobCompletionStatus(jobId, newStatus, currentTimestamp)
        .then(dbRes => response.json({ message: `Changed job completion status! - for job - ${jobId}` }))
        .catch(err => response.status(500).json({ message: `Sorry! We were unable to update completion status for job - ${jobId} due to an internal error` }))
});

// add the ability to check if new notes are any different from the original
router.patch('/updateJobInfo', (request, response) => {
    const { job_id, app_stage, key_date, notes } = request.body;
    const currentTimestamp = currentTime.currentTime();
    Jobs.updateJobInfo(job_id, app_stage, key_date, notes, currentTimestamp)
        .then(dbRes => response.json({ message: `Changed job notes! - for job - ${job_id}` }))
        .catch(err => response.status(500).json({ message: `Sorry! We were unable to update notes for job - ${job_id} due to an internal error` }))
});

router.patch('/updateDeletionStatus/:newStatus/:jobId', (request, response) => {
    const newStatus = request.params.newStatus;
    const jobId = request.params.jobId;
    const currentTimestamp = currentTime.currentTime();
    Jobs.updateJobDeleteStatus(jobId, newStatus, currentTimestamp)
        .then(dbRes => response.json({ message: `Changed job deletion status! - for job - ${jobId}` }))
        .catch(err => response.status(500).json({ message: `Sorry! We were unable to update deletion status for job - ${jobId} due to an internal error` }))
});

router.patch('/updateJobStage/:newStage/:jobId', (request, response) => {
    const newStage = request.params.newStage;
    const job_id = request.params.jobId;
    const currentTimestamp = currentTime.currentTime();
    Jobs.updateJobStage(job_id, newStage, currentTimestamp)
        .then(dbRes => response.json({ message: `Changed job stage - for job - ${job_id} to ${newStage}` }))
        .catch(err => response.status(500).json({ message: `Sorry! We were unable to update deletion status for job - ${job_id} due to an internal error` }))
});

module.exports = router;
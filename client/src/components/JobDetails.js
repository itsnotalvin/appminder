import { ApplicationRow } from './ApplicationRow.js';
import axios from 'axios';

export const JobDetails = ({ jobs, selected, changedJobInfo, updateAppModal }) => {
    let displayJobs;
    if (selected !== 'Archive') {
        displayJobs = jobs.filter(job => job.app_stage === selected && job.archived !== true)
    }
    else {
        displayJobs = jobs.filter(job => job.archived === true)
    }
    const changeReminderStatus = (id, newStatus) => {
        console.log(`attempting to change reminder status of ${id} to ${newStatus}`);
        axios.patch(`/jobs/updateReminder/${newStatus}/${id}`)
            .then(dbRes => {
                console.log('changed reminder status');
                changedJobInfo();
            })
    };
    const changeArchiveStatus = (id, newStatus) => {
        console.log(`attempting to change archive status of ${id} to ${newStatus}`);
        axios.patch(`/jobs//archiveStatusChange/${newStatus}/${id}`)
            .then(dbRes => {
                console.log('changed archive status');
                changedJobInfo();
            })
    };
    return (
        <div id="stage-type-applications">
            {
                displayJobs.length ? displayJobs.map((job, index) => <ApplicationRow key={index} jobInfo={job} changeReminderStatus={changeReminderStatus} changeArchiveStatus={changeArchiveStatus} updateAppModal={() => updateAppModal(job)} />) : <div>Nothing to show!</div>
            }
        </div>
    )
};
import { ApplicationRow } from './ApplicationRow.js';
import axios from 'axios';
import { useEffect } from 'react';

export const JobDetails = ({ jobs, selected, changedJobInfo }) => {
    const displayJobs = jobs.filter(job => job.app_stage === selected)
    const setReminder = (id, newStatus) => {
        console.log(`attempting to change reminder status of ${id} to ${newStatus}`);
        axios.patch(`/jobs/updateReminder/${newStatus}/${id}`)
            .then(dbRes => {
                console.log('changed reminder status');
                changedJobInfo();
            })
    };
    return (
        <div id="stage-type-applications">
            {
                displayJobs.length ? displayJobs.map((job, index) => <ApplicationRow key={index} jobInfo={job} setReminder={setReminder} />) : <div>Nothing to show!</div>
            }
        </div>
    )
};
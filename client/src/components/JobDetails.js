import { ApplicationRow } from './ApplicationRow.js';
import '../Dashboard.css'
import axios from 'axios';
import TableCell from '@mui/material/TableCell';

export const JobDetails = ({ jobs, selected, changedJobInfo, updateAppModal }) => {
    let displayJobs;
    if (selected !== 'Archive') {
        displayJobs = jobs.filter(job => job.app_stage === selected && job.archived !== true && job.deleted !== true)
    }
    else {
        displayJobs = jobs.filter(job => job.archived === true && job.deleted !== true)
    }
    const changeReminderStatus = (id, newStatus) => {
        axios.patch(`/jobs/updateReminder/${newStatus}/${id}`)
            .then(dbRes => {
                changedJobInfo();
            })
    };
    const changeArchiveStatus = (id, newStatus) => {
        axios.patch(`/jobs/archiveStatusChange/${newStatus}/${id}`)
            .then(dbRes => {
                changedJobInfo();
            })
    };
    const changeDeleteStatus = (id, newStatus) => {
        axios.patch(`/jobs/updateDeletionStatus/${newStatus}/${id}`)
            .then(dbRes => {
                changedJobInfo();
            })
    };
    return (
        <>
            {
                displayJobs.length ? displayJobs.map((job, index) => <ApplicationRow key={job.id} jobInfo={job} changeReminderStatus={changeReminderStatus} changeArchiveStatus={changeArchiveStatus} updateAppModal={() => updateAppModal(job)} changeDeleteStatus={changeDeleteStatus} />) :
                    <TableCell colSpan={4}>
                        <h4>Nothing to show!</h4>
                    </TableCell>
            }
        </>
    )
};
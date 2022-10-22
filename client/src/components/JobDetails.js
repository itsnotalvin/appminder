import { ApplicationRow } from './ApplicationRow.js';

export const JobDetails = ({ jobs, selected }) => {
    const displayJobs = jobs.filter(job => job.app_stage === selected)
    return (
        <div id="stage-type-applications">
            {
                displayJobs.length ? displayJobs.map((job, index) => <ApplicationRow key={index} jobInfo={job} />) : <div>Nothing to show!</div>
            }
        </div>
    )
};
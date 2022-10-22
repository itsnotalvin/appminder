export const ApplicationRow = ({ jobInfo }) => {
    const { id, job_title, company_name, app_stage, key_date, archived, completed, deleted, last_updated, notes, set_reminder } = jobInfo;
    return (
        <div className='job-row'>
            <div>{company_name}</div>
            <div>{job_title}</div>
            <div>{key_date}</div>
            <div>{last_updated}</div>
            <div>{'<>'}</div>
            <div>Archive</div>
        </div>
    )
};
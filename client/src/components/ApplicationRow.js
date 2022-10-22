import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useState, useEffect } from 'react';

export const ApplicationRow = ({ jobInfo }) => {
    const [hideJobDetails, setHideJobDetails] = useState(false);
    const { id, job_title, company_name, app_stage, key_date, archived, completed, deleted, last_updated, notes, set_reminder } = jobInfo;

    const expandJobDetails = (id) => {
        setHideJobDetails(hideJobDetails ? false : true);
    };

    return (
        <div className='job-row'>
            <div className='core-job-details'>
                <div>{company_name}</div>
                <div>{job_title}</div>
                <div>{key_date}</div>
                <div>{last_updated}</div>
                <div>
                    {
                        !hideJobDetails ? <ArrowDropDownIcon className='icon-mod' onClick={() => expandJobDetails(id)} /> : <ArrowDropUpIcon className='icon-mod' onClick={() => expandJobDetails(id)} />
                    }
                </div>
                <div><ArchiveIcon className='icon-mod' /></div>
            </div>
            <div style={{ display: !hideJobDetails ? 'none' : 'flex' }} className='expanded-job-content' id={id}>
                <div>
                    <strong style={{ margin: 0, padding: 0 }}>Notes</strong>
                </div>
                <div className='notes-and-appUpdateBtn'>
                    <span>{notes}</span>
                    <span className='application-btn'>Update Application</span>
                </div>
            </div>
        </div>
    )
};
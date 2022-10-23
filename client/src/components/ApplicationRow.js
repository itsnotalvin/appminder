import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useState, useEffect } from 'react';
import { timestampCleanup } from './TimestampCleanup';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export const ApplicationRow = ({ jobInfo }) => {
    const [hideJobDetails, setHideJobDetails] = useState(false);
    const [emptyBell, setEmptyBell] = useState('icon-mod hidden');
    const [bell, setBell] = useState('icon-mod');
    const { id, job_title, company_name, app_stage, key_date, archived, completed, deleted, last_updated, notes, set_reminder } = jobInfo;

    const expandJobDetails = (id) => {
        setHideJobDetails(hideJobDetails ? false : true);
    };

    const updateBell = () => {
        setEmptyBell(emptyBell === 'icon-mod' ? 'icon-mod hidden' : 'icon-mod');
        setBell(bell === 'icon-mod hidden' ? 'icon-mod' : 'icon-mod hidden');
    };

    const lastUpdatedDateTime = timestampCleanup(last_updated);

    return (
        <div className='job-row'>
            <div className='core-job-details'>
                <div>{company_name}</div>
                <div>{job_title}</div>
                <div>{key_date.split('T')[0]}</div>
                <div>{lastUpdatedDateTime}</div>
                <div>
                    {
                        set_reminder ? (<div onClick={updateBell}><NotificationsActiveIcon className={bell} /><NotificationsNoneIcon className={emptyBell} /></div>) : (<div onClick={updateBell}><NotificationsNoneIcon className={emptyBell} /><NotificationsActiveIcon className={bell} /></div>)
                    }
                </div>
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
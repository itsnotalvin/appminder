import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useState } from 'react';
import { timestampCleanup } from './TimestampCleanup';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export const ApplicationRow = ({ jobInfo, changeReminderStatus, changeArchiveStatus, updateAppModal }) => {
    const [hideJobDetails, setHideJobDetails] = useState(false);
    const { id, job_title, company_name, app_stage, key_date, archived, completed, deleted, last_updated, notes, set_reminder } = jobInfo;

    const expandJobDetails = (id) => {
        setHideJobDetails(hideJobDetails ? false : true);
    };

    const lastUpdatedDateTime = timestampCleanup(last_updated);


    return (
        <div className='job-row'>
            <div className='core-job-details'>
                <div>{company_name}</div>
                <div>{job_title}</div>
                <div>{key_date.split('T')[0]}</div>
                <div>{lastUpdatedDateTime}</div>
                {
                    !archived && <div>
                        {
                            set_reminder ? <NotificationsActiveIcon className='icon-mod' onClick={() => changeReminderStatus(id, false)} /> : <NotificationsNoneIcon className='icon-mod' onClick={() => changeReminderStatus(id, true)} />
                        }
                    </div>
                }
                <div>
                    {
                        !hideJobDetails ? <ArrowDropDownIcon className='icon-mod' onClick={() => expandJobDetails(id)} /> : <ArrowDropUpIcon className='icon-mod' onClick={() => expandJobDetails(id)} />
                    }
                </div>
                <div>
                    {
                        !archived ? <ArchiveIcon className='icon-mod' onClick={() => changeArchiveStatus(id, true)} /> : <UnarchiveIcon className='icon-mod' onClick={() => changeArchiveStatus(id, false)} />
                    }
                </div>
            </div>
            <div style={{ display: !hideJobDetails ? 'none' : 'flex' }} className='expanded-job-content' id={id}>
                <div>
                    <strong style={{ margin: 0, padding: 0 }}>Notes</strong>
                </div>
                <div className='notes-and-appUpdateBtn'>
                    <span>{notes}</span>
                    {
                        !archived && <span className='application-btn' onClick={() => updateAppModal(true)}>Update Application</span>
                    }
                </div>
            </div>
        </div>
    )
};
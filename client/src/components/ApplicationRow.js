import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useEffect, useState } from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDrag } from 'react-dnd';
import dateFormat, { masks } from 'dateformat';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export const ApplicationRow = ({ jobInfo, changeReminderStatus, changeArchiveStatus, updateAppModal, changeDeleteStatus }) => {
    const [hideJobDetails, setHideJobDetails] = useState(false);
    const { id, job_title, company_name, app_stage, key_date, archived, completed, deleted, last_updated, notes, set_reminder } = jobInfo;
    const [vibrateId, setVibrateId] = useState(0);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'application',
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const expandJobDetails = (id) => {
        setHideJobDetails(hideJobDetails ? false : true);
    };

    const vibrateApplicationRow = (id) => {
        setVibrateId(id);
        setTimeout(() => {
            setVibrateId(0);
        }, 1000);
    };


    const lastUpdatedDateTime = dateFormat(last_updated, 'dd/mm/yy h:MM TT');
    const formattedKeyDate = dateFormat(key_date, 'dd/mm/yy');


    return (
        <>
            <TableRow className={vibrateId === id ? 'job-row shake' : 'job-row'} style={{ opacity: isDragging ? '0.5' : '1' }} ref={drag}>
                {/* <div className='core-job-details'> */}
                <TableCell className='app-name'>{company_name}</TableCell>
                <TableCell className='app-title'>{job_title}</TableCell>
                <TableCell className='app-keydate'>{formattedKeyDate}</TableCell>
                <TableCell align='right' className='app-lastupdated'>{lastUpdatedDateTime}</TableCell>
                {
                    !archived && <TableCell align='right' className='app-notification'>
                        {
                            set_reminder ? <NotificationsActiveIcon className='icon-mod' onClick={() => {
                                vibrateApplicationRow(id)
                                changeReminderStatus(id, false)
                            }
                            } /> : <NotificationsNoneIcon className='icon-mod' onClick={() => {
                                vibrateApplicationRow(id)
                                changeReminderStatus(id, true)
                            }
                            } />
                        }
                    </TableCell>
                }
                <TableCell align='right' className='app-expand'>
                    {
                        !hideJobDetails ? <ArrowDropDownIcon className='icon-mod' onClick={() => expandJobDetails(id)} /> : <ArrowDropUpIcon className='icon-mod' onClick={() => expandJobDetails(id)} />
                    }
                </TableCell>
                <TableCell align='right' className='app-archive'>
                    {
                        !archived ? <ArchiveIcon className='icon-mod' onClick={() => changeArchiveStatus(id, true)} /> : <UnarchiveIcon className='icon-mod' onClick={() => changeArchiveStatus(id, false)} />
                    }
                </TableCell>
                {
                    archived && <TableCell align='right' className='app-archive'> <DeleteForeverIcon className='icon-mod' onClick={() => changeDeleteStatus(id, true)} />
                    </TableCell>
                }
                {/* </div> */}
            </TableRow>
            <TableCell colSpan={7} style={{ display: !hideJobDetails && 'none' }} id={id}>
                <div className='notes-and-appUpdateBtn'>
                    <div className='notes-content'>{notes}</div>
                    <div className='notes-content'>
                        {
                            !archived && <span className='application-btn' onClick={() => updateAppModal(true)}>Update Application</span>
                        }
                    </div>
                </div>
            </TableCell>
        </>
    )
};


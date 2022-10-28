import { JobDetails } from "./JobDetails";
import { useState, useEffect } from "react";
import '../Dashboard.css';
import '../ApplicationModals.css';
import '../Modals.css';
import axios from 'axios';
import { useDrop } from 'react-dnd';
import dateFormat from 'dateformat';
import AddAppModal from './AddAppModal.js';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const ApplicationsView = ({ updateAppBreakdown }) => {
    const [jobInfo, setJobInfo] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Draft');
    const [infoChange, setInfoChange] = useState(0);
    const [droppedIntoStage, setDroppedIntoStage] = useState('');
    const [modalClass, setModalClass] = useState('modal');
    const [appToUpdateId, setAppToUpdateId] = useState(0);
    const [appToUpdateStage, setAppToUpdateStage] = useState('');
    const [appToUpdateNotes, setAppToUpdateNotes] = useState('');
    const [appToUpdateKeyDate, setAppToUpdateKeyDate] = useState('1900-01-01');
    const [draftCount, setDraftCount] = useState(0);
    const [appliedCount, setAppliedCount] = useState(0);
    const [interviewingCount, setInterviewingCount] = useState(0);
    const [awaitingCount, setAwaitingCount] = useState(0);

    const [isOpen, setIsOpen] = useState(false);

    const [appToUpdateOtherInfo, setAppToUpdateOtherInfo] = useState({
        job: '',
        company: ''
    });

    useEffect(() => {
        axios.get('/jobs/allUserJobs')
            .then(res => {
                setJobInfo(res.data)
            })
    }, [selectedTab, infoChange, droppedIntoStage, isOpen]);

    useEffect(() => {
        axios.get('/jobs/categoryCount')
            .then(res => {
                const draftCategory = res.data.filter(category => category.app_stage === 'Draft');
                draftCategory.length ? setDraftCount(draftCategory[0].count) : setDraftCount(0);
                const appliedCategory = res.data.filter(category => category.app_stage === 'Applied');
                appliedCategory.length ? setAppliedCount(appliedCategory[0].count) : setAppliedCount(0);
                const interviewingCategory = res.data.filter(category => category.app_stage === 'Interviewing');
                interviewingCategory.length ? setInterviewingCount(interviewingCategory[0].count) : setInterviewingCount(0);
                const awaitingCategory = res.data.filter(category => category.app_stage === 'Awaiting');
                awaitingCategory.length ? setAwaitingCount(awaitingCategory[0].count) : setAwaitingCount(0);
            })
    }, [infoChange, droppedIntoStage]);

    useEffect(() => {
        updateAppBreakdown({
            draftCount: draftCount,
            appliedCount: appliedCount,
            interviewingCount: interviewingCount,
            awaitingCount: awaitingCount
        });
    }, [draftCount, appliedCount, interviewingCount, awaitingCount]);

    const changedJobInfo = () => {
        setInfoChange(infoChange === 0 ? 1 : 0);
    };

    const updateAppModal = ({ id, key_date, notes, app_stage, job_title, company_name }) => {
        setAppToUpdateStage(app_stage);
        setAppToUpdateNotes(notes);
        setAppToUpdateId(id);
        setAppToUpdateOtherInfo({
            job: job_title,
            company: company_name
        });
        setAppToUpdateKeyDate(dateFormat(key_date, 'yyyy-mm-dd'));
        setModalClass('modal view-modal');
    };
    const updateAppAction = () => {
        setModalClass('modal');
        axios.patch('/jobs/updateJobInfo', {
            job_id: appToUpdateId,
            app_stage: appToUpdateStage,
            key_date: appToUpdateKeyDate,
            notes: appToUpdateNotes
        })
            .then(res => {
                changedJobInfo();
            })
    };

    const updateNotes = (e) => {
        setAppToUpdateNotes(e.target.value);
    };

    const updateKeyDate = (e) => {
        setAppToUpdateKeyDate(e.target.value);
    };

    const updateAppStage = (e) => {
        setAppToUpdateStage(e.target.value);
    };

    const dropIntoDraft = (id) => {
        axios.patch(`/jobs/updateJobStage/Draft/${id}`)
            .then(res => {
                setDroppedIntoStage(`Drafted ${id}`);
            })
    };

    const [{ isInDraft }, dropIntoDraftHook] = useDrop(() => ({
        accept: 'application',
        drop: (item, monitor) => dropIntoDraft(item.id),
        collect: monitor => ({
            isInDraft: !!monitor.isOver()
        })
    }));

    const dropIntoApplied = (id) => {
        axios.patch(`/jobs/updateJobStage/Applied/${id}`)
            .then(res => {
                setDroppedIntoStage(`Applied ${id}`);
            })
    };

    const [{ isInApplied }, dropIntoAppliedHook] = useDrop(() => ({
        accept: 'application',
        drop: (item, monitor) => dropIntoApplied(item.id),
        collect: monitor => ({
            isInApplied: !!monitor.isOver()
        })
    }));

    const dropIntoInterviewing = (id) => {
        axios.patch(`/jobs/updateJobStage/Interviewing/${id}`)
            .then(res => {
                setDroppedIntoStage(`Interviewing ${id}`);
            })
    };

    const [{ isInInterviewing }, dropIntoInterviewingHook] = useDrop(() => ({
        accept: 'application',
        drop: (item, monitor) => dropIntoInterviewing(item.id),
        collect: monitor => ({
            isInInterviewing: !!monitor.isOver()
        })
    }));

    const dropIntoAwaiting = (id) => {
        axios.patch(`/jobs/updateJobStage/Awaiting/${id}`)
            .then(res => {
                setDroppedIntoStage(`Awaiting ${id}`);
            })
    };

    const [{ isInAwaiting }, dropIntoAwaitingHook] = useDrop(() => ({
        accept: 'application',
        drop: (item, monitor) => dropIntoAwaiting(item.id),
        collect: monitor => ({
            isInAwaiting: !!monitor.isOver()
        })
    }));

    const closeModal = (bool) => {
        setIsOpen(bool);
    }

    const selectedTabColor = {
        'Draft': '#6bc1ff',
        'Applied': '#a9ffcb',
        'Interviewing': '#fff5bf',
        'Awaiting': '#ff9cc0',
    }

    return (
        <>
            <header id='application-bar'>
                <h2>Applications</h2>
                <button className='add-application-btn' onClick={() => setIsOpen(true)}>Add Application</button>
                <AddAppModal open={isOpen} closeModal={closeModal} onClose={() => setIsOpen(false)} changedJobInfo={changedJobInfo} />
            </header>

            <div id='applications-display'>
                <div id='application-stage-selection'>
                    <div className='app-stage-tab draft-stage-tab' style={{ backgroundColor: isInDraft && 'purple' }} ref={dropIntoDraftHook} onClick={() => setSelectedTab('Draft')}>Draft <br />({draftCount})</div>
                    <div className='app-stage-tab applied-stage-tab' style={{ backgroundColor: isInApplied && 'purple' }} ref={dropIntoAppliedHook} onClick={() => setSelectedTab('Applied')}>Applied <br />({appliedCount})</div>
                    <div className='app-stage-tab interview-stage-tab' style={{ backgroundColor: isInInterviewing && 'purple' }} ref={dropIntoInterviewingHook} onClick={() => setSelectedTab('Interviewing')}>Interviewing <br />({interviewingCount})</div>
                    <div className='app-stage-tab awaiting-stage-tab' style={{ backgroundColor: isInAwaiting && 'purple' }} ref={dropIntoAwaitingHook} onClick={() => setSelectedTab('Awaiting')}>Awaiting <br />({awaitingCount})</div>
                </div>
                <TableContainer component={Paper}>
                    <Table size="medium" sx={{ minWidth: 650 }} aria-label="application-table">
                        <TableHead style={{
                            backgroundColor: selectedTabColor[selectedTab]
                        }}>
                            <TableRow>
                                <TableCell>Company</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Key Date</TableCell>
                                <TableCell align="right">Last Updated</TableCell>
                                <TableCell align="right">Set Reminder</TableCell>
                                <TableCell align="right">Details</TableCell>
                                <TableCell align="right">Archive</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <JobDetails jobs={jobInfo} selected={selectedTab} changedJobInfo={changedJobInfo} updateAppModal={updateAppModal} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/* MODAL */}
            <div className={modalClass}>
                <div className='modal-box'>
                    <div className='modal-content'>
                        <h3>Update Application</h3>
                        <div className='update-app-field'>
                            <label htmlFor="job_title">Job Title</label>
                            <input value={appToUpdateOtherInfo.job} id='job_title' className='disabled-inp login-inp add-inp' onChange={(e) => e.preventDefault()} />
                        </div>
                        <div className='update-app-field'>
                            <label htmlFor="company_name">Company Name</label>
                            <input value={appToUpdateOtherInfo.company} id='company_name' className='disabled-inp login-inp add-inp' onChange={(e) => e.preventDefault()} />
                        </div>
                        <div className='update-app-field'>
                            <label htmlFor="app_stage_dropdown">Application Stage</label>
                            <select name="app-stage" id="app_stage_dropdown" className='login-inp add-inp' value={appToUpdateStage} onChange={updateAppStage}>
                                <option value='Draft'>Draft</option>
                                <option value='Applied'>Applied</option>
                                <option value='Interviewing'>Interviewing</option>
                                <option value='Awaiting'>Awaiting</option>
                            </select>
                        </div>
                        <div className='update-app-field'>
                            <label htmlFor="key_date">Key Date</label>
                            <input value={appToUpdateKeyDate} id='key_date' className='login-inp add-inp' type='date' onChange={updateKeyDate} />
                        </div>
                        <div className='update-app-field'>
                            <label htmlFor="notes">Notes</label>
                            <textarea value={appToUpdateNotes} placeholder='Edit Notes' id='notes' onChange={updateNotes} />
                        </div>
                        <div className='submit-btns modal-form-row'>
                            <button className='add-app-btn yes-button'
                                onClick={updateAppAction}>Update Application
                            </button>
                            <button
                                className='add-app-btn no-button'
                                onClick={() => setModalClass('modal')}>Discard Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
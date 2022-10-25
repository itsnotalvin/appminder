import { JobDetails } from "./JobDetails";
import { useState, useEffect } from "react";
import '../Dashboard.css';
import '../ApplicationModals.css';
import axios from 'axios';
import { timestampCleanup } from "./TimestampCleanup";
import Modal from './AddAppModal.js';

export const ApplicationsView = () => {
    const [jobInfo, setJobInfo] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Draft');
    const [infoChange, setInfoChange] = useState(0);
    const [modalClass, setModalClass] = useState('modal');
    const [appToUpdateId, setAppToUpdateId] = useState(0);
    const [appToUpdateStage, setAppToUpdateStage] = useState();
    const [appToUpdateNotes, setAppToUpdateNotes] = useState();
    const [appToUpdateKeyDate, setAppToUpdateKeyDate] = useState();
    const [appToUpdateOtherInfo, setAppToUpdateOtherInfo] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        axios.get('/jobs/allUserJobs')
            .then(res => {
                console.log('calling api to get users jobs');
                setJobInfo(res.data)
            })
    }, [selectedTab, infoChange]);
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
        setAppToUpdateKeyDate(timestampCleanup(key_date, 'update'));
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
                console.log('calling api to update job info');
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
    return (
        <>
            
            {/* working hereworking hereworking hereworking here */}
            
            <header id='application-bar'>
                <h2>Applications</h2>

                
                <button className='application-btn' onClick={() => setIsOpen(true)}>Add Application</button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
            </header>

            {/* working hereworking hereworking hereworking here */}

            <div id='applications-display'>
                <div id='application-stage-selection'>
                    <div className='application-stage-btn' onClick={() => setSelectedTab('Draft')}>Draft</div>
                    <div className='application-stage-btn' onClick={() => setSelectedTab('Applied')}>Applied</div>
                    <div className='application-stage-btn' onClick={() => setSelectedTab('Interviewing')}>Interviewing</div>
                    <div className='application-stage-btn' onClick={() => setSelectedTab('Awaiting')}>Awaiting</div>
                </div>
                <div id='application-content'>
                    <div id='application-detail-header'>
                        <span>Company</span>
                        <span>Position</span>
                        <span>Key Date</span>
                        <span>Last Updated</span>
                        <span>Set Reminder</span>
                        <span>Details</span>
                        <span>Archive</span>
                    </div>
                    <JobDetails jobs={jobInfo} selected={selectedTab} changedJobInfo={changedJobInfo} updateAppModal={updateAppModal} />
                </div>
            </div>
            <div className={modalClass}>
                <div className='modal-box'>
                    <div className='modal-content'>
                        <h3>Update Application</h3>
                        <div className='update-app-field'>
                            <label htmlFor="job_title">Job Title</label>
                            <input value={appToUpdateOtherInfo.job} id='job_title' className='disabled-inp' onClick={(e) => e.preventDefault()} />
                        </div>
                        <div className='update-app-field'>
                            <label htmlFor="company_name">Company Name</label>
                            <input value={appToUpdateOtherInfo.company} id='company_name' className='disabled-inp' onClick={(e) => e.preventDefault()} />
                        </div>
                        <div className='update-app-field'>
                            <label htmlFor="app_stage_dropdown">Application Stage</label>
                            <select name="app-stage" id="app_stage_dropdown" value={appToUpdateStage} onChange={updateAppStage}>
                                <option value='Draft'>Draft</option>
                                <option value='Applied'>Applied</option>
                                <option value='Interviewing'>Interviewing</option>
                                <option value='Awaiting'>Awaiting</option>
                            </select>
                        </div>
                        <div className='update-app-field'>
                            <label htmlFor="key_date">Key Date</label>
                            <input value={appToUpdateKeyDate} placeholder='Key Date' id='key_date' type='date' onChange={updateKeyDate} />
                        </div>
                        <div className='update-app-field'>
                            <label htmlFor="notes">Notes</label>
                            <textarea value={appToUpdateNotes} placeholder='Edit Notes' id='notes' onChange={updateNotes} />
                        </div>
                        <div className='update-app-btn-group'>
                            <span onClick={updateAppAction}>Update Application</span>
                            <span onClick={() => setModalClass('modal')}>Discard Update</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
};
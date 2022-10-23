import { JobDetails } from "./JobDetails";
import { useState, useEffect } from "react";
import '../Dashboard.css';
import '../ApplicationModals.css';
import axios from 'axios';
import { timestampCleanup } from "./TimestampCleanup";

export const ApplicationsView = () => {
    const [jobInfo, setJobInfo] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Draft');
    const [infoChange, setInfoChange] = useState(0);
    const [modalClass, setModalClass] = useState('modal');
    const [appToUpdateInfo, setAppToUpdateInfo] = useState({});
    useEffect(() => {
        axios.get('/jobs/allUserJobs')
            .then(res => {
                setJobInfo(res.data)
            })
    }, [selectedTab, infoChange]);
    const changedJobInfo = () => {
        setInfoChange(infoChange === 0 ? 1 : 0);
    };
    const updateAppModal = ({ key_date, notes, app_stage }) => {
        setAppToUpdateInfo({
            key_date: timestampCleanup(key_date, 'update'),
            notes: notes,
            app_stage: app_stage
        })
        setModalClass('modal view-modal');
    };
    const updateAppAction = () => {
        setModalClass('modal');
    };
    return (
        <>
            <header id='application-bar'>
                <h2>Applications</h2>
                <div className='application-btn'>Add Application</div>
            </header>
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
                    {
                        console.log(jobInfo)
                    }
                    <JobDetails jobs={jobInfo} selected={selectedTab} changedJobInfo={changedJobInfo} updateAppModal={updateAppModal} />
                </div>
            </div>
            <div className={modalClass}>
                <div className='modal-box'>
                    <div className='modal-content'>
                        <h3>Update Application</h3>
                        <div className='update-app-field'>
                            <label htmlFor="app_stage_dropdown">Application Stage</label>
                            <select name="app-stage" id="app_stage_dropdown" value={appToUpdateInfo.app_stage}>
                                <option value='Draft'>Draft</option>
                                <option value='Applied'>Applied</option>
                                <option value='Interviewing'>Interviewing</option>
                                <option value='Awaiting'>Awaiting</option>
                            </select>
                        </div>
                        <div className='update-app-field'>
                            <label htmlFor="key_date">Key Date</label>
                            <input value={appToUpdateInfo.key_date} placeholder='Key Date' id='key_date' type='date' />
                        </div>
                        <div className='update-app-field'>
                            <label htmlFor="notes">Notes</label>
                            <textarea value={appToUpdateInfo.notes} placeholder='Edit Notes' id='notes' />
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
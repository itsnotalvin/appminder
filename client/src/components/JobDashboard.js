import '../Dashboard.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { JobDetails } from './JobDetails.js'

export const JobDashboard = ({ id }) => {
    const [jobInfo, setJobInfo] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Draft');

    useEffect(() => {
        axios.get('/jobs/allUserJobs')
            .then(res => {
                setJobInfo(res.data)
            })
    }, []);

    return (
        jobInfo.length ? <div id='dashboard'>
            <div id='side-panel'>
                <div id='side-panel-content'>
                    <h3>App Minder</h3>
                    <h3>Hello, first name</h3>
                    <div>
                        <div className='nav-btn'>Applications</div>
                        <div className='nav-btn'>Profile</div>
                        <div className='nav-btn'>Settings</div>
                    </div>
                </div>
            </div>
            <div id='main-screen'>
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
                            <span>Details</span>
                            <span>Archive</span>
                        </div>
                        {
                            console.log(jobInfo)
                        }
                        <JobDetails jobs={jobInfo} selected={selectedTab} />
                    </div>
                </div>
            </div>
        </div> : <></>

    )
};
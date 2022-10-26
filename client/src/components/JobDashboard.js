import '../Dashboard.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { JobDetails } from './JobDetails.js'
import { ApplicationsView } from './ApplicationsView';
import { ArchiveView } from './ArchiveView';
import { Profile } from './Profile.js';
import { Settings } from './Settings.js';

export const JobDashboard = ({ id }) => {
    const [jobInfo, setJobInfo] = useState([]);
    const [viewPage, setViewPage] = useState('Applications');
    const [componentToView, setComponentToView] = useState(<ApplicationsView />);
    useEffect(() => {
        axios.get('/jobs/allUserJobs')
            .then(res => {
                setJobInfo(res.data)
            })
        if (viewPage === 'Applications') {
            setComponentToView(<ApplicationsView />)
        }
        else if (viewPage === 'Profile') {
            setComponentToView(<Profile />);
        }
        else if (viewPage === 'Settings') {
            setComponentToView(<Settings />);
        }
        else {
            setComponentToView(<ArchiveView />)
        }
    }, [viewPage]);

    return (
        jobInfo.length ? <div id='dashboard'>
            <div id='side-panel'>
                <div id='side-panel-content'>
                    <h3>App Minder</h3>
                    <h3>Hello, first name</h3>
                    <div>
                        <div className='nav-btn' onClick={() => setViewPage('Applications')} >Applications</div>
                        <div className='nav-btn' onClick={() => setViewPage('Profile')} >Profile</div>
                        <div className='nav-btn' onClick={() => setViewPage('Settings')} >Settings</div>
                        <div className='nav-btn' onClick={() => setViewPage('Archive')}>Archive</div>
                    </div>
                </div>
            </div>
            <div id='main-screen'>
                {
                    componentToView
                }
            </div>
        </div> : <></>

    )
};
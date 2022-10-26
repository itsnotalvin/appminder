import '../Dashboard.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { JobDetails } from './JobDetails.js'
import { ApplicationsView } from './ApplicationsView';
import { ArchiveView } from './ArchiveView';
import { Profile } from './Profile.js';
import { Logout } from './Logout.js';

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
        else if (viewPage === 'Logout') {
            setComponentToView(<Logout />);
        }
        else {
            setComponentToView(<ArchiveView />)
        }
    }, [viewPage]);

    return (
        jobInfo.length ? <div id='dashboard'>
            <div id='side-panel'>
                <div id='side-panel-content'>
                    <div>
                        <h3 onClick={() => setViewPage('Applications')}>App Minder</h3>
                    </div>
                    <div>
                        <h3>Hello, first name</h3>
                    </div>
                    
                    <div>
                        <div className='nav-btn' onClick={() => setViewPage('Applications')} >Applications</div>
                        <div className='nav-btn' onClick={() => setViewPage('Profile')} >Profile</div>
                        <div className='nav-btn' onClick={() => setViewPage('Archive')}>Archive</div>
                        <div className='nav-btn' onClick={() => setViewPage('Logout')} >Sign Out</div>
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
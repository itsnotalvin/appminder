import '../Dashboard.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ApplicationsView } from './ApplicationsView';
import { ArchiveView } from './ArchiveView';
import { LogoutModal } from './LogoutModal.js'
import appminder_logo from '../images/appminder_logo.png'
import { Navigate } from 'react-router-dom'
import { LoadingScreen } from './LoadingScreen';

export const JobDashboard = () => {
    const [jobInfo, setJobInfo] = useState([]);
    const [viewPage, setViewPage] = useState('Applications');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [componentToView, setComponentToView] = useState
        (<ApplicationsView />);
    const [username, setUsername] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    useEffect(() => {
        axios.get('/users/session')
            .then(res => {
                if (res.status !== 401) {
                    setIsAuthenticated(true);
                    setIsLoading(false);
                }
                else {
                    setIsAuthenticated(false);
                }
            })
            .catch(err => setIsAuthenticated(false))
    }, []);

    useEffect(() => {
        axios.get('/jobs/allUserJobs')
            .then(res => {
                setJobInfo(res.data)
            })
            .catch(err => { })
        if (viewPage === 'Applications') {
            setComponentToView(<ApplicationsView />)
        }
        else {
            setComponentToView(<ArchiveView />)
        }
    }, [viewPage]);

    useEffect(() => {
        if (jobInfo.length) {
            setUsername(jobInfo[0].first_name)
        }

    }, [jobInfo])

    const closeModal = (bool) => {
        setIsOpen(bool);
    };

    return (
        isAuthenticated ? (isLoading ? <LoadingScreen /> : <div id='dashboard'>
            <div id='side-panel'>
                <div id='side-panel-content'>
                    <div className='home-logo'>
                        <div onClick={() => setViewPage('Applications')}>
                            <img src={appminder_logo} id='appminderlogo' />

                        </div>
                    </div>
                    <div>
                        <h3 className='welcome'>Hello, {username}</h3>
                    </div>

                    <div className='nav-btn-container'>
                        <div className='nav-btn' onClick={() => setViewPage('Applications')} >Applications</div>

                        <div className='nav-btn' onClick={() => setViewPage('Archive')}>Archive</div>

                        <div className='nav-btn' onClick={() => setIsOpen(true)} >Sign Out</div>
                        {isOpen && <LogoutModal className='modal' open={isOpen} closeModal={closeModal} onClose={() => setIsOpen(false)}></LogoutModal>}
                    </div>
                </div>
            </div>
            <div id='main-screen'>
                {
                    componentToView
                }
            </div>
        </div>) : <Navigate to='/login' />
    )
};
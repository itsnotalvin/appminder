import { JobDetails } from "./JobDetails";
import { useState, useEffect } from "react";
import axios from 'axios';

export const ApplicationsView = () => {
    const [jobInfo, setJobInfo] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Draft');
    const [infoChange, setInfoChange] = useState(0);
    useEffect(() => {
        axios.get('/jobs/allUserJobs')
            .then(res => {
                setJobInfo(res.data)
            })
    }, [selectedTab, infoChange]);
    const changedJobInfo = () => {
        setInfoChange(infoChange === 0 ? 1 : 0);
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
                    <JobDetails jobs={jobInfo} selected={selectedTab} changedJobInfo={changedJobInfo} />
                </div>
            </div>
        </>
    )
};
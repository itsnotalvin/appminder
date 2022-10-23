import { useState, useEffect } from "react";
import axios from 'axios';
import { JobDetails } from "./JobDetails";


export const ArchiveView = () => {
    const [jobInfo, setJobInfo] = useState([]);
    const [infoChange, setInfoChange] = useState(0);
    useEffect(() => {
        axios.get('/jobs/allUserJobs')
            .then(res => {
                setJobInfo(res.data)
            })
    }, [infoChange]);
    const changedJobInfo = () => {
        setInfoChange(infoChange === 0 ? 1 : 0);
    };
    return (
        <>
            <header id='application-bar'>
                <h2>Archived Applications</h2>
            </header>
            <div id='applications-display'>
                <div id='application-content'>
                    <div id='application-detail-header'>
                        <span>Company</span>
                        <span>Position</span>
                        <span>Key Date</span>
                        <span>Last Updated</span>
                        <span>Set Reminder</span>
                        <span>Details</span>
                        <span>Unarchive</span>
                    </div>
                    <JobDetails jobs={jobInfo} selected={'Archive'} changedJobInfo={changedJobInfo} />
                </div>
            </div>
        </>
    )
};
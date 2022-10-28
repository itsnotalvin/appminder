import axios from 'axios'
import { useState, useEffect } from 'react'



export const Profile = () => {
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
                <h2>Profile</h2>
                <p>
                FEATURES:
                    show:
                        name
                        email
                        hashed ******
                            after you type your password
                            security question
                                answer
                            change password
                            


                    reminder days

                    STATS:
                    count* total applications
                    pie chart nivo

                    SETTINGS:
                    dankmode/lightmode

                    dashbored route
                </p>
            </header>
            <div id='applications-display'>
                <div id='application-content'>
                    {/* <div id='application-detail-header'>
                        <span>Company</span>
                        <span>Position</span>
                        <span>Key Date</span>
                        <span>Last Updated</span>
                        <span>Set Reminder</span>
                        <span>Details</span>
                        <span>Unarchive</span>
                    </div>
                    <JobDetails jobs={jobInfo} selected={'Archive'} changedJobInfo={changedJobInfo} /> */}
                </div>
            </div>
        </>
    )
};
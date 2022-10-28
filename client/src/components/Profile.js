import axios from 'axios'
import { useState, useEffect } from 'react'



export const Profile = () => {
    const [userDetails, setUserDetails] = useState([]);
    const { id, first_name, last_name, email, sec_qns, sec_ans } = userDetails;
    
    useEffect(() => {
        console.log('calling use effect')
        axios.get('/users/getUsersDetails')        
            .then(res => {
                console.log(`trying to get user details from API`)
                setUserDetails(res.data)
                console.log(res.data)
                
            } )
    }, []);
    
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
                    <div id='profile-name'>
                        <div>
                            <h2>First Name</h2>
                        </div>
                        <div>
                            <h2>Last Name</h2>
                        </div>
                    </div>
                    <div>Details:
                        <ul>
                            <li>{userDetails[0].first_name}</li>
                            <li>{userDetails[0].last_name}</li>
                            <li>{userDetails[0].email}</li>
                            <li>{userDetails[0].hashed_pw}</li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                    
                    <div id='profile-email'>
                        Email
                    </div>
                    <div id='profile-password'>
                        Password ******
                    </div>
                    <div id='profile-reminder'>
                        <label htmlFor='reminder'>Reminder days:</label>
                        <input
                        type='number' 
                        min='1'
                        max='31'
                        />
                    </div>
                    <button>Change Password</button>
                </div>
            </div>
        </>
    )
};

import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

const LOGOUT_URL = '/sessions'


export const LogoutModal = () => {
    const logout = (e) => {
        e.preventDefault();
        console.log('you are trying to log out')

        axios.delete('/users/session')
        
        // try {
        //     const response = await axios.delete(LOGOUT_URL);
        // } catch (err) {
        //     setErrMsg('Unable to log out')
        // }
    }
    return (
        <div>
            sample modal to log out
            <br />
            {/* modal header */}
            <div>
            <h3>are you sure you want to logout?</h3>
            </div>
            {/* modal body */}
            <div>

            <div>
                
                <button onClick={logout}>Yes</button>
                
                <button>No</button>
            </div>
            </div>
            
            {/* modal footer */}

        </div>
    )
}
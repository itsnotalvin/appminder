import { useState } from 'react';
import axios from 'axios'
import { redirect } from 'react-router-dom'

const LOGOUT_URL = '/sessions'


export const LogoutModal = () => {

    const [errMsg, setErrMsg] = useState('')
    const [loggedout, setLoggedout] = useState(false)


    const logout = (e) => {
        e.preventDefault();
        console.log('you are trying to log out')

        // axios.delete('/users/session')

        try {
            console.log('you have logged out')
            axios.delete('/users/session')
                .then(res => {
                    redirect('/')
                })
        } catch (err) {
            setErrMsg('Unable to log out')
        }
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
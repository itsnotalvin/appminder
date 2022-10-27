import { useState } from 'react';
import axios from 'axios'
import { Navigate, redirect, useNavigate } from 'react-router-dom'

const LOGOUT_URL = '/sessions'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 3,
    padding: '100px',
    backgroundColor: 'red'

}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    opacity: '70%',
    zIndex: 2
}

export const LogoutModal = ( { closeModal }) => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('')
    const [loggedout, setLoggedout] = useState(false)
    
    
    const navigateHome = () => {
        navigate('/login');
        axios.delete('/users/session');
    }    

    // const logout = (e) => {
    //     e.preventDefault();
    //     console.log('you are trying to log out')
    //     // axios.delete('/users/session')

    //     try {
    //         console.log('you have logged out')
    //         // axios.delete('/users/session')
    //         // redirect('/')
    //         axios.delete('/users/session');

    //         redirect('/')
                    
                
    //     } catch (err) {
    //         setErrMsg('Unable to log out')
    //     }
    // }
    

    return (
        <div style={OVERLAY_STYLES} onClick={() => closeModal(false)} >
            {/* // modal box */}
            <div style={MODAL_STYLES}>          
            <br />
                {/* modal header */}
                <div>
                    <h3>Are you sure you want to logout?</h3>
                </div>
                {/* modal body */}
                <div>

                    <div>
                        <button className='yesButton'onClick={navigateHome}>Yes</button>
                    
                        <button className='noButton' onClick={() => closeModal(false)}>No</button>
                    </div>
                </div>

            {/* modal footer */}
                
            </div>
            
        </div>
        
        
    )
}
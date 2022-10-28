import { useState } from 'react';
import axios from 'axios'
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import ReactDom from 'react-dom'
import '../Modals.css'

const LOGOUT_URL = '/sessions'

// const MODAL_STYLES = {
//     position: 'fixed',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 3,
//     padding: '100px',
//     backgroundColor: 'red'

// }

// const OVERLAY_STYLES = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#000000',
//     opacity: '90%',
//     zIndex: 2
// }

export const LogoutModal = ({ closeModal }) => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('')
    const [loggedout, setLoggedout] = useState(false)


    const navigateHome = () => {
        navigate('/login');
        axios.delete('/users/session');
    }

    return ReactDom.createPortal(
        <>
            <div className='modalPage' onClick={() => closeModal(false)} >
            </div>
            {/* // modal box */}
            <div className='modalContainer'>
                {/* modal header */}
                <div>
                    <h2>Are you sure you want to logout?</h2>
                </div>
                {/* modal body */}

                <div className='modal-form-row submit-btns'>
                    <button className='add-app-btn yes-logout' onClick={navigateHome}>Yes</button>

                    <button className='add-app-btn no-logout' onClick={() => closeModal(false)}>No</button>
                </div>

                {/* modal footer */}

            </div>


        </>
        ,
        document.getElementById('portal')


    )
}
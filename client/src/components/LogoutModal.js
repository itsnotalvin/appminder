import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ReactDom from 'react-dom'
import '../Modals.css'

export const LogoutModal = ({ closeModal }) => {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/login');
        axios.delete('/users/session');
    }

    return ReactDom.createPortal(
        <>
            <div className='modalPage' onClick={() => closeModal(false)} >
            </div>
            <div className='modalContainer'>
                <div>
                    <h2>Are you sure you want to logout?</h2>
                </div>
                <div className='modal-form-row submit-btns'>
                    <button className='add-app-btn yes-logout' onClick={navigateHome}>Yes</button>

                    <button className='add-app-btn no-logout' onClick={() => closeModal(false)}>No</button>
                </div>
            </div>
        </>
        ,
        document.getElementById('portal')


    )
}
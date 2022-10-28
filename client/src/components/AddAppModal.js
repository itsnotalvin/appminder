import { useState, useEffect, useRef } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import '../Modals.css';
import '../App.css';
import Checkbox from '@mui/material/Checkbox';

const ADDAPP_URL = '/jobs'

export default function AddAppModal({ open, children, onClose, closeModal, changedJobInfo }) {
    const [appAddCompany, setAppAddCompany] = useState('');
    const [appAddRole, setAppAddRole] = useState('');
    const [appStage, setAppStage] = useState('Draft');
    const [appKeyDate, setAppKeyDate] = useState('');
    const [appNotes, setAppNotes] = useState('');
    const [appReminder, setAppReminder] = useState(false)

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('false')

    useEffect(() => {
        setErrMsg('');
    }, [appAddCompany])

    const handleAppSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(ADDAPP_URL,
                JSON.stringify({
                    company_name: appAddCompany,
                    job_title: appAddRole,
                    app_stage: appStage,
                    key_date: appKeyDate,
                    notes: appNotes,
                    set_reminder: appReminder
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            changedJobInfo()
            closeModal(false)
            setAppReminder(false)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else {
                setErrMsg('Unable to add Job')
            }
        }
    }

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div
                className='modalPage'

                onClick={onClose}
            >
            </div>
            <div className='modalContainer'>
                <div className='ModalHeader'>
                    <h2>Add a new Job Application</h2>
                </div>
                <div className='ModalBody'>
                    <form onSubmit={handleAppSubmit}>
                        <div className='modal-form-row' >
                            <label htmlFor="appAddCompany">
                                Company Name:
                            </label>
                            <input
                                type="text"
                                autoComplete="off"
                                required
                                className='login-inp add-app'
                                onChange={(e) => setAppAddCompany(e.target.value)}
                            />
                        </div>
                        <div className='modal-form-row'>
                            <label htmlFor="appAddRole">
                                Role:
                            </label>
                            <input
                                type="text"
                                autoComplete="off"
                                required
                                className='login-inp add-app'
                                onChange={(e) => setAppAddRole(e.target.value)}
                            />
                        </div>
                        <div className='modal-form-row'>
                            <label htmlFor="appStage">
                                Stage:
                            </label>
                            <select className='login-inp add-app' value={appStage} onChange={(e) => setAppStage(e.target.value)}>
                                <option value='Draft'>Draft</option>
                                <option value='Applied'>Applied</option>
                                <option value='Interviewing'>Interviewing</option>
                                <option value='Awaiting'>Awaiting</option>
                            </select>
                        </div>
                        <div className='modal-form-row'>
                            <label htmlFor="appKeyDate">
                                Key Date:
                            </label>
                            <input
                                type="date"
                                required
                                className='login-inp add-app'
                                onChange={(e) => setAppKeyDate(e.target.value)}
                            />
                        </div>
                        <div className='modal-form-row'>
                            <label htmlFor="appKeyDate">
                                Notes:
                            </label>
                            <textarea
                                type="text"
                                className='login-inp add-app'
                                autoComplete="off"
                                onChange={(e) => setAppNotes(e.target.value)}
                            />
                        </div>
                        <div className='modal-form-row' >
                            <label htmlFor="appReminder">
                                Reminders?
                            </label>
                            <Checkbox style={{ backgroundColor: appReminder ? '#a89cfa' : '#6d55ff' }} sx={{
                                '&.Mui-checked': {
                                    color: '#ffffff',
                                },
                            }} onChange={(e) => {
                                setAppReminder(e.target.checked)
                            }
                            } />
                        </div>
                        <div className='modal-form-row submit-btns'>
                            <button className='add-app-btn yes-button' type='submit'>Add Application</button>
                            <button className='add-app-btn no-button' onClick={onClose}>Discard Application</button>
                        </div>
                    </form>
                </div>
                <div className='ModalFooter'>
                </div>
            </div>
            {children}
        </>
        ,
        document.getElementById('portal')
    )
}
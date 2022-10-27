import { useState, useEffect, useRef } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'

const ADDAPP_URL = '/jobs'

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


export default function Modal({ open, children, onClose, closeModal }) {
    const userRef = useRef();
    const errRef = useRef();
    
    const [appAddCompany, setAppAddCompany] = useState('');
    const [appAddRole, setAppAddRole] = useState('');
    const [appStage, setAppStage] = useState('');
    const [appKeyDate, setAppKeyDate] = useState('');
    const [appNotes, setAppNotes] = useState('');    

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('false')
    
    useEffect(() => {
        setErrMsg('');
    }, [appAddCompany])
    
    // const onSubmit = () => {
    //     setIsOpen={(false)}
    // }
    
    // const { job_title, company_name, app_stage, key_date, set_reminder, notes } = request.body;

    const handleAppSubmit = async (e) => {
        e.preventDefault();
        console.log("trying toi submit")

        try {
            const response = await axios.post(ADDAPP_URL,
                JSON.stringify({ 
                    company_name: appAddCompany,
                    job_title: appAddRole,
                    app_stage: appStage,
                    key_date: appKeyDate,
                    notes: appNotes
                  }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                });
                closeModal(false)
                // onSubmit={() => setIsOpen(false)};
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No server response');
            } else {
                setErrMsg('Unable to add Job')
            }
        }
    }

    if (!open) return null

    return (
        <>
            <div style={OVERLAY_STYLES} onClick={onClose}>
            </div>
            {/* add application modal */}
            <div className='addAppModal'style={MODAL_STYLES}>
                <div className='ModalHeader'>
                    This is modal header
                    <h3>Add a new Job Application</h3>

                </div>

                <div className='ModalBody'>
                    
                    <form onSubmit={handleAppSubmit}>
                        {/* add company */}
                        <label htmlFor="appAddCompany">
                            Company Name:
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            required
                            onChange={(e) => setAppAddCompany(e.target.value)}
                        />
                        < br/>
                    

                        {/* add position */}
                        <label htmlFor="appAddRole">
                            Role:
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            required
                            onChange={(e) => setAppAddRole(e.target.value)}
                        />
                        < br/>

                        {/* add stage */}
                        <label htmlFor="appStage">
                            Stage:
                        </label>
                        <select value={appStage} onChange={(e) => setAppStage(e.target.value)}> 
                            <option value='Draft'>Draft</option>
                            <option value='Applied'>Applied</option>
                            <option value='Interviewing'>Interviewing</option>
                            <option value='Awaiting'>Awaiting</option>
                        </select>
                        < br/>

                        {/* add keydate */}                    
                        <label htmlFor="appKeyDate">
                            Key Date:
                        </label>
                        <input
                            type="date"
                            required
                            onChange={(e) => setAppKeyDate(e.target.value)}
                        />
                        < br/>
                    
                        {/* add notes */}                    
                        <label htmlFor="appKeyDate">
                            Notes:
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            onChange={(e) => setAppNotes(e.target.value)}
                        />
                        < br/>
                        <br />
                        <button type='submit'>Add Application</button>
                        <br />
                    </form>
                    

                    This is modal body
                </div>

                <div className='ModalFooter'>
                    <br />
                    This is modal footer
                    <button onClick={onClose}>Close Modal</button>

                </div>                
                
                {children}
            </div>
        </>
        // ,
        // document.getElementById('portal')
    )
}
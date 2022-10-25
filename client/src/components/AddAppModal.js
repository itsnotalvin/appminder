import { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

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


export default function Modal({ open, children, onClose }) {
    const [appAddCompany, setAppAddCompany] = useState();
    const [appAddRole, setAppAddRole] = useState();
    const [appStage, setAppStage] = useState();
    const [appKeyDate, setAppKeyDate] = useState();    
    
    if (!open) return null

    return (
        <>
            <div style={OVERLAY_STYLES} onClick={onClose}>
            </div>
            
            <div className='addAppModal'style={MODAL_STYLES}>
                <div className='ModalHeader'>
                    This is modal header
                    <h3>Add a new Job Application</h3>

                </div>

                <div className='ModalBody'>

                    This is modal body
                </div>

                <div className='ModalFooter'>
                    This is modal footer

                </div>                
                <button onClick={onClose}>Close Modal</button>
                {children}
            </div>
        </>
        // ,
        // document.getElementById('portal')
    )
}
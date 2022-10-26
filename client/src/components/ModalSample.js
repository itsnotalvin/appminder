import React, { useState } from 'react'
import Modal from './AddAppModal.js';


export default function ModalSample() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div onClick={() => console.log('clicked')}>
                <button onClick={() => setIsOpen(true)}>Open Modal</button>

                <br />
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    Fancy Modal

                </Modal>
                < br/>
                <button>Close Button</button>
            </div>
        </>
    )
}
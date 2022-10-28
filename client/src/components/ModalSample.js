import React, { useState } from 'react'
import Modal from './AddAppModal.js';


export default function ModalSample() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div>
                <button onClick={() => setIsOpen(true)}>Open Modal</button>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    Fancy Modal

                </Modal>
                <button>Close Button</button>
            </div>
        </>
    )
}
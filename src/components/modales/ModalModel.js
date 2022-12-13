
import React from 'react'
import { Modal } from 'flowbite-react'
const ModalModel = ({isModalOpen, setIsModalOpen, children}) => {
    return ( 
        <Modal show={isModalOpen} onClose={()=>setIsModalOpen(false)}>
            {children}
        </Modal>
    );
}
 
export default ModalModel;
import { useAtom } from 'jotai';
import React from 'react';

import Modal from 'react-modal';





function GlobalModal({ atom, children }) {

    const [modalIsOpen, setIsOpen] = useAtom(atom);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {


    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}

            >
                {children}
            </Modal>
        </div>
    );
}



export default GlobalModal;
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { XIcon } from '@heroicons/react/solid'

import './modal.scss';

const Modal = props => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    return (
        <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
            {props.children}
        </div>
    );
}

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
}

export const ModalContent = props => {

    const contentRef = useRef(null);

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');
        if (props.onClose) props.onClose();
    }

    return (
        <div ref={contentRef} className="modal__content" style={{ position: 'relative' }}>
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <XIcon style={{ width: '30px', height: '30px', color: 'white', position: 'absolute', top: 0, right: 0  }}/>
            </div>
        </div>
    )
}

ModalContent.propTypes = {
    onClose: PropTypes.func
}

export default Modal;
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const RemoveModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose={props.handleClearSelectedOption}
        contentLabel="Remove Option"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">Remove Item</h3>
        {props.selectedOption && <p>Remove {props.selectedOption.description}?</p>}
        <button className="button button--modal" onClick={props.handleRemove}>Remove</button>
        <button className="button" onClick={props.handleClearSelectedOption}>Cancel</button>
    </Modal>
);

export default RemoveModal;

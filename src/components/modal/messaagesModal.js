import React from "react";
import { Modal, Button } from "react-bootstrap";

function MessagesModal (props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <p className="modal__contact--header">Message Sent!</p>
        <p className="modal__contact--paragraph">We will get back to you as soon as possible.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="modal__contact--button" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessagesModal;
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './modais.scss';

// eslint-disable-next-line react/prop-types
const ModalConfirmacao = ({ isOpen, toggle, onConfirm }) => {
  
  const handleConfirm = () => {
    onConfirm();
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} id='delete-modal' centered={true}>
      <ModalHeader toggle={toggle} id='edit-icon'></ModalHeader>
      <ModalBody>
        <p>Deseja mesmo <span>excluir</span> estes sintomas ?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirm}>Sim</Button>
        <Button color="secondary" onClick={toggle}>Não</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalConfirmacao;
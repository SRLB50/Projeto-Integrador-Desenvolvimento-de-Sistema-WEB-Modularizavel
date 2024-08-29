// src/components/ModalVisualizarSintoma.js
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, List,  } from 'reactstrap';
import ModalConfirmacao from './ModalConfirmacao';
import pencilIcon from './../../assets/Icon-pencil.svg';

// eslint-disable-next-line react/prop-types
const ModalVisualizarSintoma = ({ isOpen, toggle, onDelete, onEdit, sintoma }) => {
  const [modalConfirmOpen, setModalConfirmOpen] = React.useState(false);
  const toggleConfirm = () => setModalConfirmOpen(!modalConfirmOpen);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>
            Seus sintomas neste dia :
            <Button id='edit-icon' onClick={onEdit}>
                <img src={pencilIcon} alt="" />
            </Button>
        </ModalHeader>
        <ModalBody>
          <List>
            <li>{sintoma || "Nenhum sintoma adicionado"}</li> 
          </List>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleConfirm}>Excluir</Button>
          <Button color="secondary" onClick={toggle}>Fechar</Button>
        </ModalFooter>
      </Modal>

      <ModalConfirmacao isOpen={modalConfirmOpen} toggle={toggleConfirm} onConfirm={onDelete} />
    </>
  );
};

export default ModalVisualizarSintoma;
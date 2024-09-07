/* eslint-disable */
import React, { useEffect } from 'react';
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, List,  } from 'reactstrap';
import ModalConfirmacao from './ModalConfirmacao';
import pencilIcon from './../../assets/Icon-pencil.svg';
import { useState } from 'react';
import './modais.scss';

// eslint-disable-next-line react/prop-types
const ModalVisualizarSintoma = ({ isOpen, toggle, onEdit, atualizarSintoma, daySelected, userId, setEvents }) => {
  const [modalConfirmOpen, setModalConfirmOpen] = React.useState(false);
  const [modalContent, setModalContent] = useState("")
  const toggleConfirm = () => setModalConfirmOpen(!modalConfirmOpen);

  useEffect(() => {
    if (daySelected && isOpen) {
      axios.get(`http://localhost:3000/sintomas`, {params: {userId: userId}} )
      .then(response => {
        let itemSelected; 
        response.data.forEach(item => {
          if(item.data == daySelected) {
            itemSelected = item
          }
        })

        atualizarSintoma(itemSelected)
        setModalContent(itemSelected)
      }).catch(error => {
        console(error, 'error')
      })  
    }

    return () => {}
  },[daySelected, isOpen])


  const handleExcludeSyntom = () => {
    console.log(modalContent, 'modalContent')
    console.log({params: {id: modalContent?.id}}, 'teste')
    axios.delete(`http://localhost:3000/sintomas`, {params: {id: modalContent?.id}} )
      .then(response => {
    
        setEvents(event => {
          return event.map(item => { return {...item, sintoma:item?.data == modalContent?.data ? false : item.sintoma} })
        })
        alert('Sintoma deletado com sucesso!')
        atualizarSintoma("")
        toggle()
      }).catch(error => {
        console(error, 'error')
      })  
  }

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
            <li>{ modalContent?.descricao || "Nenhum sintoma adicionado"}</li> 
          </List>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {toggleConfirm(), atualizarSintoma("")}}>Excluir</Button>
          <Button color="secondary" onClick={() => {toggle(), atualizarSintoma("")}}>Fechar</Button>
        </ModalFooter>
      </Modal>

      <ModalConfirmacao isOpen={modalConfirmOpen} toggle={toggleConfirm} onConfirm={handleExcludeSyntom} />
    </>
  );
};

export default ModalVisualizarSintoma;
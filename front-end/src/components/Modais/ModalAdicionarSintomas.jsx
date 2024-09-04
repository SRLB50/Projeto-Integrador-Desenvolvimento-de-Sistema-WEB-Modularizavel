/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import './modais.scss';

// eslint-disable-next-line react/prop-types
const ModalAdicionarSintoma = ({ isOpen, toggle, sintoma, daySelected, setEvents }) => {
  const [sintomaTexto, setSintomaTexto] = useState('');

  useEffect(() => {
    if (sintoma) {
      setSintomaTexto(sintoma?.descricao);
    } else {
      setSintomaTexto('');
    }

    return () => {}
  }, [sintoma, isOpen]);

  const handleSave = () => {
    if(sintomaTexto && !sintoma) {
      axios.post(`http://localhost:3000/sintomas`, 
        {userId: 1, data: daySelected, descricao: sintomaTexto } 
      )
      .then((response) => {
        alert('Sintoma adicionado com sucesso!')
        setEvents(event => {
          return [...event, {
            mestruacao: false,
            sintoma: true,
            gravidez: false,
            data: daySelected,
          }]
        })

        setSintomaTexto('');
        toggle()
      }).catch(error => {
        console.log(error, 'error')
        alert("erro ao cadastrar sintoma!")
      })
    } else {
      axios.put(`http://localhost:3000/sintomas`, 
        {id: sintoma.id, descricao: sintomaTexto } 
      )
      .then((response) => {
        alert('Sintoma atualizado com sucesso!')
        setSintomaTexto('');
        toggle()
      }).catch(error => {
        console.log(error, 'error')
        alert("erro ao cadastrar sintoma!")
      })
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered={true}>
      <ModalHeader toggle={toggle}>Seus sintomas neste dia :</ModalHeader>
      <ModalBody>
        <Input
          type="textarea"
          value={sintomaTexto}
          onChange={(e) => setSintomaTexto(e.target.value)}
          placeholder="Liste seus sintomas..."
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Cancelar</Button>
        <Button color="secondary" onClick={handleSave}>Salvar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalAdicionarSintoma;
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

// eslint-disable-next-line react/prop-types
const ModalAdicionarSintoma = ({ isOpen, toggle, onSave, sintoma }) => {
  const [sintomaTexto, setSintomaTexto] = useState('');

  useEffect(() => {
    if (sintoma) {
      setSintomaTexto(sintoma);
    } else {
      setSintomaTexto('');
    }
  }, [sintoma, isOpen]);

  const handleSave = () => {
    if (sintomaTexto.trim()) {
      onSave(sintomaTexto);
      setSintomaTexto('');
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
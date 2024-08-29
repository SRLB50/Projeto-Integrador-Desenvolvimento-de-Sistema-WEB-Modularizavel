// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import ModalAdicionarSintoma from './ModalAdicionarSintomas';
import ModalVisualizarSintoma from './ModalVisualizarSintomas';
import eyeIcon from './../../assets/Icon-eye.svg'
import plusIcon from './../../assets/Icon-plus.svg'
import './sintomas.scss'


const BotaoModal = () => {
  const [isSintomaPresent, setIsSintomaPresent] = useState(false);
  const [modalAdicionarOpen, setModalAdicionarOpen] = useState(false);
  const [modalVisualizarOpen, setModalVisualizarOpen] = useState(false);
  const [sintomaEditando, setSintomaEditando] = useState('');

  const toggleAdicionar = () => setModalAdicionarOpen(!modalAdicionarOpen);
  const toggleVisualizar = () => setModalVisualizarOpen(!modalVisualizarOpen);

  const handleSalvarSintoma = (sintoma) => {
    setIsSintomaPresent(true);
    setSintomaEditando(sintoma);
    setModalAdicionarOpen(false);
  };

  const handleExcluirSintoma = () => {
    setIsSintomaPresent(false);
    setSintomaEditando('');
    setModalVisualizarOpen(false);
  };

  const handleEditarSintoma = () => {
    setModalVisualizarOpen(false);
    setModalAdicionarOpen(true);
  };

  return (
    <>
      <Button color="secondary" onClick={isSintomaPresent ? toggleVisualizar : toggleAdicionar}>
        <img src={isSintomaPresent ? eyeIcon : plusIcon} alt="" />
        Sintoma
      </Button>

      <ModalAdicionarSintoma
        isOpen={modalAdicionarOpen}
        toggle={toggleAdicionar}
        onSave={handleSalvarSintoma}
        sintoma={sintomaEditando}
      />

      <ModalVisualizarSintoma
        isOpen={modalVisualizarOpen}
        toggle={toggleVisualizar}
        onDelete={handleExcluirSintoma}
        onEdit={handleEditarSintoma}
        sintoma={sintomaEditando}
      />
    </>
  );
};

export default BotaoModal;
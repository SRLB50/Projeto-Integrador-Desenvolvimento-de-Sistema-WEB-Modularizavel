import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import logo from './../../assets/CycleSense.svg';
import closeButton from './../../assets/closeButton.svg';
import './modais.scss';

// eslint-disable-next-line react/prop-types
function ModalAtraso({ daysLate, modalAtraso, setModalAtraso }) {
    
    const toggle = () => setModalAtraso(false);
    return (
        <>
            <Modal isOpen={modalAtraso} toggle={toggle} centered={true}>
                <ModalHeader>
                    <img src={logo} id='logo' alt="CycleSense" />
                    <Button id="edit-icon" onClick={toggle}>
                        <img src={closeButton} alt="" id="close-icon" />
                    </Button>
                </ModalHeader>
                <ModalBody>
                    <h3>{daysLate > 7 ? "Você ultrapassou os 7 dias de atraso!" : "Sua menstruação está atrasada!"}</h3>
                    <p>{daysLate > 7 ? "Aconselhamos que faça um teste de gravidez ou marque uma consulta médica" : "Caso o atraso ultrapasse 7 dias, faça um teste de gravidez."}!</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle} id="button-ok">Ok</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalAtraso;

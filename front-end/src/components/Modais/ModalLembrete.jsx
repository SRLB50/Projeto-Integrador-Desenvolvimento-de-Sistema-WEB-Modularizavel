import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import logo from './../../assets/CycleSense.svg';
import closeButton from './../../assets/closeButton.svg';
import { useEffect, useState } from "react";
import './modais.scss';

function ModalLembrete() {

    const [ isOpen , setIsOpen] = useState(true);
    const toggle = () => setIsOpen(false);
    useEffect(() => {
        setIsOpen(true);
    },[]);

    return ( 
        <>
            <Modal isOpen={isOpen} toggle={toggle} centered={true}>
                <ModalHeader>
                    <img src={logo} id='logo' alt="CycleSense" />
                    <Button id="edit-icon" onClick={toggle}><img src={closeButton} alt="" id="close-icon"/></Button>
                </ModalHeader>
                <ModalBody>
                    <h3>Como você se sente hoje?</h3>
                    <p>Utilize a opção adicionar sintoma para registrar seu estado</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle} id="button-ok">Ok</Button>
                </ModalFooter>
            </Modal>
        </>
     );
}

export default ModalLembrete;
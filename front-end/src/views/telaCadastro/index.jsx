import "./index.scss"
import { useEffect, useState } from 'react';

import logo from "./../../assets/CycleSense.svg"
import back from "./../../assets/back.svg"
import InputRegister from "../../components/InputRegister/InputRegister";
import Register from "../../services/register"

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

// Componente de Cadastro
function CadastroUsuario() {

  const [fields, setFields] = useState([])
  const [showBack, setShowBack] = useState(false)
  const [lastField, setLastField] = useState(false)
  const [showField, setShowField] = useState(0)

  const [input, setInput] = useState(0)

  useEffect(() => {
    const getInput = InputRegister({ position: showField })

    setInput(getInput)
  }, [showField])

  useEffect(() => fields.length <= 3 ? setLastField(false) : setLastField(true), [fields])

  useEffect(() => {
    if (input) {
      document.querySelector(`#${input.id}`).value = ""
    }
  }, [input])

  const registerUser = async () => {
    if (fields.length > 0) {
      let body = {}

      fields.forEach(field => body[field.field] = field.value)

      if (body) {
        const register = new Register(body)

        const send = await register.send()

        if (send.error) {
          alert("Erro ao realizar cadastro!! " + send.error)
        }else{
          
        }
      }
    }
  }

  const nextField = () => {
    const valueField = document.querySelector(`#${input.id}`).value

    if (valueField != "") {

      setFields([...fields, { field: input.id, value: valueField, label: input.label }])
      setShowField((...prev) => Number(prev[0]) + 1)
      setShowBack(true)
    } else {
      alert("Campo vazio!")
    }
  }

  const backField = () => {

    const infos = InputRegister({ position: showField - 1 })
    setShowField(showField - 1)

    const { id } = infos

    const valueField = fields.filter(field => field.field == id)

    document.querySelector(`#${id}`).value = valueField[0].value
  }

  return (
    <div className="main-register">
      <section id="content-register">
        <div className="title">
          <img src={logo} alt="Cycle Sense" />
        </div>

        <Form className="form-register">
          {/* {showBack && (<div className="back" onClick={() => backField()}> <img src={back} alt="Back" /></div>)} */}

          {input ? (
            <FormGroup>
              <Label for={input.id}>{input.label}</Label>
              <div className="input-div">
                {input.field}
                {
                  fields.length <= 3 && <button type="button" className="next-field" onClick={() => nextField()}>&gt;</button>
                }
              </div>

            </FormGroup>
          ) :
            fields.map((items, i) => (
              <FormGroup key={i}>
                <Label for={items.id}>{items.label}</Label>
                {items.field == "data_nascimento" ? <Input value={items.value} type="date" /> : <Input value={items.value} />}
              </FormGroup>
            ))
          }


          {lastField && <Button onClick={() => registerUser()} className="button-send">Cadastre-se</Button>}

          <hr className="line-pink" />

          <div className="access" style={{ textAlign: "center" }}>
            <h5>Já tem acesso? Entre</h5>
          </div>
        </Form>

      </section>
    </div>
  );
}

export default CadastroUsuario;

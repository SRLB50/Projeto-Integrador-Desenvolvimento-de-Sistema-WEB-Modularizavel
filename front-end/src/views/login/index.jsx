/* eslint-disable */
import "./index.scss"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import logo from "./../../assets/CycleSense.svg"

const Login = () => {


  return (
    <>
      <div className="main-login">
        <section id="content-login">
          <div className="title">
            <img src={logo} alt="Cycle Sense" />
          </div>

          <Form>
            <FormGroup>
              <Label for="email">E-mail</Label>
              <Input id="email" name="email" placeholder="Adicione seu e-mail" type="email" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Senha</Label>
              <Input id="password" name="password" placeholder="Senha" type="password" />
            </FormGroup>
            <Button>
              Entrar
            </Button>

            <hr />

            <div className="access" style={{textAlign: "center"}}>
              <h5>Não tem acesso? Então cadastre-se</h5>
            </div>
          </Form>

        </section>
      </div>
    </>
  )
}

export default Login
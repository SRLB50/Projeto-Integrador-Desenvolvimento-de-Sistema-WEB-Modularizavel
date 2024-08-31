/* eslint-disable */
import "./index.scss"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import logo from "./../../assets/CycleSense.svg"
import Auth from "../../services/auth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token && token != "") {
      navigate("/")
    }
  }, [])

  const authService = async () => {

    const dataLogin = {
      email: document.querySelector("#email").value,
      senha: document.querySelector("#password").value
    }

    const valuesAuth = Object.entries(dataLogin).filter(fieldValue => fieldValue[1] == "")

    if (valuesAuth.length == 0) {
      const sendUser = new Auth(dataLogin.email, dataLogin.senha)

      const returnUser = await sendUser.send()

      if (returnUser.error) {
        alert(`Erro: ${returnUser.error}`)
      } else {
        sessionStorage.setItem("token", returnUser.dados_usuario.token)
        navigate("/")
      }
    }
  }

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
            <Button onClick={() => authService()}>
              Entrar
            </Button>

            <hr />

            <div className="access" style={{ textAlign: "center" }}>
              <h5>Não tem acesso? Então cadastre-se</h5>
            </div>
          </Form>

        </section>
      </div>
    </>
  )
}

export default Login
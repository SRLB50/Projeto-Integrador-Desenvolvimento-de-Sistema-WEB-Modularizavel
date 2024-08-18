import "./Perfil.scss"
import { Form, FormGroup, Label, Input } from "reactstrap"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"


const Perfil = () => {

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [birthday, setBirthday] = useState("")

  useEffect(() => {
    const user = sessionStorage.getItem("token")
    const { nome, email, data_nascimento } = jwtDecode(user)

    setName(nome)
    setEmail(email)
    setBirthday(formattedDate(data_nascimento))

  }, [])

  const formattedDate = (date) => {
    const [year, month, day] = date.split("-")

    return day + "/" + month + "/" + year
  }

  return (
    <section id="perfil">
      <Form>
        <FormGroup>
          <Label for="nome">Nome</Label>
          <Input id="nome" name="nome" type="text" readOnly value={name} />
        </FormGroup>
        <FormGroup>
          <Label for="email">E-mail</Label>
          <Input id="email" name="email" type="email" readOnly value={email} />
        </FormGroup>
        <FormGroup>
          <Label for="data_nascimento">Data de Nascimento</Label>
          <Input id="data_nascimento" name="data_nascimento" type="text" readOnly value={birthday} />
        </FormGroup>
      </Form>
    </section>
  )
}

export default Perfil
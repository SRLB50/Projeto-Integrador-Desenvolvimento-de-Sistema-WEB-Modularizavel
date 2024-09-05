
import { Input } from 'reactstrap';

const InputRegister = ({ position }) => {
    const fields = [
        {
            field   : <Input id="email" name="email" placeholder="Adicione seu e-mail" type="email" />,
            label   : "E-mail",
            id      : "email" 
        },
        {
            field   : <Input id="password" name="password" type="password" />,
            label   : "Senha",
            id      : "password"
        },
        {
            field   : <Input id="nome" name="nome" placeholder="Informe seu nome" type="text" />,
            label   : "Nome",
            id      : "nome"
        },
        {
            field   : <Input id="data_nascimento" name="data_nascimento" placeholder="Informe seu nome" type="date" />,
            label   : "Data de Nascimento",
            id      : "data_nascimento"
        }
    ]

    return fields[position]
}

export default InputRegister
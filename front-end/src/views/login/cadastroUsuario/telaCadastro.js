import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert
} from 'reactstrap';

function CadastroUsuario() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/register', { email, password });
      setMessage('Cadastro realizado com sucesso! Verifique seu e-mail para confirmação.');
      setAlertColor('success');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setMessage('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
      setAlertColor('danger');
    }
  };

  return (
    <Container className="register-container">
      <h2>Cadastro</h2>
      <Form onSubmit={handleSubmit} className="register-form">
        <FormGroup>
          <Label for="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Senha</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit" color="primary">Cadastrar</Button>
      </Form>
      {message && <Alert color={alertColor} className="mt-3">{message}</Alert>}
    </Container>
  );
}

const Login = () => {
  const [count, setCount] = useState(0);
  const [showRegister, setShowRegister] = useState(false); // Estado para alternar entre login e cadastro

  return (
    <>
      {!showRegister ? (
        <>
          <div>
            Teste tela de login
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount(count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
            <Button color="link" onClick={() => setShowRegister(true)}>
              Não tem uma conta? Cadastre-se
            </Button>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>
      ) : (
        <CadastroUsuario />
      )}
    </>
  );
}

export default Login;

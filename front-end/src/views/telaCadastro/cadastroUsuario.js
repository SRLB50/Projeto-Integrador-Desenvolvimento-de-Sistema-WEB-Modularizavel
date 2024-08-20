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

// Componente de Cadastro
function CadastroUsuario() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/register', { firstName, lastName, email, password });
      setMessage('Cadastro realizado com sucesso! Verifique seu e-mail para confirmação.');
      setAlertColor('success');
      setFirstName('');
      setLastName('');
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
          <Label for="firstName">Nome</Label>
          <Input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Sobrenome</Label>
          <Input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </FormGroup>
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

export default CadastroUsuario;

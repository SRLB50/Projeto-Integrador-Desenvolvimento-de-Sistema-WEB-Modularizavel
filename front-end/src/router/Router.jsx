import { Routes, Route } from 'react-router-dom';
import Home from '../views/home/index';
import Login from '../views/login/index';
import TelaInicial from '../components/TelaInicial/TelaInicial';
import CadastroUsuario from './views/telaCadastro/index';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="calendar" element={<TelaInicial />} />
        <Route path="home" index element={<TelaInicial />} />
        <Route path='perfil' element={<TelaInicial />} />
        <Route path='dicas' element={<TelaInicial />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path='/register' element={<CadastroUsuario />} />
    </Routes>
  );
};

export default Router;
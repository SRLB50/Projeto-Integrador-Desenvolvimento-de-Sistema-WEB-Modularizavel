import { Routes, Route } from 'react-router-dom';
import Home from '../views/home/index';
import Login from '../views/login/index';
import Calendario from '../views/calendario/index';
import Perfil from '../views/perfil/index';
import Dicas from '../views/dicas/index';
import TelaInicial from '../components/TelaInicial/TelaInicial';
import CadastroUsuario from '../views/telaCadastro/index';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="calendar" element={<Calendario />} />
        <Route path="home" index element={<TelaInicial />} />
        <Route path='perfil' element={<Perfil />} />
        <Route path='dicas' element={<Dicas />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path='/register' element={<CadastroUsuario />} />
    </Routes>
  );
};

export default Router;
import { Routes, Route } from 'react-router-dom';
import Home from '../views/home/index';
import Login from '../views/login/index';
import Calendario from '../views/calendario/index';
import TelaInicial from '../components/TelaInicial/TelaInicial';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="calendar" element={<Calendario />} />
        <Route path="home" index element={<TelaInicial />} />
        <Route path='perfil' element={<TelaInicial />} />
        <Route path='dicas' element={<TelaInicial />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
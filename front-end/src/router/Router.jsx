import { Routes, Route } from 'react-router-dom';
import Home from '../views/home/index';
import Login from '../views/login/index';
import TelaInicial from '../components/TelaInicial/TelaInicial';
import Perfil from '../components/Perfil/Perfil';
import Dicas from '../components/Dicas/Dicas';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} >
        {/* <Route path="calendar" element={<Calendar />} /> */}
        <Route path="home" index element={<TelaInicial />} />
        <Route path='perfil' element={<Perfil />} />
        <Route path='dicas' element={<Dicas />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
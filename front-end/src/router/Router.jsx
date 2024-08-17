import { Routes, Route } from 'react-router-dom';
import Home from '../views/home/index';
import Login from '../views/login/index';
import Calendario from '../views/calendario/index';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/login" element={<Login />} />
      <Route path="/calendario" element={<Calendario />} />
    </Routes>
  );
};

export default Router;
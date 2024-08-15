import { Routes, Route } from 'react-router-dom';
import Home from '../views/home/index';
import Login from '../views/login/index';
import Calendar from '../views/calendar/index'
import TelaInicial from '../components/TelaInicial/TelaInicial';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/home" index element={<TelaInicial />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
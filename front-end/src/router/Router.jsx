import { Routes, Route } from 'react-router-dom';
import Home from '../views/home/index';
import Login from '../views/login/index';
import Calendar from '../views/calendar/index'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/login" element={<Login />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
};

export default Router;
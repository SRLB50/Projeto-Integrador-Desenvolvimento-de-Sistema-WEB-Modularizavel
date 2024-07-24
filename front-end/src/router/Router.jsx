import { Routes, Route } from 'react-router-dom';
import Home from '../views/home/index';
import Login from '../views/login/index';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
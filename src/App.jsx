import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import WorkerProfile from './pages/WorkerProfile';
<<<<<<< HEAD
=======
import Services from './pages/services';
>>>>>>> 303b04b7ef91e11f998c7aa8868bb87b059cd6d3

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
=======
          <Route path="/services" element={<Services />} />
>>>>>>> 303b04b7ef91e11f998c7aa8868bb87b059cd6d3
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<WorkerProfile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

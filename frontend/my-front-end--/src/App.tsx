
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.component'
import Register from './components/register.component';
import Profile from './components/profile.component';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
 

  return (
  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element= {<Profile />} />
      </Routes>
  );
}

export default App

import './App.css'
import Navbar from './Components/Navbar.jsx'
import {Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Appointments from './Pages/Appointments.jsx'
import Doctor from './Pages/Doctors.jsx'
import Profile from './Pages/Profile.jsx'
import Doctordetails from './Pages/Doctordetails.jsx'

function App() {
  
  return (
    <>
    <Routes><Route path="/" element={<Home/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/appointments" element={<Appointments/>}></Route>
    <Route path="/doctors" element={<Doctor/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/doctordetails" element={<Doctordetails/>}></Route>
    </Routes>
    </>
  )
}

export default App

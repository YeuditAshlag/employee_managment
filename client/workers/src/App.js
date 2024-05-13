
import './App.css';

import EmployeeList from './pages/employeeList';
import Nav from './components/Header/Nav';
import { Route, Routes } from 'react-router-dom';
// import Add from './components/employee/add';

import DeleteEmployee from './components/Employee/deleteEmployee';
import AddRoleToRoles from './components/AddRoleToRoles';
import CardsAllEmployeeies from './pages/CardsAllEmployeeies';

// import LogOut from './components/Auth/LogOut';
import NavSearch from './components/Header/Nav';
import SendEmailDialog from './components/Employee/SendEmail';
import Login from './components/Auth/LogIn'
import HomePage from './pages/HomePage';
import Footer from './components/Header/footer';
import AddRole from './components/Role/addRole';
import Add from './components/Employee/add';






function App() {
  return (
   <>
   <NavSearch/>
   <Routes>
   <Route path="/home" element={<HomePage />} />
    <Route path="/HomePage" element={<HomePage />} />
    <Route path='/employee' element={<EmployeeList/>}/>
    <Route path='/nav' element={<Nav/>}></Route>
    <Route path='/delete' element={<DeleteEmployee/>}></Route>
    <Route path='/add' element={<Add/>}></Route>
    <Route path='/addrole' element={<AddRole/>}></Route>
    <Route path='/add-role' element={<AddRoleToRoles/>}></Route>
    <Route path='/all' element={<CardsAllEmployeeies/>}></Route>
    {/* <Route path='not-found' element={<NotFound/>}></Route> */}
    <Route path='/' element={<Login/>}></Route>
    <Route path='/footer' element={<Footer/>}></Route>
    {/* <Route path='/LogOut' element={<LogOut/>}></Route> */}
    <Route path='/send' element={<SendEmailDialog/>}></Route>
   </Routes>
   </>
  );
}

export default App;

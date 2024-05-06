
import './App.css';

import EmployeeList from './pages/employeeList';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import Add from './components/add';
import AddRole from './components/addRole';
import DeleteEmployee from './components/deleteEmployee';
import AddRoleToRoles from './components/AddRoleToRoles';
import CardsAllEmployeeies from './pages/CardsAllEmployeeies';
import SignIn from './components/Auth/SignIn';
import LogOut from './components/Auth/LogOut';
// import LogIn from './components/Auth/Login';
import HomePage from './components/HomePage';
import NavSearch from './components/Nav';
import SendEmailDialog from './components/SendEmail';
import Login from './components/Auth/LogIn'


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
    <Route path='/SignIn' element={<SignIn/>}></Route>
    <Route path='/' element={<Login/>}></Route>

    {/* <Route path='/Login' element={<LogIn/>}></Route>
     */}
    <Route path='/LogOut' element={<LogOut/>}></Route>
    <Route path='/send' element={<SendEmailDialog/>}></Route>
   </Routes>
   </>
  );
}

export default App;

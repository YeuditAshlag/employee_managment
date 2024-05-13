import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import {  Typography, Box, Dialog, DialogContent, DialogTitle, TextField, Button, Grid, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { addNewEmployee, getAllEmployeeies, updateEmployee } from "../../utils/utilEmployee";
import AddRole from '../Role/addRole';


const Add = ({ setTextButton, textButton, employeeEdit, setEmployeeEdit, openDialog, setOpenDialog }) => {
  const dispatch = useDispatch();
  console.log(employeeEdit);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    identity: '',
    email: '',
    password: '',
    startDateWork: '',
    birthDate: '',
    gender: 1,
    roles: []
  });
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };



  const fetchData = async () => {
    const allEmployeeies_ = await getAllEmployeeies()
    console.log(allEmployeeies_);
    dispatch({ type: 'GET_EMPLOYEE', data: allEmployeeies_ })
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleChange = (e) => {
    setPassword(e.target.value);
    const { name, value } = e.target;
    let modifiedValue = value;
    if (name === 'gender') {
      modifiedValue = +e.target.value;
    }
    setEmployeeEdit({ ...employeeEdit, [name]: modifiedValue });
  };
 
  const handleSubmit = async (e) => {
    console.log(employeeEdit)
    e.preventDefault();
    const formattedDate = new Date(employeeEdit.birthDate);
    employeeEdit.birthDate = formattedDate;

    if (textButton === 'Edit') {
      const employee = await updateEmployee(employeeEdit)
      console.log(employee);
      dispatch({ type: 'EDIT_EMPLOYEE', data: employee });

    } else {
      const employee = await addNewEmployee(employeeEdit)
      console.log(employee);
      dispatch({ type: 'ADD_EMPLOYEE', data: employee });
    }
    handleClose()
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEmployeeEdit(employeeData)
    setTextButton('Add')
  }

  const handleRemoveRole = (id) => {
    const updatedRoles = employeeEdit.roles.filter(role => role.role.id !== id); 
    setEmployeeEdit(prevState => ({
      ...prevState,
      roles: updatedRoles
    }));
    setOpenDialog(true);
  };


  // const renderRoleOptions = () => {
  //   return employeeEdit.roles.map(role => (
  //     <MenuItem key={role.id} value={role.id}>{role.nameRole}</MenuItem>
  //   ));
  // };

  useEffect(() => {
    if (openDialog === false) {
      handleClose()
    }
  }, [openDialog])

  const parseDate = (date) => {
    if (date) {
      const parsedDate = new Date(date);
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsedDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  };
  return (
    <div>

      <Button variant="contained"   sx={{
              mt: 2, mb: 2,
              bgcolor: '#D32F2F', 
              color: '#ffffff',
              '&:hover': { 
                backgroundColor: '#ffffff', 
                color: '#D32F2F',
              },
            }} onClick={() => setOpenDialog(true)}>{textButton} Employee</Button>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{textButton} Employee</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="First Name" name="firstName" value={employeeEdit.firstName} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Last Name" name="lastName" value={employeeEdit.lastName} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Identity" name="identity" value={employeeEdit.identity} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" name="email" value={employeeEdit.email} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Birth Date"
                  type="date"
                  name="birthDate"
                  value={parseDate(employeeEdit.birthDate)} // החיל את הפונקציה parseDate על ערך התאריך
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup row aria-label="gender" name="gender" style={{color:'D32F2F'}} value={employeeEdit.gender || ''} onChange={handleChange}>
                    <FormControlLabel value="1" control={<Radio />} label="Male" />
                    <FormControlLabel value="2" control={<Radio />} label="Female" />
                  </RadioGroup>
                </FormControl>
              </Grid>
                 <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={employeeEdit.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Start Date Work" type="date" name="startDateWork" value={parseDate(employeeEdit.startDateWork)} InputLabelProps={{ shrink: true }} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6">Roles:</Typography>
                  {employeeEdit.roles?.map((role, index) => (
                    <Box key={index} display="flex" alignItems="center">
                      <Typography >{role.role?.nameRole}</Typography> 

                      <Button onClick={() => handleRemoveRole(role.role.id)} color="error">
                        <DeleteIcon />
                      </Button>
                    </Box>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <AddRole employeeEdit={employeeEdit} setEmployeeEdit={setEmployeeEdit} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">{textButton} Employee</Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Add;

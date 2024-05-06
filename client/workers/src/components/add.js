import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import {  Typography, Box, Dialog, DialogContent, DialogTitle, TextField, Button, Grid, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';
import AddRole from './addRole';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';
import { addNewEmployee, getAllEmployeeies, updateEmployee } from "../utils/utilEmployee";


const Add = ({ setTextButton, textButton, employeeEdit, setEmployeeEdit, openDialog, setOpenDialog }) => {
  const dispatch = useDispatch();
  console.log(employeeEdit);
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    identity: '',
    email: '',
    password: '1234',
    startDateWork: '',
    birthDate: '',
    gender: 1,
    roles: []
  });

  const fetchData = async () => {
    const allEmployeeies_ = await getAllEmployeeies()
    console.log(allEmployeeies_);
    dispatch({ type: 'GET_EMPLOYEE', data: allEmployeeies_ })
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    let modifiedValue = value;
    if (name === 'gender') {
      modifiedValue = +e.target.value;
    }
    setEmployeeEdit({ ...employeeEdit, [name]: modifiedValue });
  };
  const stringToDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // month - 1 כי החודשים מתחילים מ-0 ב-JavaScript
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
  // const handleRemoveRole = (id) => {
  //   console.log(id)
  //   employeeEdit.roles = employeeEdit.roles.filter(role => (role.role.id == id))
  //   setOpenDialog(true);
  // }
  // const handleRemoveRole = (id) => {
  //   const updatedRoles = employeeEdit.roles.filter(role => role.role.id !== id); // סינון התפקיד הנבחר
  //   setEmployeeEdit(prevState => ({
  //     ...prevState,
  //     roles: updatedRoles
  //   }));

  //   setOpenDialog(true); // לא ברור למה זה נדרש, כנראה שזה משהו שקשור ללוגיקה הקיימת באפליקציה שלך
  // };

  const handleRemoveRole = (id) => {
    console.log("click on me {id}",id)
    // Filter out the role with the matching id
    employeeEdit.roles = employeeEdit.roles.filter(role => role.id !== id);
    // Update state directly (no need for prevState)
    setEmployeeEdit(employeeEdit);
    setOpenDialog(true); // (Optional, maintain dialog state)
  
    // Optional: Implement logic to remove role from server (API call)
  };
  
  const renderRoleOptions = () => {
    return employeeEdit.roles.map(role => (
      <MenuItem key={role.id} value={role.id}>{role.nameRole}</MenuItem>
    ));
  };

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
                <TextField fullWidth label="Start Date Work" type="date" name="startDateWork" value={parseDate(employeeEdit.startDateWork)} InputLabelProps={{ shrink: true }} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6">Roles:</Typography>
                  {employeeEdit.roles?.map((role, index) => (
                    <Box key={index} display="flex" alignItems="center">
                      <Typography>{role.role.nameRole}</Typography>

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

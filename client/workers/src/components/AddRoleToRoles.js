import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const AddRoleToRoles = ({ onClose }) => { // Receive onClose prop to handle dialog closing
  const dispatch = useDispatch();
  const [roleData, setRoleData] = useState({
    nameRole: '' // שינוי זה
  });

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7000/api/Role', roleData)
      .then(response => {
        dispatch({ type: 'ADD_ROLE', data: response.data });
        console.log('Role added successfully:', response.data);
        onClose(); // Close dialog after successfully adding role
      })
      .catch(error => {
        console.error('Error adding role:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleData({ ...roleData, [name]: value });
  };

  return (
    <div>
      <DialogTitle>Add New Role</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Role Name"
            name="nameRole" 
            value={roleData.nameRole} 
            onChange={handleInputChange}
            required
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Role</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </div>
  );
};

export default AddRoleToRoles;

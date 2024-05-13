
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Visibility';
import { IconButton, Button as MuiButton, Dialog, DialogTitle, DialogContent, DialogActions, TablePagination, SpeedDial, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, Tooltip  } from '@mui/material';
import EmployeeDetails from '../components/Employee/employeeDetails';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddRoleToRoles from '../components/AddRoleToRoles';
import PrintButton from '../components/Header/PrintButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { getAllEmployeeies, getEmployeeById } from "../utils/utilEmployee";
import EmailIcon from '@mui/icons-material/Email';
import SendEmailDialog from '../components/Employee/SendEmail';
import {  TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../style/style1.css';
import { Button, AddCircleOutlineIcon } from '@mui/material';
// import { Add } from '@mui/icons-material';
import Add from '../components/Employee/add';


const EmployeeList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [DetailsOpenDialog, setDetailsOpenDialog] = useState(false);
  const [OpenSendEmailDialog, setOpenSendEmailDialog] = useState(false);
  const [employeeEmail, SetNameEmail] = useState("");
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [employeeEdit, setEmployeeEdit] = useState({
    firstName: '',
    lastName: '',
    identity: '',
    password: localStorage.getItem('password'),
    email:'',
    startDateWork: '',
    birthDate: '',
    gender: 1,
    roles: []
  });
  const [textButton, setTextButton] = useState('Add');
  const dispatch = useDispatch();
  const employees = useSelector((state) => state?.employeeies);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleOpenSearchBar = () => {
    setShowSearchBar(true);
  };

  const handleCloseSearchBar = () => {
    setShowSearchBar(false);
  };

  const fetchData = async () => {
    const allEmployeeies_ = await getAllEmployeeies();
    console.log(allEmployeeies_);
    dispatch({ type: 'GET_EMPLOYEE', data: allEmployeeies_ });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [openDialog]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenSendEmailDialog = (employeeEmail) => {
    SetNameEmail(employeeEmail);
    setOpenSendEmailDialog(true);
  };

  const handleCloseSendEmailDialog = () => {
    setOpenSendEmailDialog(false);
  };

  const handleDeleteEmployee = (id) => {
    navigate('/delete', { state: id });
  };

  const handleShowDetails = (employee) => {
    setSelectedEmployee(employee);
    setDetailsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setDetailsOpenDialog(false);
  };

  const handleAddRole = () => {
    setIsRoleDialogOpen(true);
  };

  const handleUpdateEmployee = async (employee) => {
    console.log('emp', employee);
    const emp = await getEmployeeById(employee.id);
    console.log(emp);
    setEmployeeEdit(emp);
    setTextButton('Edit');
    setOpenDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExportToExcel = () => {
    const tableContent = [
      ['First Name', 'Last Name', 'Identity', 'Start Date Work', 'BirthDate', 'Gender'],
      ...employees.map(employee => [employee.firstName, employee.lastName, employee.identity, employee.startDateWork, employee.birthDate, employee.gender])
    ];

    const csvContent = tableContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'employees.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Your browser does not support downloading files. Please try again with a different browser.');
    }
  };

  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePrintTable = () => {
    window.print();
  };

  return (
    <div >
      <div style={{ display: 'flex' }}>
        <Add setTextButton={setTextButton} textButton={textButton} employeeEdit={employeeEdit} setEmployeeEdit={setEmployeeEdit} openDialog={openDialog} setOpenDialog={setOpenDialog} />
        <Button variant="contained" onClick={handleAddRole}   sx={{
              mt: 2, mb: 2,
              bgcolor: '#D32F2F', 
              color: '#ffffff',
              '&:hover': { 
                backgroundColor: '#ffffff', 
                color: '#D32F2F',
              },
            }}>Add Role</Button>
      </div>
      <Toolbar style={{ display: 'flex' }}>
        <Tooltip>
          <IconButton onClick={() => handleExportToExcel()} style={{ borderRadius: '50%', backgroundColor: 'grey', color: 'white' }}>
            <ArrowDownwardIcon />
          </IconButton>
        </Tooltip>

        <PrintButton handlePrint={handlePrintTable} className="print-button" />

        <IconButton onClick={handleOpenSearchBar} style={{ borderRadius: '50%', backgroundColor: 'grey', color: 'white' }}>
          <SearchIcon />
        </IconButton >
        {showSearchBar && (
          <TextField
            id="search-bar"
            label="Search..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            onBlur={handleCloseSearchBar}
          />
        )}
      </Toolbar>
      <TableContainer component={Paper} elevation={3} style={{ margin: 'auto', maxWidth: '50%' }}>
        <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Identity</TableCell>
              <TableCell>Date Of Start Working</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((employee) =>
                employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.identity.includes(searchTerm) ||
                employee.startDateWork.includes(searchTerm))
              .map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.identity}</TableCell>
                  <TableCell>{employee.startDateWork}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleUpdateEmployee(employee)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteEmployee(employee.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleShowDetails(employee)}>
                      <ViewIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenSendEmailDialog(employee.email)}>
                      <EmailIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination rowsPerPageOptions={[7, 10, 25]} component="div" count={employees.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        {isRoleDialogOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', boxShadow: '0px 0px 10px rgba(0,0,0,0.5)', zIndex: 99999 }}>
              <AddRoleToRoles onClose={() => setIsRoleDialogOpen(false)} />
            </div>
          </div>
        )}
      </TableContainer>
      <Dialog open={DetailsOpenDialog} onClose={handleCloseDialog}>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          <EmployeeDetails employee={selectedEmployee} />
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCloseDialog}>Close</MuiButton>
        </DialogActions>
      </Dialog>
      <SendEmailDialog open={OpenSendEmailDialog} handleClose={handleCloseSendEmailDialog} employeeEmail={employeeEmail} />
    </div>
  );
};

export default EmployeeList;

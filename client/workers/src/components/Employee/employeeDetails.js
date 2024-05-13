import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const EmployeeDetails = ({ employee }) => {
  const [open, setOpen] = React.useState(false);


  return (
    <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          right: 0,
          zIndex: 1000,
          width: '300px', // גודל רוחב הדיאלוג
        }}
      >
      </Box>

      {employee.gender === 'male' ? (
        <Avatar alt="Male Avatar" src="/path/to/male/avatar.jpg" />
      ) : (
        <Avatar alt="Female Avatar" src="/path/to/female/avatar.jpg" />
      )}

      <div>
        <h1>Employee Details</h1>
      </div>
      <div>
        <PersonIcon /> <span>First Name:</span> {employee.firstName}
      </div>
      <div>
        <PersonIcon /> <span>Last Name:</span> {employee.lastName}
      </div>
      <div>
        <AccessibilityIcon /> <span>Id:</span> {employee.id}
      </div>
      <div>
        <EventIcon /> <span>Start Date:</span> {employee.startDateWork}
      </div>
      <div>
        <GroupIcon /> <span>Status:</span> {employee.status ? 'Active' : 'Inactive'}
      </div>
      <div>
        <CalendarTodayIcon /> <span>BirthDate:</span> {employee.birthDate}
      </div>
      <div>
        <AccessibilityIcon /> <span>Gender:</span> {employee.gender}
      </div>
      {employee.roles && employee.roles.length > 0 && (
        <div>
          <GroupIcon /> <span>Job List:</span>
          <ul>
            {employee.roles?.map((job) => (
              <li key={job.role.id}>{job.role.nameRole}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;

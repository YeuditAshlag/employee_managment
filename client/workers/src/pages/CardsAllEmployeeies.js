import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

const CardsAllEmployees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:7000/api/Employee")
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }, []);

    return (
        <Grid container spacing={2}>
            {employees.map(employee => (
                <Grid item xs={12} sm={6} md={3} key={employee.id}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {employee.firstName.charAt(0)}
                                </Avatar>
                            }
                            title={`${employee.firstName} ${employee.lastName}`}
                            subheader={`Years of service: ${calculateYearsOfService(employee.startDateWork)}`}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={employee.image} // יש להחליף את השדה לתמונת העובד
                            alt={`${employee.firstName} ${employee.lastName}`}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Gender: {employee.gender === 1 ? 'Male' : 'Female'}<br />
                                Identity: {employee.identity}<br />
                                Status: {employee.status}<br />
                                Roles: {employee.roles.join(', ')}<br />
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="show more">
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>  {employee.roles?.map((job) => (
                                    <li key={job.role.id}>{job.role.nameRole}</li>
                                ))}</Typography>

                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

// פונקציה לחישוב מספר שנים של עובד בארגון
const calculateYearsOfService = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const years = today.getFullYear() - start.getFullYear();
    const monthDiff = today.getMonth() - start.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < start.getDate())) {
        return years - 1;
    }
    return years;
};

export default CardsAllEmployees;

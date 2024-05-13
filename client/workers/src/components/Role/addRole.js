

import React, { useEffect, useState } from 'react';
import { Button, FormControl, MenuItem, Select, Typography, InputLabel } from '@mui/material';
import { getAllRoles } from "../../utils/utilsRoles";


const AddRole = ({ setEmployeeEdit, employeeEdit }) => {

    console.log(employeeEdit)
    const [isAdding, setIsAdding] = useState(false);
    const [allRoles, setAllRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('')

    const fetchRoles = async () => {
        const all_roles = await getAllRoles();
        setAllRoles(all_roles);
    };

    const filterRolesOfEmployee = () => {
        // if (allRoles.length > 0) {
            employeeEdit.roles?.map((role) => {
                filterRoleById(+role.roleId)
            })
        // }
    }

    const filterRoleById = (id) => {
        const allRolesFilter = allRoles.filter(role => role.id !== id)
        setAllRoles(allRolesFilter)
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        if (allRoles.length > 0) {
            filterRolesOfEmployee();
        }
    }, [allRoles]);

    useEffect(() => {
        filterRolesOfEmployee()
    }, [isAdding])

    const handleChangeRole = (e) => {
        setSelectedRole(e.target.value)
        setEmployeeEdit({
            ...employeeEdit,
            roles: [
                ...employeeEdit.roles,
                {
                    roleId: +e.target.value.id,
                    role: e.target.value,
                    
                    startDateWork: new Date(),
                    ismanagerial: false
                }
            ]
        });

        filterRoleById(+e.target.value.id)

    };

    console.log(employeeEdit);
    console.log(allRoles);

    return (
        <>
            <Button onClick={() => setIsAdding(!isAdding)} variant="outlined" style={{ color: '#D32F2F' }}>
                {isAdding ? "Cancel" : "Add Role"}
            </Button>
            {isAdding &&
                <>
                    <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>

                        <InputLabel id="demo-controlled-open-select-label" >Roles</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            label="Selected Role"
                            defaultValue={selectedRole}
                            onChange={handleChangeRole}
                        >
                            {allRoles.map((role) => (
                                <MenuItem key={role.id} value={role} >{role.nameRole}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </>
            }
        </>
    );
};

export default AddRole;


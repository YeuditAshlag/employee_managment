import axios from "axios"
import * as actionNames from "./action"

const initialState = {
    employeeies: [],
    roles: [],
    user: null,
    UserId: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionNames.GET_EMPLOYEE: {

            return { ...state, employeeies: action.data }


        }

        case actionNames.ADD_EMPLOYEE: {
            return { ...state, employeeies: [...state.employeeies, action.data] }
        }

        case actionNames.EDIT_EMPLOYEE: {
            const updatedEmployee = action.data;
            const employeeIndex = state.employeeies.findIndex(emp => emp.Id === updatedEmployee.Id);
            if (employeeIndex !== -1) {
                const updatedEmployees = [...state.employeeies];
                updatedEmployees[employeeIndex] = {
                    ...updatedEmployees[employeeIndex],
                    FirstName: updatedEmployee.FirstName,
                    LastName: updatedEmployee.LastName,
                    Password:updatedEmployee.Password,
                    Identity:updatedEmployee.Identity,
                    Status: updatedEmployee.Status,
                    StartDateWork: updatedEmployee.StartDateWork,
                    BirthDate: updatedEmployee.BirthDate,
                    Gender: updatedEmployee.Gender,
                    Roles: updatedEmployee.Roles,
                };

                return {
                    ...state,
                    employeeies: updatedEmployees,
                };
            }
            return state;

        }

        // case actionNames.EDIT_EMPLOYEE: {
        //     const employees = [...state.employeeies];
        //     const findIndex = employees.findIndex(x => x.id === action.data.id);
        //     console.log(employees[findIndex]);
        //     employees[findIndex] = action.data;
        //     console.log(employees[findIndex]);
        //     return { ...state, employees }
        // }

        case actionNames.DELETE_EMPLOYEE: {
            const empId = action.data;
            const filteredEmployees = state.employeeies.filter((emp) => emp.Id !== empId);
            return { ...state, employeeies: filteredEmployees }
        }

        case actionNames.GET_ROLE: {

            const roles = action.data;
            state.roles = roles;
            return {
                ...state, roles: roles
            }
        }

        case actionNames.ADD_ROLE: {
            const addRole = action.data;
            return { ...state, roles: [...state.roles, addRole] }
        }


        case actionNames.EDIT_ROLE: {
            const rol = action.data;
            state.rol = rol;
            return { ...state, rol }

        }

        const initialState = {
            user: JSON.parse(localStorage.getItem('user'))
          };
          
          const UserReducer = (state = initialState, action) => {
            switch (action.type) {
              case actionNames.LOG_IN:
                return { ...state, user:  action.data};
              case actionNames.LOG_OUT:
                localStorage.removeItem('user');
                localStorage.removeItem('isDirector');
                return { ...state, user: null };
           default: return { ...state }; 
            }
          };

        default:
            return state;
    }
}

export default reducer;

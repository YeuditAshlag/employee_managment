import axios from "axios";

const url = "https://localhost:7000/api/Employee"

const getAllEmployeeies = async() => {
    const {data} = await axios.get(url)
    return data
}

const getEmployeeById = async(id) => {
    const {data} = await axios.get(`${url}/${id}`)
    return data
}

const addNewEmployee = async(employee) => {
    const {data} = await axios.post(url, employee)
    return data
}

const updateEmployee = async(employee) => {
    console.log('edit', employee);
    const {data} = await axios.put(`${url}/${employee.id}`, employee)
    console.log(data)
    return data
}


export {getAllEmployeeies, getEmployeeById, addNewEmployee, updateEmployee}
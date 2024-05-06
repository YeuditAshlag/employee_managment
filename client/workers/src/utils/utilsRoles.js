import axios from "axios";
const url = "https://localhost:7000/api/Role"


const getAllRoles = async() => {
    const {data} = await axios.get(url)
    return data
}

export {getAllRoles}
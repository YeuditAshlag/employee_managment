 import axios from "axios";

// import * as actionNames from '../redux/action'
// import Swal from "sweetalert2";
// const url='https://localhost:7000/api/Employee'

// export const logIn = (data, navigate) => {
    
//     return dispatch => {
//         axios.post(url+'/Login',  {Name:data.UserName,Password:data.Password })
//              .then((d) => {
//                 console.log(d.data)
//                 dispatch({ type: actionNames.LOG_IN, user: d.data })
//                 localStorage.setItem("user", JSON.stringify(d.data));
//                 const isDirector = d.data.roles.some(role => role.role.nameRole === "Director");
//                 localStorage.setItem("isDirector", isDirector ? "true" : "false");
//                 console.log(localStorage.getItem('isDirector'))
//                 navigate("/");
//                 Swal.fire({
//                     position: "top",
//                     title: d.data. firstName+ `שלום ל `,
//                     showConfirmButton: false,
//                     timer: 1500
//                 })
//                 setTimeout(function() {
//                      window.location.reload();
//                 }, 1300);
               
//             }).catch(() => {
//                // navigate("/SignIn", { state: data });
//                 Swal.fire({
//                     position: "top",
//                     title: ` אינך רשום במערכת  `,
//                     showConfirmButton: false,
//                     timer: 1500
//                 })
//             })
//     }

// }
// export const logOut = (navigate) => {
   
//     return dispatch => {
//         Swal.fire({
//             title: "Oops...",
//             showCancelButton: true,
//             showDenyButton: false,
//             confirmButtonText: "התנתק",
//             cancelButtonText: "ביטול",
//         }).then((r) => {
//             if (r.isConfirmed) {
//                 dispatch({ type: actionNames.LOG_OUT });
//                 Swal.fire({
//                     title: "By By:)", showConfirmButton: false,
//                     timer: 800
//                 });
//             }
//             navigate("/HomePage")

//         })
//     }
// }
// export const signIn = (data, navigate) => {
//     // alert("dldjdj")
//     return dispatch => {
//         axios.post(url, data)
//             .then((d) => {
//                 // alert("dldjdj")
//                 dispatch({ type: actionNames.LOG_IN, user: d.data.Id })
//                 Swal.fire({
//                     position: "top",
//                     title:  d.data.Name +`העובד נוסף בהצלחה`,
//                     showConfirmButton: false,
//                     timer: 1500
//                 }) 
//                 navigate("/");
//             }).catch(() => {
//                 //navigate('/Login');
//                 Swal.fire({
//                     position: "top",
//                     title: "עובד זה רשום במערכת !",
//                     showConfirmButton: false,
//                     timer: 1500
//                 })
//                 navigate("/HomePage")
//             });
//     }
// }

class LoginService{

    async login(username, password) {
        try {
            const response = await axios.post('https://localhost:7000/api/Auth', {
                userName: username,
                password: password
            });
            return response.data;
        } catch (error) {
            throw new Error('Login failed');
        }
    } 
}

export default new LoginService();
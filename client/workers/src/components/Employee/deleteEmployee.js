

import  { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const DeleteEmployee = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // הפקודה להצגת האישור על מחיקת העובד
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // אם המשתמש אישר את המחיקה, נשלח קריאה ל-API כדי למחוק את העובד
        axios.delete(`https://localhost:7000/api/Employee/${state}`, { data: { isDeleted: true } })
          .then((response) => {
            // הודעה כאשר המחיקה בוצעה בהצלחה
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            // נווט לדף הטבלה של EmployeeList
            navigate('/employee');
            console.log("Employee deleted successfully:", response.data);
          })
          .catch((error) => {
            // הודעת שגיאה במקרה של כישלון במחיקה
            Swal.fire({
              title: "Error!",
              text: "There was an error deleting the employee.",
              icon: "error"
            });
            console.error("Error deleting employee:", error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // אם המשתמש ביטל את הפעולה, נווט לדף הטבלה של EmployeeList
        navigate('/employee');
      }
    });
  }, [state, navigate]);

  return null; 
};

export default DeleteEmployee;

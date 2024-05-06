import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const nav=useNavigate()
  const onSubmit = (data) => {
    const { firstName, lastName, password } = data;
    axios.post("https://localhost:7103/api/Auth", { firstName, lastName, password })
      .then((response) => {
        console.log("enter successfully");
        sessionStorage.setItem('token', response.data.token);
        nav('All') // Assuming token is returned in response data
      })
      .catch((error) => {
        console.error("Error entering: ", error);
      });
  };

  return (
    <>
      {/* Assuming Header component is defined elsewhere */}

      <div className='all_login'>
        <br />
        <br />
        <br />
        <Form onSubmit={handleSubmit(onSubmit)} id="form">
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>שם פרטי</Form.Label>
            <Form.Control placeholder='שם פרטי' {...register("firstName")} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>שם משפחה</Form.Label>
            <Form.Control placeholder='שם משפחה' {...register("lastName")} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>סיסמא</Form.Label>
            <Form.Control type="password" placeholder='סיסמא' {...register("password")} />
          </Form.Group>
          <Button variant="outline-warning" type="submit">
            אישור
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;


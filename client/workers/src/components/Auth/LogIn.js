// import { useForm } from "react-hook-form"
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup"
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// //import { Button } from 'semantic-ui-react';
// import { logIn } from "../../Services/LoginService";
// const schema = yup
//     .object({
//         UserName: yup.string().required('שדה חובה'),
//         Password: yup.string().required('שדה חובה').min(3, 'סיסמא חייבת להכיל לפחות 3 ספרות'),
//     })
//     .required()
// export default function App() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors }
//     } = useForm({
//         resolver: yupResolver(schema),
//     })
//     const onSubmit = (data) => {
//         dispatch(logIn(data, navigate));
//     };
//     return <> <div id="container">
//         <div id="form" class="ui placeholder segment">
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div class="ui one column very relaxed stackable grid">
//                     <div class="column">
//                         <div class="ui form">
//                             <div class="field">
//                                 <label>שם משתמש:</label>
//                                 <div class="ui rigth icon input">
//                                     <i class="user icon"></i>
//                                     <input placeholder="הכנס שם משתמש"{...register("UserName")} />
//                                 </div>
//                                 {errors.UserName && <p class="ui pointing red basic label">{errors.UserName?.message}</p>}
//                             </div>
//                             <div class="field">
//                                 <label>סיסמא:</label>
//                                 <div class="ui rigth icon input">
//                                     <i class="lock icon"></i>
//                                     <input type="password" placeholder="הכנס סיסמא" {...register("Password")} />
//                                 </div>
//                                 {errors.Password && <p class="ui pointing red basic label">{errors.Password?.message}</p>}
//                             </div>
//                             <button class="ui blue submit button" type="submit">התחברות</button>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>

//     </div>
//         {/* <div id="container">
//             <Link to='/SignIn' style={{ color: npm start"rgb(179 64 119)" }}> -אינך רשום??? לחץ להרשמה- </Link>
//         </div> */}
//     </>
// }
import * as React from 'react';
import { Lock } from '@mui/icons-material';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, createTheme, ThemeProvider } from '@mui/material';
import LoginService from '../../Services/LoginService';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

 const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await LoginService.login(username, password);
      localStorage.setItem('token', response.token); // שמירת הטוקן ב־localStorage

      console.log("login:", response);
      navigate('/employee');

    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login failure here, e.g., show error message to user
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '50%',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ height: '100%', width: '50%' }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' ,backgroundColor:'#D32F2F'}}>
              <Lock />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
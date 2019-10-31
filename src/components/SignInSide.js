import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LOGIN_USER from '../Mutations/loginUser'
import CREATE_USER from '../Mutations/createUser'
import { useMutation } from '@apollo/react-hooks';

import { toast } from 'react-toastify';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.mustafaanas.com/">
        Mustafa Anas
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide({ setTokenFromApp }) {
  const _token = localStorage.getItem('token')
  const classes = useStyles();

  // Login hooks
  const [ token, setToken ] = useState(_token)
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ mobile, setMobile ] = useState('')
  const [ password, setPassword ] = useState('')
  
  const [sign, setSign] = useState('login')

  const [isLoading, setLoading] = useState(false)

  
  const [ loginUser, { loading, error }] = useMutation(
    LOGIN_USER,
    {
      onCompleted: data => {
        console.log('LOGIN COMPLETED')
        const { loginUser } = data
        localStorage.setItem('token', loginUser)
        setToken(loginUser)
        setTokenFromApp(loginUser)
        setLoading(false) 
        console.log(loginUser)
      }
    }
  )

  if(error) console.log('check error', error)

  //Signup hooks
  const [ createUser ] = useMutation(
    CREATE_USER,
    {
      onCompleted: data => {
        const { createUser } = data
        data !== null ? toast('Successfully created! now you can go sign in 🚀 ') : toast('sorry something went wrong')
        console.log(createUser)
        setSign('login')
      }
    }
  )

  const SignIn = async (e) => {
    e.preventDefault()
    console.log(mobile, password)
    await loginUser({ 
      variables: { mobile: mobile, password: password },
    })
    console.log('Signin function finished')
  }

  const SignUp = async (e) => {
    e.preventDefault()
    await createUser({ 
      variables: { name: name, email: email, mobile: mobile, password: password },
    })
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleMobileChange = (e) => {
    setMobile(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
      return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {
              sign === 'login' ? (
                <form className={classes.form} noValidate onSubmit={(e) => SignIn(e)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="mobile"
                label="Mobile No."
                name="mobile"
                autoComplete="mobile"
                autoFocus
                onChange={(e) => handleMobileChange(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handlePasswordChange(e)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
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
                  <Link href="#" variant="body2" onClick={() => setSign('signup')}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
              ) : (
                <form className={classes.form} noValidate onSubmit={(e) => SignUp(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        onChange={(e) => handleNameChange(e)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => handleEmailChange(e)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="mobile"
                        label="Mobile No."
                        name="mobile"
                        autoComplete="mobile"
                        autoFocus
                        onChange={(e) => handleMobileChange(e)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => handlePasswordChange(e)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        value="Sign Up"
                    >
                    Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => setSign('login')}>
                            {"Have an account already? Login!"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </form>
              )
            }
          </div>
        </Grid>
      </Grid>
      )
  
}
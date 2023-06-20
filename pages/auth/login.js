import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import {useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react'
import Router from 'next/router';
import Link from 'next/link';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//
  const handleSetEmail = (emailText) => {
    setEmail(emailText.target.value);
  };

  const handleSetPassword = (passwordText) => {
    setPassword(passwordText.target.value);
  };

  // need to change to go to sign up page
  const signUpHandler = async () => {
    Router.push("/auth/signup")
  };

  const handleSubmit = async(e) => {
    // validate user information
    e.preventDefault()
    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    })
    if (res.ok) Router.push(`../dash-volunteer`)
    else {
      alert("Email or password is incorrect. Please try again")
      console.log(`something went wrong: ${res.error}`)
    }
  }

    return (
        <Grid2 container className="auth-bg" justifyContent="center" textAlign="center" direction="column"
            sx={{
                width: '100vw',
                height: '100vh',
            }}>
            <Grid2 sx={{
                marginTop: '25px',
                width: '100%',
                height: '25%',
            }}>
                <Image className="auth-logo" src="/logo-long.png" width={956*0.3} height={295*0.3} alt="ALP-logo" sx={{
                        marginBottom: "10 !important",
                }}/>
                <h2 className='auth-heading'> Volunteer Portal Login </h2>
            </Grid2>
            <Grid2>
                <Grid2 xs display="flex" justifyContent="center">
                    <Box
                        sx={{
                            width: 300,
                            height: 300,
                        }}>
                        <TextField fullWidth required id="email" label="Email" variant="outlined" 
                            value={email}
                            onChange={handleSetEmail}
                            sx={{
                                mt: 2,
                                mb: 2
                            }}/>
                        <TextField fullWidth 
                            required id="password" label="Password" variant="outlined" 
                            value={password} onChange={handleSetPassword}
                            sx={{
                                mt: 2,
                                mb: 2
                            }}/>
                        <Button variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                marginTop: 3,
                            }}>Login</Button>
                        <Button variant="contained"
                            onClick={signUpHandler}
                            sx={{
                                marginTop: 3,
                                marginLeft: 3,
                            }}>Sign Up</Button>
                    </Box>

                </Grid2>
                <Link href='resetpassword'>Forgot Password?</Link>
            </Grid2>
        </Grid2>
    )
}

export default Login;

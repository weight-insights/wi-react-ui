import { Typography, Button, TextField, Grid, Box, Link } from '@mui/material';
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { signIn, signUp } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/userSlice';


export default function SignInUp({ isSignIn }: { isSignIn: boolean; }): ReactElement {

    const dispatch = useDispatch();


    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUserName] = useState<string>("");
    const navigate = useNavigate();

    
    function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
        setPassword(e.target.value);
    }

    function handleUserNameChange(e: ChangeEvent<HTMLInputElement>): void {
        setUserName(e.target.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        if (email && password && isSignIn) {
            console.log('email', email);
            console.log('password', password);

            signIn(email, password)
            .then((response) => {
                console.log('response status', response.status, typeof response.status);
                if (response.status >= 400) {
                    throw new Error('Failed to authenticate user');
                }
                return response.json();
            })
            .then((body: any) => {
                const accessToken = body.accessToken;
                dispatch(authenticate(accessToken));
                navigate('/');
                
            })
            .catch((error) => {
                console.log('error:', error);
            });
        } else {
            const name = username ? username : email;
            signUp(email, password, name).then(() => navigate('/sign-in'));
        }
    }

        

    

  return (
    <>
    <form noValidate onSubmit={handleSubmit}>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", alignContent: "center", flexDirection: "column", margin: "auto", width: "300px", height: "100vh", maxHeight: "100vh"}}>
            <div style={{display: "flex", flexWrap: "wrap", alignContent: "flex-start", margin: "10px", height: "50px", width: "226px"}}>
                <Typography>{isSignIn? 'Sign In' : 'Sign Up'} </Typography>
            </div>
            <div style={{margin: "10px"}}>
                <Typography>Email</Typography>
                <TextField required id="email" label="Required" value = {email} onChange= {handleEmailChange} variant="outlined" />
            </div>
            <div style={{margin: "10px"}}>
                    <Typography>Password</Typography>
                <TextField required id="password" label="Required" value ={password} onChange= {handlePasswordChange} variant="outlined" />
            </div>
            <div style={{margin: "10px"}}>
                {isSignIn ? 
                <Button type="submit" variant="contained">Sign In</Button> :
                <Box>
                    <Typography>Username</Typography>
                    <TextField required id="username" value ={username} onChange = {handleUserNameChange} variant="outlined" />
                </Box> 
            }
            </div>
            <div style={{margin: "10px"}}>
                {isSignIn ?
                <Box>
                    <Typography>Not Registered?</Typography>
                    <Link component="button" variant="body2" onClick={() => navigate('/sign-up')}>Sign Up</Link>
                </Box>  :
                <Button type="submit" variant="contained">Sign Up</Button>}
            </div>
        </div>
    </form>
    
    </>
  );
}


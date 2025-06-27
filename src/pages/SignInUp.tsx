import { Typography, Button, TextField, Grid, Box, Link } from '@mui/material';
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { signIn, signUp } from '../services/user.service';
import { useNavigate } from 'react-router-dom';


export default function SignInUp({ login, logout, isSignIn }: { login: () => void; logout: () => void; isSignIn: boolean; }): ReactElement {

    logout();


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

        if(email && password && isSignIn) {
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
                localStorage.setItem('accessToken', accessToken);
                console.log(localStorage.getItem('accessToken'));
                login();
                navigate('/');
                
            })
            .catch((error) => {
                console.log('error:', error);
            });
        } else {
            const name = username ? username : email;
            signUp(email, password, name);
        }


        
    }

        

    

  return (
    <>
    <Grid container display="flex" justifyContent="center" alignItems="center" direction="column" spacing={5} style={{minHeight: "100vh"}}>
        
        <form noValidate onSubmit={handleSubmit}>
            <Grid item>
                <Typography>{isSignIn? 'Sign In' : 'Sign Up'} </Typography>
            </Grid>

            <Grid item>
                <Typography>Email</Typography>
                <TextField required id="email" label="Required" value = {email} onChange= {handleEmailChange} variant="outlined" />
            </Grid>

            <Grid item>
                <Typography>Password</Typography>
            

                <TextField required id="password" label="Required" value ={password} onChange= {handlePasswordChange} variant="outlined" />
            </Grid>
      
            <Grid item>
                {isSignIn ? 
                <Button type="submit" variant="contained">Sign In</Button> :
                <Box>
                    <Typography>Username</Typography>
                    <TextField required id="username" value ={username} onChange = {handleUserNameChange} variant="outlined" />
                </Box> 
                }
            </Grid>

            <Grid item>
                {isSignIn ?
                <Box>
                    <Typography>Not Registered?</Typography>
                    <Link component="button" variant="body2" onClick={() => navigate('/sign-up')}>Sign Up</Link>
                </Box>  :
                <Button type="submit" variant="contained">Sign Up</Button>}
            </Grid>

        </form>
        
    </Grid>
      
    </>
  );
}


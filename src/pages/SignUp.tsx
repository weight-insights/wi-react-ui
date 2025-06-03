import { Typography, Button, TextField, Grid } from '@mui/material';
import { useState } from "react";
import { signIn } from '../services/user.service';


export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setPassword(e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        if(email && password) {
            console.log('email', email);
            console.log('password', password);

            signIn(email, password)
                .then((response) => response.json()
                .then((body: any) => {
                    const accessToken = body.accessToken;
                    localStorage.setItem('accessToken', accessToken);
                    setTimeout(() => {
                        console.log(localStorage.getItem('accessToken'));
                    }, 20000);
                }))
                .catch(error => console.error('error', error));
        }
        
    }

        

    

  return (
    <>
    <Grid container display="flex" justifyContent="center" alignItems="center" direction="column" spacing={3} style={{minHeight: "100vh"}}>
        
        <form noValidate onSubmit={handleSubmit}>
            <Grid item>
                <Typography>SignUp</Typography>
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
                <Typography>Username</Typography>
                <TextField required id="username" variant="outlined" />
            </Grid>

            <Grid item>
                <Button type="submit" variant="contained">Sign Up</Button>
            </Grid>

        </form>
        
    </Grid>
      
    </>
  );
}


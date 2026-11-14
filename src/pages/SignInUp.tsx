import { Typography, Button, TextField, Grid, Box, Link, Alert, Divider, Paper, Stack } from '@mui/material';
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
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

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
        setError('');

        const EmailSinNada = email.trim();
        if (!EmailSinNada || !password.trim()){
            setError('Email y password son requeridos hijodeputa asi que pon o TE MATO')
        }

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
    <Box
        sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
            py:4
        }}
        >
        <Paper
                variant = "outlined"
                sx = {{
                width: '100%',
                maxWidth:420,
                borderRadius:2,
                overflow: 'hidden'
            }}
        >
            <Box sx = {{ py:2, textAlign: 'center'}}>
                <Typography variant="h6" fontWeight={700}>
                    Welcome to Weight Insights
                </Typography>
            </Box>
            <Divider />

            <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx = {{ p: {xs:3, sm:4 } }}
            >
                <Stack spacing = {2.5}>
                    <Typography variant = "h4" fontWeight = {600}>
                        {isSignIn ? 'Sign In' : 'Sign Up'}
                    </Typography>
                    {error && <Alert severity = "error">{error}
                        </Alert>}

                        <TextField
                        fullWidth
                        required
                        label = "Email"
                        type = 'email'
                        autoComplete = 'email'
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        />
                        <TextField
                        fullWidth
                        required
                        label = "Password"
                        type = "password"
                        autoComplete = { isSignIn ? 'current-password' : 'new-password'}
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        />


                        {!isSignIn && (
                            <TextField
                            fullWidth
                            label = "Username"
                            value = {username}
                            onChange = {(e) => setUserName(e.target.value)}
                            />

                        )}
                        <Button
                        type="submit"
                        variant = "contained"
                        size = "large"
                        disabled = {loading}
                        >
                            {loading ? 'please wait...' : isSignIn ? 'Sign In' : 'Sign Up'}
                            </Button>
                        
                        {isSignIn && (
                            <Box sx = {{ textAlign: 'center'}}>
                                <Typography
                                variant= "body2">
                                    Do not have an account?
                                </Typography>
                                <Link component = "button"
                                type = "button"
                                onClick = {() => navigate( '/sign-up')}
                                >
                                    Sign Up
                                </Link>



                            </Box>
                        )}

                </Stack>
            </Box>
            
        </Paper>
        </Box>
  );
}

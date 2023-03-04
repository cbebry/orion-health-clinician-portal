import React, { useState, useContext, FormEvent } from "react";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthenticationContext } from '../providers/Authentication';
import { apiLogin } from '../api/ApplicationAPI';

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthenticationContext);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await apiLogin(username, password);
    const resultBody = await result.json();
    if (result.status === 200) {
      await login(resultBody);
    } else {
      setError(resultBody.errorMessage);
    }
    setIsLoading(false);
  }


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h1">
            Clinical Portal
          </Typography>
          <Typography variant="h2">
            Sign In
          </Typography>
          {
            error &&
              <Alert severity="error">{error}</Alert>
          }
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth={true}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            fullWidth={true}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </Box>
      </form>
      <Backdrop
        sx={{ color: '#fff' }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

import React, { useState, useContext, FormEvent } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthenticationContext } from '../providers/Authentication';
import { apiLogin } from '../api/ApplicationAPI';

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthenticationContext);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('username: ', username, ' password: ', password);
    const result = await apiLogin(username, password);
    console.log('fetch done', result);
    const resultBody = await result.json();
    console.log('body', resultBody);
    if (result.status === 200) {
      await login(resultBody);
    } else {
      // TODO show user error message
      console.error(resultBody.errorMessage);
    }
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
          sx={{
            width: 600,
            height: 300
          }}
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
    </Box>
  );
};

import React, { useState } from 'react';
import { TextField, Button, Box, Container, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { PageHeader } from '../../components/PageHeader';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Basic Validation Logic
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormInvalid = !isEmailValid || !isPasswordValid;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PageHeader
        title="התחברות למערכת"
      />        
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="אימייל"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email !== '' && !isEmailValid}
            helperText={email !== '' && !isEmailValid ? "Enter a valid email" : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="סיסמה"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={password !== '' && !isPasswordValid}
            helperText={password !== '' && !isPasswordValid ? "Password must be 6+ characters" : ""}
          />

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isFormInvalid}
          >
            התחבר
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
import { useState } from "react";
import {
  TextField, Button, Box, Container, Alert, CircularProgress,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { PageHeader } from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormInvalid = !isEmailValid || !isPasswordValid;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // --- השינוי כאן: מעבר למסך אדמין אחרי התחברות ---
        navigate("/admin");
      })
      .catch((err) => {
        const errorMessage = err instanceof Error ? err.message : "Login failed";
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <PageHeader title="כניסה למערכת הניהול" />
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal" required fullWidth label="אימייל" autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            error={email !== "" && !isEmailValid}
          />
          <TextField
            margin="normal" required fullWidth label="סיסמה" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            error={password !== "" && !isPasswordValid}
          />

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Button
            type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
            disabled={loading || isFormInvalid}
          >
            {loading ? <CircularProgress size={24} /> : "התחבר"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
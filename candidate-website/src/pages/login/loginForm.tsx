import { useState } from "react";
import {
  TextField, Button, Box, Container, Alert, CircularProgress
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { PageHeader } from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  // --- States (רק מה שצריך להתחברות) ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Validation ---
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormInvalid = !isEmailValid || !isPasswordValid;

  // --- Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ניסיון התחברות בלבד
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err: any) {
      console.error(err);
      let errorMessage = "ההתחברות נכשלה";

      // טיפול בשגיאות נפוצות בהתחברות
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        errorMessage = "אימייל או סיסמה שגויים";
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = "יותר מדי ניסיונות כושלים, נסה שוב מאוחר יותר";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <PageHeader title="כניסה למערכת" />

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>

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
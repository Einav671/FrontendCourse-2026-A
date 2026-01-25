import { useState } from "react";
import {
  TextField, Button, Box, Container, Alert, CircularProgress, Typography, Link, Fade
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { createUser } from "../../firebase/usersService";
import { PageHeader } from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  // --- States ---
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // שדות הרשמה
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // סטטוסים
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // הוספתי סטייט להודעת הצלחה
  const [loading, setLoading] = useState(false);

  // --- Validation ---
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  const isPasswordValid = password.length >= 6;
  const isStrongPassword = passwordRegex.test(password);
  const doPasswordsMatch = password === confirmPassword;

  const isFormInvalid = isLogin
    ? !isEmailValid || !isPasswordValid
    : !isEmailValid || !isStrongPassword || !fullName || !doPasswordsMatch;

  // --- Handlers ---

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess(""); // איפוס הודעת הצלחה במעבר
    setLoading(false);
    if (isLogin) {
      setFullName("");
      setConfirmPassword("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        // --- התחברות (Login) ---
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/admin");
      } else {
        // --- הרשמה (Sign Up) ---

        const userForDB = {
          email: email,
          fullName: fullName,
          userType: 'מועמד'
        };

        await createUser(email, password, userForDB);

        // --- השינוי כאן: במקום לנווט, אנחנו מציגים הצלחה ועוברים ללוגין ---
        setSuccess("ההרשמה בוצעה בהצלחה! אנא התחבר עם הפרטים החדשים.");
        setIsLogin(true); // מעבר למסך התחברות
        setPassword(""); // ניקוי סיסמה
        setConfirmPassword("");
        // אנו משאירים את האימייל כדי שיהיה נוח למשתמש
      }
    } catch (err: any) {
      console.error(err);
      let errorMessage = "הפעולה נכשלה";

      if (err.code === 'auth/email-already-in-use') {
        errorMessage = "כתובת האימייל כבר קיימת במערכת";
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        errorMessage = "אימייל או סיסמה שגויים";
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
        <PageHeader title={isLogin ? "כניסה למערכת" : "הרשמה למערכת"} />

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>

          {/* הודעת הצלחה (תופיע רק אחרי הרשמה מוצלחת) */}
          {success && (
            <Fade in={!!success}>
              <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
            </Fade>
          )}

          {!isLogin && (
            <TextField
              margin="normal" required fullWidth label="שם מלא"
              value={fullName} onChange={(e) => setFullName(e.target.value)}
            />
          )}

          <TextField
            margin="normal" required fullWidth label="אימייל" autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            error={email !== "" && !isEmailValid}
          />

          <TextField
            margin="normal" required fullWidth label="סיסמה" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            error={password !== "" && (isLogin ? !isPasswordValid : !isStrongPassword)}
            helperText={!isLogin && "לפחות 6 תווים, אותיות ומספרים"}
          />

          {!isLogin && (
            <TextField
              margin="normal" required fullWidth label="אימות סיסמה" type="password"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPassword !== "" && !doPasswordsMatch}
              helperText={confirmPassword !== "" && !doPasswordsMatch ? "הסיסמאות אינן תואמות" : ""}
            />
          )}

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Button
            type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
            disabled={loading || isFormInvalid}
          >
            {loading ? <CircularProgress size={24} /> : (isLogin ? "התחבר" : "הירשם")}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="body2">
              {isLogin ? "אין לך עדיין משתמש? " : "כבר יש לך משתמש? "}
              <Link component="button" type="button" variant="body2" onClick={handleSwitchMode}>
                {isLogin ? "הירשם כאן" : "התחבר כאן"}
              </Link>
            </Typography>
          </Box>

        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
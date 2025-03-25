"use client";
import * as React from "react";
import { LoadingButton } from '@mui/lab';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { Snackbar } from "@mui/material";
import { useState } from "react";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));


export default function SignIn() {
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const isValid = validateInputs();
    if (!isValid) return;

    setLoading(true); // Start loading
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    try {
      const token = localStorage.getItem("token"); 
      console.log(token)
      const response = await fetch(`/api/v1/admin`, {
        method:"POST",
        headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
      // localStorage.clear()
      
        // Daha sonra, token'i manuel olarak ekleyip sayfaya yönlendirme yapabilirsin
        const token = localStorage.getItem('token');
        router.push(`/dashboard?token=${token}`);
      }
       else {
        setSnackbarMessage("Kullanıcı adı veya şifre hatalı!");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.log(error)
      setSnackbarMessage("Bir hata oluştu, lütfen tekrar deneyin.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
 
  const validateInputs = () => {
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    let isValid = true;

    if (!username.value) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter a valid username.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password.value || password.value.length < 4) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <div>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField
                  error={usernameError}
                  helperText={usernameErrorMessage}
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  autoComplete="username"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={usernameError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <LoadingButton
                type="submit"
                fullWidth
                variant="outlined"
                loading={loading}
              >
                Sign in
              </LoadingButton>
            </Box>
          </Card>
        </SignInContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Input from "../Common/Input";
import { toast } from "react-toastify";
import {
  Stack,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoginFormLoginPage, LoginButton } from "../Common/GlobalWrapper";
import { submitLogin } from "../ReduxSlice/LoginSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [logIn, setLogIn] = useState({
    email: "",
    password: "",
    error: {
      email: "",
      password: "",
    },
  });
  const { status, access_token, error } = useSelector((state) => state.login);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [flip, setFlip] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleLogInChange = (e) => {
    const { name, value } = e.target;
    setLogIn((prevLogIn) => ({
      ...prevLogIn,
      [name]: value,
    }));
  };
  const isPasswordValid = (password) => {
    // Define your password validation criteria here
    const minLength = 8;
    const containsLetter = /[a-zA-Z]/.test(password);
    const containsNumber = /\d/.test(password);
    // You can add more criteria as needed

    return (
      password.length >= minLength && containsLetter && containsNumber
      // Add more conditions as needed
    );
  };
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setRememberMe(event.target.checked);
  };
  const handleLoginValidation = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(value)) {
          setLogIn((prevData) => ({
            ...prevData,
            error: {
              ...prevData.error,
              email: "invalid email",
            },
          }));
        } else {
          setLogIn((prevData) => ({
            ...prevData,
            error: {
              ...prevData.error,
              email: "",
            },
          }));
        }
        break;
      case "password":
        if (!isPasswordValid(value)) {
          setLogIn((prevData) => ({
            ...prevData,
            error: {
              ...prevData.error,
              password: "Invalid password",
            },
          }));
        } else {
          setLogIn((prevData) => ({
            ...prevData,
            error: {
              ...prevData.error,
              password: "",
            },
          }));
        }
        break;
      default:
        break;
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = logIn;

    // Validate the fields
    handleLoginValidation("email", email);
    handleLoginValidation("password", password);

    // Check if there are any errors in the signUp state
    if (!logIn.error.name && !logIn.error.email && !logIn.error.password) {
      const formData = {
        email: logIn.email,
        password: logIn.password,
      };
      // Dispatch the action to submit the signUp data

      dispatch(submitLogin(formData));
    }
  };
  useEffect(() => {
    if (status === "success") {
      console.log("in");
      localStorage.setItem("token", access_token);
      localStorage.setItem("loggedIn", rememberMe);
      navigate("/");
    }
    if (error != null) {
      console.log("in");
      toast.error(error.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [status, access_token, navigate, error]);

  return (
    <LoginFormLoginPage>
      <Grid sx={{ p: 4 }}>
        <Typography variant="h4" color="white">
          Login
        </Typography>
        <Stack gap={3} my={1}>
          <Input
            placeholder="Email"
            type="email"
            color="white"
            name="email"
            value={logIn.email}
            onChange={handleLogInChange}
            onValidate={handleLoginValidation}
            error={Boolean(logIn.error.email)}
            helperText={logIn.error.email}
          />
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            handleClickShowPassword={handleClickShowPassword}
            showPassword={showPassword}
            color="white"
            name="password"
            value={logIn.password}
            onChange={handleLogInChange}
            onValidate={handleLoginValidation}
            error={Boolean(logIn.error.password)}
            helperText={logIn.error.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleChange}
                style={{
                  color: "white",
                }}
              />
            }
            label="Remember me?"
            sx={{
              color: "white",
            }}
          />
        </Stack>
        <LoginButton onClick={handleLogin}>Login</LoginButton>
        <Typography
          variant="p"
          display="flex"
          justifyContent="flex-end"
          color="white"
        >
          Forgot Password?
        </Typography>
        <Typography
          color="white"
          fontSize={15}
          mt={2}
          textAlign="center"
          display="none"
          sx={{
            "@media(max-width: 1200px)": {
              display: "block",
            },
          }}
        >
          Already Have an Account?
          <Typography
            component="span"
            color="white"
            fontWeight="bold"
            fontSize={15}
            marginLeft={1}
            onClick={() => setFlip(!flip)}
          >
            sign In
          </Typography>
        </Typography>
      </Grid>
    </LoginFormLoginPage>
  );
};
export default Login;

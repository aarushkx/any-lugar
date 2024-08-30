import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    FormControlLabel,
    Checkbox,
    Link,
} from "@mui/material";
import { Footer } from "../components/index.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice.js";
import { AUTH_API_ENDPOINT } from "../constants.js";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { email, password } = formData;
            const response = await axios.post(
                `${AUTH_API_ENDPOINT}/login`,
                { email, password },
                { withCredentials: true }
            );

            const userData = response.data;
            dispatch(login(userData));
            navigate("/trips");
        } catch (error) {
            setError(
                error.response?.data?.error || "An error occurred during login"
            );
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 4,
                    }}
                >
                    <Typography color="primary" component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleLogin}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="johndoe@me.com"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            required
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={rememberMe}
                                    onChange={handleRememberMeChange}
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Log in
                        </Button>
                        <Typography
                            component="p"
                            variant="body2"
                            align="center"
                            sx={{ mb: 2 }}
                        >
                            Don't have an account?{" "}
                            <Link
                                sx={{ cursor: "pointer" }}
                                underline="hover"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </Link>
                        </Typography>
                        {error && (
                            <Typography
                                color="error"
                                variant="body2"
                                align="center"
                            >
                                {error}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Container>
            <Footer />
        </>
    );
}

export default Login;

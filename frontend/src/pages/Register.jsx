import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { AUTH_API_ENDPOINT } from "../constants.js";
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
import { login } from "../features/authSlice.js";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
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

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { name, email, password } = formData;
            const response = await axios.post(
                `${AUTH_API_ENDPOINT}/register`,
                {
                    name,
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            const userData = response.data;

            dispatch(login(userData));
            navigate("/trips");
        } catch (error) {
            setError(
                error.response?.data?.error ||
                    "An error occurred during registration."
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
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box
                        method="POST"
                        component="form"
                        onSubmit={handleRegister}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            required
                        />
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
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Typography
                            component="p"
                            variant="body2"
                            align="center"
                            sx={{ mb: 2 }}
                        >
                            Already have an account?{" "}
                            <Link
                                sx={{ cursor: "pointer" }}
                                underline="hover"
                                onClick={() => navigate("/login")}
                            >
                                Log in
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
};

export default Register;

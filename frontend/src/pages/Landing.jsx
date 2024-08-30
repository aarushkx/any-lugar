import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/index.js";

function Landing() {
    const navigate = useNavigate();

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "80vh",
            }}
        >
            <Box sx={{ mt: 12 }}>
                <Typography textAlign={"center"} variant="h4">
                    Welcome to
                </Typography>
                <Typography
                    textAlign={"center"}
                    color="primary"
                    variant="h2"
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    AnyLugar
                </Typography>
                <Typography
                    textAlign={"center"}
                    variant="h6"
                    sx={{ mt: 2, mb: 4 }}
                >
                    Plan your trip effortlessly with AI powered suggestions and
                    everything you need in one place.
                </Typography>
            </Box>

            <Box>
                <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    sx={{ mr: 1 }}
                >
                    Login
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => navigate("/register")}
                >
                    Register
                </Button>
            </Box>
            <Footer />
        </Container>
    );
}

export default Landing;

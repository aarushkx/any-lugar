import React from "react";
import { Container, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
            <Typography sx={{ mt: 16, mb: 4 }} color="error" variant="h4">
                404 - Page Not Found
            </Typography>
            <Typography sx={{ mb: 4 }} variant="h6">
                Oops! Looks like you’ve taken a detour. The page you’re looking
                for isn’t here.
            </Typography>
            <Typography variant="h6">
                Let's go back to your{" "}
                <Link
                    sx={{ cursor: "pointer" }}
                    underline="hover"
                    onClick={() => navigate("/trips")}
                >
                    Trips
                </Link>
            </Typography>
        </Container>
    );
}

export default NotFoundPage;

import React from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import { Loading } from "../components/index.js";

function LoadingPage() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                bgcolor: "background.default",
            }}
        >
            <Loading />
        </Box>
    );
}

export default LoadingPage;

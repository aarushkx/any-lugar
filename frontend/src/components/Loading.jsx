import React from "react";
import { Container, Box, CircularProgress } from "@mui/material";

function Loading() {
    return (
        <Box
            sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
            }}
        >
            <CircularProgress />
        </Box>
    );
}

export default Loading;

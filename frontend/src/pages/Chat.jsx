import React from "react";
import { Typography, Container, Box } from "@mui/material";
import { Loading } from "../components";

function Chat() {
    return (
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
                    AI Chatbot
                </Typography>
                <Box sx={{ mt: 1 }}></Box>
            </Box>
            <Loading />
        </Container>
    );
}

export default Chat;

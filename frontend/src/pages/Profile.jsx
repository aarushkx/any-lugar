import React, { useState } from "react";
import { Container, Box, Button, Toolbar } from "@mui/material";
import EditProfileModal from "../components/Modal/EditProfileModal";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

function Profile() {
    const user = useSelector((state) => state.auth.userData);

    const [open, setOpen] = useState(false);

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
                <Typography
                    color="primary"
                    component="h1"
                    variant="h5"
                    sx={{ mb: 4 }}
                >
                    Your Profile
                </Typography>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    {user.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {user.email}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => setOpen(true)}
                >
                    Edit Profile
                </Button>
            </Box>
            <EditProfileModal open={open} handleClose={() => setOpen(false)} />
        </Container>
    );
}

export default Profile;

import React from "react";
import { Logo, LogoutButton } from "../index.js";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    return (
        <Box sx={{ flexGrow: 1, mb: 8 }}>
            <AppBar position="fixed">
                <Toolbar>
                    {" "}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Logo />
                    </Typography>
                    {authStatus && <LogoutButton />}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;

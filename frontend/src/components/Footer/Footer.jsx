import React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

function Footer() {
    return (
        <Container
            sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: "1rem 0",
                textAlign: "center",
                zIndex: 9999,
            }}
        >
            <Typography variant="body2" color="textSecondary">
                &copy; {new Date().getFullYear()} AnyLugar. All rights reserved.
            </Typography>
        </Container>
    );
}

export default Footer;

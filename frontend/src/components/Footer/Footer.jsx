import React from "react";
import Typography from "@mui/material/Typography";
// import { Container } from "../index.js"
import { Container } from "@mui/material";

function Footer() {
    return (
        <Container
            sx={{
                // backgroundColor: "#202020",
                // borderTop: "1px solid #404040",
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: "1rem 0",
                textAlign: "center",
            }}
        >
            <Typography variant="body2" color="textSecondary">
                &copy; {new Date().getFullYear()} AnyLugar. All rights reserved.
            </Typography>
        </Container>
    );
}

export default Footer;

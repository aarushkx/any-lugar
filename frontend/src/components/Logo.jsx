import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import LogoIcon from "../assets/Logo.svg";

function Logo() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const handleClick = () => {
        if (authStatus) {
            navigate("/trips");
        } else {
            navigate("/");
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 130,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
            }}
            onClick={handleClick}
        >
            <img
                src={LogoIcon}
                alt="Logo"
                style={{
                    width: 25,
                    height: "auto",
                    marginRight: 5,
                }}
            />
            <Typography
                variant="h6"
                color="primary"
                noWrap
                sx={{
                    fontWeight: 600,
                }}
            >
                AnyLugar
            </Typography>
        </Box>
    );
}

export default Logo;

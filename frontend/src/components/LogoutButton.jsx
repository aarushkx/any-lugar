import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice.js";
import { AUTH_API_ENDPOINT } from "../constants.js";
import axios from "axios";

function LogoutButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            await axios.post(
                `${AUTH_API_ENDPOINT}/logout`,
                {},
                { withCredentials: true }
            );

            dispatch(logout());
            navigate("/login");
        } catch (error) {
            window.alert("Logout failed. Please try again.");
        }
    };
    return (
        <Button onClick={handleLogout} type="submit" color="inherit">
            Log out
        </Button>
    );
}

export default LogoutButton;

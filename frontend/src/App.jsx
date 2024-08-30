import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Header, BottomNavbar, Loading } from "./components/index.js";
import { Outlet } from "react-router-dom";
import { AUTH_API_ENDPOINT } from "./constants.js";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#a688fa",
        },
        background: {
            default: "#181818",
            paper: "#181818",
        },
    },
});

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(
                    `${AUTH_API_ENDPOINT}/current-user`,
                    {
                        withCredentials: true,
                    }
                );

                const userData = response.data;

                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.log("Error fetching current user:", error.message);
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, [dispatch]);

    return !loading ? (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header />
            <BottomNavbar />
            <main>
                <Outlet />
            </main>
        </ThemeProvider>
    ) : (
        <>
            <CssBaseline />
            <ThemeProvider theme={darkTheme}>
                <Loading />
            </ThemeProvider>
        </>
    );
}

export default App;

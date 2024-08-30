import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import FlightIcon from "@mui/icons-material/Flight";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function BottomNavbar() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            name: "Trips",
            value: "trips",
            url: "/trips",
            isActive: authStatus,
            icon: <FlightIcon />,
        },
        {
            name: "Create",
            value: "create",
            url: "/create-plan",
            isActive: authStatus,
            icon: <AddBoxIcon />,
        },
        // {
        //     name: "Chat",
        //     value: "chat",
        //     url: "/chat",
        //     isActive: authStatus,
        //     icon: <ChatIcon />,
        // },
        {
            name: "Profile",
            value: "profile",
            url: "/profile",
            isActive: authStatus,
            icon: <PersonIcon />,
        },
    ];

    const getActiveValue = (pathname) => {
        const activeItem = items.find((item) => pathname.startsWith(item.url));
        return activeItem ? activeItem.value : items[0].value;
    };

    const [value, setValue] = useState(
        location.pathname ? getActiveValue(location.pathname) : items[0].value
    );

    useEffect(() => {
        setValue(getActiveValue(location.pathname));
    }, [location.pathname]);

    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999,
            }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
            >
                {items.map((item) =>
                    item.isActive ? (
                        <BottomNavigationAction
                            key={item.name}
                            label={item.name}
                            value={item.value}
                            icon={item.icon}
                            onClick={() => navigate(item.url)}
                        />
                    ) : null
                )}
            </BottomNavigation>
        </Paper>
    );
}

export default BottomNavbar;

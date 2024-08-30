import React from "react";
import { CircularProgress } from "@mui/material";

function Loading() {
    // ADD HEIGHT PROP AND DYNAMIC BACKGROUND COLOR BASED ON THEME
    return (
        <div
            style={{
                backgroundColor: "#181818",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <CircularProgress />
        </div>
    );
}

export default Loading;

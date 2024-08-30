import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUser } from "../../features/authSlice.js";
import { USER_API_ENDPOINT } from "../../constants.js";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
};

function EditProfileModal({ open, handleClose }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.userData);

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        currentPassword: "",
        newPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${USER_API_ENDPOINT}/update`,
                formData,
                { withCredentials: true }
            );

            dispatch(updateUser(response.data));
            handleClose();
        } catch (error) {
            setError(error.response?.data?.error || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography color="primary" variant="h6" component="h1">
                    Edit Profile
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder={user.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder={user.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="********"
                        onChange={handleChange}
                    />
                    <TextField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={handleChange}
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 4 }}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default EditProfileModal;

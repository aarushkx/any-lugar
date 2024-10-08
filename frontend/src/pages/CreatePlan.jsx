import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    InputAdornment,
    Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PLAN_API_ENDPOINT } from "../constants.js";
import axios from "axios";

function CreatePlan() {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [formData, setFormData] = useState({
        destination: "",
        traveller: "",
        budget: "",
        description: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                `${PLAN_API_ENDPOINT}/create`,
                {
                    destination,
                    traveller: Number(traveller),
                    budget: Number(budget),
                    description,
                    userId: userData._id,
                },
                { withCredentials: true }
            );

            const newPlan = response.data;

            if (newPlan) {
                navigate("/trips");
            } else {
                setError("Failed to create the plan.");
            }
        } catch (error) {
            setError(
                error.response?.data?.error ||
                    "An error occurred while creating the plan."
            );
        }
    };

    const { destination, traveller, budget, description } = formData;

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
                <Typography color="primary" component="h1" variant="h5">
                    Create Travel Plan
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        label="Destination"
                        type="text"
                        name="destination"
                        value={destination}
                        onChange={handleChange}
                        placeholder="Mumbai"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="Number of travellers"
                        type="text"
                        name="traveller"
                        value={traveller}
                        onChange={handleChange}
                        placeholder="1"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />

                    <TextField
                        label="Budget"
                        type="text"
                        name="budget"
                        value={budget}
                        onChange={handleChange}
                        placeholder="10,000"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    ₹
                                </InputAdornment>
                            ),
                        }}
                        required
                    />
                    <TextField
                        label="Description"
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        placeholder="Historical sites, cuisines, famous street food, city skyline and sunset walk along Marine Drive"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={3}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Create
                    </Button>
                    {error && (
                        <Typography
                            color="error"
                            variant="body2"
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            {error}
                        </Typography>
                    )}
                </Box>
                <Toolbar />
            </Box>
        </Container>
    );
}

export default CreatePlan;

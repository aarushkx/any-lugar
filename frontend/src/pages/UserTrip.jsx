import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Box, Toolbar, Button } from "@mui/material";
import { PLAN_API_ENDPOINT } from "../constants.js";
import { Loading } from "../components/index.js";
import axios from "axios";

function UserTrip() {
    const navigate = useNavigate();
    const { tripId } = useParams();

    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await axios.get(
                    `${PLAN_API_ENDPOINT}/${tripId}`,
                    {
                        withCredentials: true,
                    }
                );
                setTrip(response.data);
                setLoading(false);
            } catch (error) {
                setError(
                    error.response?.data?.error ||
                        "An error occurred while fetching the trip details"
                );
                setLoading(false);
            }
        };

        fetchTrip();
    }, [tripId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${PLAN_API_ENDPOINT}/${tripId}`, {
                withCredentials: true,
            });
            navigate("/trips");
        } catch (error) {
            setError(
                error.response?.data?.error ||
                    "An error occurred while deleting the plan"
            );
        }
    };

    if (loading) return <Loading />;

    if (error)
        return (
            <Typography align="center" variant="body1" color="error">
                {error}
            </Typography>
        );

    if (!trip)
        return <Typography variant="h6">No trip details available</Typography>;

    const { destination, traveller, budget, description, createdAt } = trip;

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 4,
                }}
            >
                <Typography color="primary" component="h1" variant="h5">
                    {destination}
                </Typography>

                <Typography sx={{ mt: 2 }} variant="h6">
                    Travellers: {traveller}
                </Typography>
                <Typography variant="h6">Budget: ₹{budget}</Typography>
                <Typography
                    sx={{ mt: 2, mb: 2 }}
                    color="textSecondary"
                    align="center"
                    variant="body1"
                >
                    {description}
                </Typography>

                <Box>
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ mr: 1 }}
                        onClick={handleDelete}
                    >
                        Delete Plan
                    </Button>
                    <Button
                        variant="contained"
                        // onClick={}
                    >
                        Suggestions
                    </Button>
                </Box>
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

                <Toolbar />
            </Box>
        </Container>
    );
}

export default UserTrip;

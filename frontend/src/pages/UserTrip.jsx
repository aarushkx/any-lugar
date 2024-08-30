import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { PLAN_API_ENDPOINT } from "../constants.js";
import { Loading } from "../components/index.js";
import axios from "axios";

function UserTrip() {
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

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <Typography variant="h6" color="error">
                {error}
            </Typography>
        );
    }

    if (!trip) {
        return <Typography variant="h6">No trip details available</Typography>;
    }

    const { destination, traveller, budget, description, createdAt } = trip;

    return (
        <Container>
            <Box>
                <Typography variant="h4">{destination}</Typography>
                <Typography variant="body1">Travelers: {traveller}</Typography>
                <Typography variant="body1">Budget: Rs.{budget}</Typography>
                <Typography variant="body1">{description}</Typography>
                <Typography variant="caption">
                    Created at:{" "}
                    {new Date(createdAt).toLocaleDateString("en-GB")}
                </Typography>
            </Box>
        </Container>
    );
}

export default UserTrip;

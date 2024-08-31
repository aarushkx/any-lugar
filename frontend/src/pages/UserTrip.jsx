import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Box, Toolbar, Button } from "@mui/material";
import { PLAN_API_ENDPOINT, AI_API_ENDPOINT } from "../constants.js";
import { Loading } from "../components/index.js";
import { CircularProgress } from "@mui/material";
import { formatPrice } from "../../utils/formatPrice.js";
import axios from "axios";

function UserTrip() {
    const navigate = useNavigate();
    const { tripId } = useParams();

    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [suggestions, setSuggestions] = useState(null);

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

    const fetchSuggestions = async () => {
        try {
            const { destination, traveller, budget, description } = trip;
            setError("");
            setLoading(true);

            const response = await axios.post(
                `${AI_API_ENDPOINT}/suggestions`,
                {
                    destination: destination,
                    traveller: traveller,
                    budget: budget,
                    description: description,
                },
                { withCredentials: true }
            );

            let result = response.data.result;

            if (result.includes("```json") && result.includes("```"))
                result = result.replace(/```json/g, "").replace(/```/g, "");

            const parsedSuggestions = JSON.parse(result);
            setSuggestions(parsedSuggestions);
            setLoading(false);
        } catch (error) {
            setError(
                error.response?.data?.error ||
                    "An error occurred while fetching the suggestions"
            );
            setLoading(false);
        }
    };

    if (error)
        return (
            <Typography align="center" variant="body1" color="error">
                {error}
            </Typography>
        );

    if (!trip) return <Loading />;

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

                <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{ mt: 1 }}
                >
                    {new Date(createdAt).toLocaleDateString("en-GB")}
                </Typography>

                <Typography sx={{ mt: 1 }} variant="h6">
                    Travellers: {traveller}
                </Typography>
                <Typography variant="h6">
                    Budget: {formatPrice(budget)}
                </Typography>
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
                    <Button variant="contained" onClick={fetchSuggestions}>
                        Suggestions
                    </Button>
                </Box>

                {loading && !trip && <Loading />}
                {loading && trip && (
                    <Box
                        sx={{
                            mt: 4,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                {suggestions && (
                    <Box sx={{ mt: 4, width: "100%" }}>
                        <Typography
                            color="primary"
                            variant="h6"
                            align="center"
                            sx={{ mb: 4 }}
                        >
                            Top Picks for Your Trip
                        </Typography>

                        {suggestions.best_places_to_visit && (
                            <Box>
                                <Typography
                                    align="center"
                                    color="primary"
                                    sx={{ mb: 4 }}
                                    variant="h6"
                                >
                                    Best Places to Visit
                                </Typography>

                                {suggestions.best_places_to_visit.map(
                                    (place, index) => (
                                        <Box
                                            align="center"
                                            key={index}
                                            sx={{ mb: 4 }}
                                        >
                                            <Typography variant="body1">
                                                {place.name}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{ mt: 1, mb: 1 }}
                                            >
                                                {place.budget}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                {place.description}
                                            </Typography>
                                        </Box>
                                    )
                                )}
                            </Box>
                        )}

                        {suggestions.accommodations && (
                            <Box>
                                <Typography
                                    align="center"
                                    color="primary"
                                    sx={{ mb: 4 }}
                                    variant="h6"
                                >
                                    Accommodations
                                </Typography>
                                {suggestions.accommodations.map(
                                    (accommodation, index) => (
                                        <Box
                                            align="center"
                                            key={index}
                                            sx={{ mb: 4 }}
                                        >
                                            <Typography variant="body1">
                                                {accommodation.name}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{ mt: 1, mb: 1 }}
                                            >
                                                {accommodation.budget}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                {accommodation.description}
                                            </Typography>
                                        </Box>
                                    )
                                )}
                            </Box>
                        )}

                        {suggestions.things_to_do && (
                            <Box>
                                <Typography
                                    align="center"
                                    color="primary"
                                    sx={{ mb: 4 }}
                                    variant="h6"
                                >
                                    Things to Do
                                </Typography>
                                {suggestions.things_to_do.map(
                                    (activity, index) => (
                                        <Box
                                            align="center"
                                            key={index}
                                            sx={{ mb: 4 }}
                                        >
                                            <Typography variant="body1">
                                                {activity.name}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{ mt: 1, mb: 1 }}
                                            >
                                                {activity.budget}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                {activity.description}
                                            </Typography>
                                        </Box>
                                    )
                                )}
                            </Box>
                        )}
                    </Box>
                )}

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

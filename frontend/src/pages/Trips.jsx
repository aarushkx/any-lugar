import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { Loading } from "../components/index.js";
import { PLAN_API_ENDPOINT } from "../constants.js";
import { useSelector } from "react-redux";
import axios from "axios";
import TripCard from "../components/TripCard/TripCard";

function Trips() {
    const userData = useSelector((state) => state.auth.userData);

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get(
                    `${PLAN_API_ENDPOINT}/user/${userData.email}`,
                    { withCredentials: true }
                );

                if (response.data) {
                    setTrips(response.data);
                    setLoading(false);
                } else {
                    setError("Failed to fetch the trips");
                    setLoading(false);
                }
            } catch (error) {
                setError(
                    error.response?.data?.error ||
                        "An error occurred while fetching the trips"
                );
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

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
                    Your Trips
                </Typography>

                {loading && <Loading />}
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

                <Box align="center" mb={8}>
                    {trips.map((trip) => (
                        <TripCard key={trip._id} trip={trip} />
                    ))}
                </Box>
            </Box>
            {/* <Typography color="primary" component="h1" variant="h5">
                Your Trips
            </Typography>
            {loading && <Loading />}
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
            <Box align="center" mb={12}>
                {trips.map((trip) => (
                    <TripCard key={trip._id} trip={trip} />
                ))}
            </Box> */}
        </Container>
    );
}

export default Trips;

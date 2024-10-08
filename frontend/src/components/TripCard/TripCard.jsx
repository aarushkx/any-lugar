import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice.js";

function TripCard({ trip }) {
    const navigate = useNavigate();

    const { _id, destination, traveller, budget, description, createdAt } =
        trip;

    return (
        <Card
            sx={{
                width: {
                    xs: 300, // Width on extra-small screens (mobile)
                    sm: 400, // Width on small screens (tablets)
                    md: 500, // Width on medium screens (laptops)
                    lg: 600, // Width on large screens (desktops)
                },
                height: 170,
                margin: 4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "pointer",
                transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                },
            }}
            onClick={() => navigate(`/trips/${_id}`)}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h5" noWrap>
                        {destination}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        align="right"
                    >
                        {new Date(createdAt).toLocaleDateString("en-GB")}
                    </Typography>
                </Box>

                <Typography sx={{ mb: 0.5 }} align="left" variant="body1">
                    Travellers: {traveller}
                </Typography>
                <Typography sx={{ mb: 2 }} align="left" variant="body1">
                    Budget: {formatPrice(budget)}
                </Typography>
                <Typography
                    color="textSecondary"
                    align="left"
                    variant="body2"
                    noWrap
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default TripCard;

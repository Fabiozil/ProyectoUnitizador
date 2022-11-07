import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Announcement({ name, price, tags, image, sell }) {
    const tagsText = tags.map((tag) => {
        return `${tag} | `;
    });

    const sellingText = sell ? "For Sale" : "Searching For";
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "#424242",
                    borderRadius: 1,
                    padding: 3,
                    margin: 1,
                    borderColor: "#1DB954",
                    borderStyle: "solid",
                    borderWidth: 1,
                }}
            >
                <Typography variant="h4" fontWeight="bold" mb="5%">
                    {name}
                </Typography>
                <img
                    src={image}
                    alt={image}
                    loading="lazy"
                    style={{ maxWidth: "25vw" }}
                />
                <Typography variant="body1" fontWeight={550}>
                    {sellingText}
                </Typography>
                <Typography variant="body1">
                    <Typography variant="body1" fontWeight="bold">
                        Price:
                    </Typography>{" "}
                    {`$${price},00`}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    Tags:
                </Typography>
                <Typography variant="body1">{tagsText}</Typography>
            </Box>
        </>
    );
}

export { Announcement };

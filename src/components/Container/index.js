import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ClassNames } from "@emotion/react";

function Container({ children }) {
    return (
        <Box
            sx={{
                width: 1,
                height: 1,
                display: "flex",
                position: "fixed",
                marginLeft: "auto",
                marginRight: "auto",
                paddingRight: 4,
                justifyContent: "center",
            }}
        >
            <Grid container spacing={3} sx={{ paddingRight: 5 }}>
                <Grid
                    item
                    xs={1}
                    sx={{
                        background:
                            "linear-gradient(to right bottom, #00005A , #00A3E0)",
                        height: 1,
                    }}
                ></Grid>
                <Grid
                    item
                    xs={11}
                    sx={{ display: "flex", justifyContent: "end" }}
                >
                    <Box
                        sx={{
                            width: 1,
                            height: 1,
                            display: "flex",
                            marginLeft: "auto",
                            marginRight: "auto",
                            paddingLeft: 4,
                            paddingRight: 4,
                            flexDirection: "column",
                            justifyContent: "space-around",
                            paddingBottom: 2,
                        }}
                    >
                        {children}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export { Container };

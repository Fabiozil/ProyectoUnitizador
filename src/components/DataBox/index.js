import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function DataBox({
    texto,
    titulo,
    children,
    titleHeigth = "5vh",
    bodyHeigth = "5vh",
    image = null,
}) {
    return (
        <Grid container sx={{ marginBottom: 3 }}>
            <Grid
                item
                xs={12}
                sx={{
                    borderRadius: 4,
                    padding: 0,
                    boxShadow: 20,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "solid",
                        textAlign: "center",
                        color: "white",
                        background:
                            "linear-gradient(to right bottom, #00005A , #00A3E0)",
                        padding: 1,
                        borderRadius: 4,
                        height: titleHeigth,
                        width: 1,
                    }}
                >
                    <Typography variant="text" sx={{ fontSize: "100%" }}>
                        {titulo}
                    </Typography>
                    {children}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        backgroudColor: "white",
                        padding: 1,
                        height: bodyHeigth,
                        width: 1,
                    }}
                >
                    <Typography
                        variant="text"
                        sx={{ fontSize: "100%", fontWeight: "bold" }}
                    >
                        {texto}
                        {image ? image : <></>}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

export { DataBox };

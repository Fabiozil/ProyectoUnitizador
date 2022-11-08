import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ModalsContext } from "../ModalsProvider";
import Box from "@mui/material/Box";
import { TextInput } from "../TextInput";
import { SelectInput } from "../SelectInput";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function MaquilaDetails({ unitizado, codigo }) {
    const { setOpenMaquilaDetails, openMaquilaDetails } =
        React.useContext(ModalsContext);
    const [photo, setPhoto] = useState(null);

    return (
        <Grid container spacing={3} sx={{ padding: 5 }}>
            <Grid item xs={12}>
                <Typography variant="h4">
                    Register a new announcement
                </Typography>
            </Grid>
            <Grid item xs={4}>
                {unitizado[0].IDUnitizado.S}
            </Grid>
            <Grid item xs={4}>
                {codigo}
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant="contained" type="submit">
                    Create New
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setOpenMaquilaDetails((prevState) => !prevState);
                    }}
                    sx={{ marginLeft: "5%" }}
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}

export { MaquilaDetails };

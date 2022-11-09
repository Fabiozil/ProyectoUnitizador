import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
    typography: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        h1: {
            fontSize: "2rem",
            "@media (min-width: 600px)": {
                fontSize: "5rem",
            },
        },
        h2: {
            fontSize: "1.5rem",
            "@media (min-width: 600px)": {
                fontSize: "3rem",
            },
        },
        h5: {
            fontSize: "1rem",
            "@media (min-width: 600px)": {
                fontSize: "1.5",
            },
        },
    },
    palette: {
        primary: {
            500: "#00A3E0",
        },
        // secondary: { A400: "#1DB954" },
        error: { 500: "#E60023" },
        warning: { 500: "#FF9900" },
        mode: "light",
    },
});

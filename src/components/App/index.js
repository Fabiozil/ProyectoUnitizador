//Libraries imports
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

//Components imports
import { Home } from "../Home";
import { Copyright } from "../Copyright";
import { Container } from "../Container";
import { Theme } from "../theme";
import { AnnouncementsProvider } from "../AnnouncementsContext";

//Functions definition

//App definition
function App() {
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <Container>
                <AnnouncementsProvider>
                    <Home />
                </AnnouncementsProvider>
            </Container>
            <Copyright />
        </ThemeProvider>
    );
}

//Exports
export { App };

//Libraries imports
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

//Components imports
import { Home } from "../Home";
import { Copyright } from "../Copyright";
import { Container } from "../Container";
import { Theme } from "../theme";
import { ModalsProvider } from "../ModalsProvider";

//Functions definition

//App definition
function App() {
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <Container>
                <ModalsProvider>
                    <Home />
                </ModalsProvider>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}

//Exports
export { App };

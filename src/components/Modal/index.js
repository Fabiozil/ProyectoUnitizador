import React from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";

function Modal({ children }) {
    return ReactDOM.createPortal(
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "black",
                borderRadius: 1,
                padding: 1,
                margin: 1,
                borderColor: "primary",
                borderStyle: "solid",
                zIndex: 1,
                position: "fixed",
                top: "20%",
                right: "20%",
                left: "20%",
                opacity: 0.9,
            }}
        >
            {children}
        </Box>,
        document.getElementById("modal")
    );
}

export { Modal };

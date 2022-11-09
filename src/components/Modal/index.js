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
                backgroundColor: "white",
                borderRadius: 1,
                padding: 5,
                margin: 1,
                zIndex: 1,
                position: "absolute",
                top: "10%",
                right: "20%",
                left: "20%",
                opacity: 1,
                boxShadow: 20,
            }}
        >
            {children}
        </Box>,
        document.getElementById("modal")
    );
}

export { Modal };

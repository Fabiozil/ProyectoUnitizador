import React from "react";

const ModalsContext = React.createContext();

function ModalsProvider(props) {
    const [openNewMaquila, setOpenNewMaquila] = React.useState(false);
    const [openMaquilaDetails, setOpenMaquilaDetails] = React.useState(false);
    return (
        <ModalsContext.Provider
            value={{
                openNewMaquila,
                setOpenNewMaquila,
                setOpenMaquilaDetails,
                openMaquilaDetails,
            }}
        >
            {props.children}
        </ModalsContext.Provider>
    );
}

export { ModalsProvider, ModalsContext };

import React from "react";

const AnnouncementsContext = React.createContext();

function AnnouncementsProvider(props) {
    const [openModal, setOpenModal] = React.useState(false);
    return (
        <AnnouncementsContext.Provider
            value={{
                openModal,
                setOpenModal,
            }}
        >
            {props.children}
        </AnnouncementsContext.Provider>
    );
}

export { AnnouncementsProvider, AnnouncementsContext };

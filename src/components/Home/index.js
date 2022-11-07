import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Announcement } from "../Announcement";
import { Modal } from "../Modal";
import axios from "axios";
import { AnnouncementForm } from "../AnnouncementForm";
import { AnnouncementsContext } from "../AnnouncementsContext";
import TextField from "@mui/material/TextField";

function Home() {
    const [announcements, setAnnouncements] = useState([]);
    const { setOpenModal, openModal } = React.useContext(AnnouncementsContext);
    useEffect(() => {
        console.log(process.env.REACT_APP_BACKEND_HOST);
        async function fetchData() {
            console.log("fetching");
            const fetchResult = await axios.get(
                `${process.env.REACT_APP_BACKEND_HOST}/announcements`
            );
            setAnnouncements(fetchResult.data.data.response);
        }
        fetchData();
    }, []);
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Typography variant="h1">Unitizador</Typography>
                <Typography variant="h5">
                    Welcome to Seek and Sell. Please feel free to search for a
                    product or to post yours
                </Typography>
                <Typography variant="h2">Announcements:</Typography>
                {announcements.map((announcement, index) => {
                    return (
                        <Announcement
                            name={announcement.name}
                            price={announcement.price}
                            tags={announcement.tags}
                            image={`/AnnouncementsImages/${announcement.photo}`}
                            sell={announcement.sell}
                            key={index}
                        />
                    );
                })}
                <TextField>New Announcement</TextField>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpenModal((prevState) => !prevState);
                    }}
                >
                    New Announcement
                </Button>
                {!!openModal && (
                    <Modal>
                        <AnnouncementForm />
                    </Modal>
                )}
            </Box>
        </>
    );
}

export { Home };

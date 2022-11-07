import React, { useState } from "react";
import Button from "@mui/material/Button";
import { AnnouncementsContext } from "../AnnouncementsContext";
import Box from "@mui/material/Box";
import { TextInput } from "../TextInput";
import { SelectInput } from "../SelectInput";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FileInput } from "../FileInput";
import axios from "axios";

function AnnouncementForm() {
    const { setOpenModal, openModal } = React.useContext(AnnouncementsContext);
    const [photo, setPhoto] = useState(null);
    const { handleSubmit, control } = useForm();

    const createNewAnnouncement = async (data) => {
        try {
            if (!photo) {
                alert("Please provide a photo");
                return;
            }

            const tags = [];

            if (data.tagOne) {
                tags.push(data.tagOne);
            }
            if (data.tagThree) {
                tags.push(data.tagThree);
            }
            if (data.tagTwo) {
                tags.push(data.tagTwo);
            }
            if (data.tagFour) {
                tags.push(data.tagFour);
            }

            const formData = new FormData();

            formData.append("photo", photo[0]);
            formData.append("name", data.name);
            formData.append("sell", data.isSelling);
            formData.append("price", data.price);
            formData.append("tags", tags);

            const postRequest = await axios.post(
                `${process.env.REACT_APP_BACKEND_HOST}/announcements`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (postRequest.data.status !== "Success") {
                alert(
                    `Error creating new Announcements, please contact support. Status message: ${postRequest.data.message}}`
                );
            } else {
                alert(
                    `Announcements created successfully, you should see your new announcement refreshing the page`
                );
            }
        } catch (err) {
            alert(
                `Error creating new Announcements, please contact support. ${err}`
            );
        }
    };

    const submitError = (error) => {
        alert("Please validate all fields are filled");
        console.error(error);
    };

    const form = useForm({
        defaultValues: {
            name: "",
            price: 0,
            isSelling: true,
            tagOne: null,
            tagTwo: null,
            tagThree: null,
            tagFour: null,
        },
    });

    const isSelling = [
        {
            text: "Selling",
            value: true,
        },
        { text: "Searching", value: false },
    ];

    const tags = [
        {
            text: "None",
            value: null,
        },
        {
            text: "Work",
            value: "Work",
        },
        {
            text: "Lifestyle",
            value: "Lifestyle",
        },
        {
            text: "Motor",
            value: "Motor",
        },
        {
            text: "Mobile",
            value: "Mobile",
        },
    ];

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(createNewAnnouncement, submitError)}
                noValidate
            >
                <Grid container spacing={3} sx={{ padding: 5 }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Register a new announcement
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"name"}
                            label={"Product Name"}
                            rules={{
                                required: "Required Field!",
                            }}
                            autoFocus
                            id="name"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"price"}
                            label={"Product price"}
                            rules={{
                                required: "Required Field!",
                            }}
                            autoFocus
                            id="price"
                            required
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectInput
                            listItems={tags}
                            label="Tag 1"
                            name="tagOne"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectInput
                            listItems={isSelling}
                            label="Selling of searching?"
                            name="isSelling"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectInput
                            listItems={tags}
                            label="Tag 2"
                            name="tagTwo"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectInput
                            listItems={tags}
                            label="Tag 3"
                            name="tagThree"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectInput
                            listItems={tags}
                            label="Tag 4"
                            name="tagFour"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{ width: "100%" }}
                        >
                            Photo
                            <input
                                type="file"
                                hidden
                                onChange={(event) => {
                                    console.log(event.target.files);
                                    setPhoto(event.target.files);
                                }}
                            />
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "end" }}
                    >
                        <Button variant="contained" type="submit">
                            Create New
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setOpenModal((prevState) => !prevState);
                            }}
                            sx={{ marginLeft: "5%" }}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
}

export { AnnouncementForm };

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Modal } from "../Modal";
import axios from "axios";
import { MaquilaDetails } from "../MaquilaDetails";
import { ModalsContext } from "../ModalsProvider";
import { SelectInput } from "../SelectInput";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@mui/material/Grid";
import { TextInput } from "../TextInput";
import { NewMaquila } from "../NewMaquila";
const {
    PutItemCommand,
    DynamoDBClient,
    ScanCommand,
} = require("@aws-sdk/client-dynamodb");

function Home() {
    const [maquilas, setMaquilas] = useState([]);
    const [unitizadoResultado, setUnitizadoResultado] = useState({});
    const [code, setCode] = useState("");
    const {
        setOpenNewMaquila,
        openNewMaquila,
        setOpenMaquilaDetails,
        openMaquilaDetails,
    } = React.useContext(ModalsContext);

    useEffect(() => {
        console.log(process.env.REACT_APP_BACKEND_HOST);
        async function fetchData() {
            const client = new DynamoDBClient({
                region: "us-east-1",
                credentials: {
                    accessKeyId: "AKIAWTIA3STNB4B3VHMG",
                    secretAccessKey: "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",
                },
            });
            const command = new ScanCommand({
                TableName: "Maquila",
            });
            const response = await client.send(command);
            const maquilas = [];
            for (const maquila of response.Items) {
                maquilas.push({
                    value: maquila.IDMaquila.S,
                    text: maquila.IDMaquila.S,
                });
            }
            setMaquilas(maquilas);
        }
        fetchData();
    }, []);

    const getMaquilaDetails = async (data) => {
        try {
            alert(JSON.stringify(data));
            const client = new DynamoDBClient({
                region: "us-east-1",
                credentials: {
                    accessKeyId: "AKIAWTIA3STNB4B3VHMG",
                    secretAccessKey: "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",
                },
            });
            const command = new ScanCommand({
                TableName: "Unitizado",
                FilterExpression: "IDMaquila = :idMaquila",
                ExpressionAttributeValues: {
                    ":idMaquila": { S: `${data.maquilaId}` },
                },
            });

            const unitizadas = await client.send(command);

            console.log(unitizadas);

            const result = [];
            for (const unitizada of unitizadas.Items) {
                if (
                    data.boxArea > unitizada.areaMayorQue.S &&
                    data.boxArea <= unitizada.areaMenorQue.S
                ) {
                    result.push(unitizada);
                }
            }

            alert(result);
            if (result) {
                setUnitizadoResultado(result);
                setCode(data.code);
                setOpenMaquilaDetails((prevState) => !prevState);
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
            maquilaId: "",
            boxArea: 0.5,
            code: "",
        },
    });
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
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            getMaquilaDetails,
                            submitError
                        )}
                        noValidate
                    >
                        <Grid container spacing={3} sx={{ padding: 5 }}>
                            <Grid item xs={12}>
                                <SelectInput
                                    listItems={
                                        maquilas
                                            ? maquilas
                                            : [{ value: "N/A", text: "N/A" }]
                                    }
                                    label="Maquila"
                                    name="maquilaId"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    name={"boxArea"}
                                    label={"Area caja (M2)"}
                                    rules={{
                                        required: "Required Field!",
                                    }}
                                    autoFocus
                                    id="boxArea"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    name={"code"}
                                    label={"Codigo SAP"}
                                    rules={{
                                        required: "Required Field!",
                                    }}
                                    autoFocus
                                    id="code"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setOpenNewMaquila(
                                            (prevState) => !prevState
                                        );
                                    }}
                                >
                                    Registrar Nueva Maquila
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    // onClick={() => {
                                    //     setOpenMaquilaDetails(
                                    //         (prevState) => !prevState
                                    //     );
                                    // }}
                                >
                                    Consultar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </FormProvider>

                {!!openNewMaquila && (
                    <Modal>
                        <NewMaquila></NewMaquila>
                    </Modal>
                )}

                {!!openMaquilaDetails && (
                    <Modal>
                        <MaquilaDetails
                            unitizado={unitizadoResultado}
                            codigo={code}
                        />
                    </Modal>
                )}
            </Box>
        </>
    );
}

export { Home };

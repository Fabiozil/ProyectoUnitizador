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
import { ReactComponent as SmurfitLogo } from "../Logos/LogoSmurfit.svg";
import LogoFamilia from "../Logos/LogoFamilia.png";
import { width } from "@mui/system";
const {
    PutItemCommand,
    DynamoDBClient,
    ScanCommand,
    GetItemCommand,
} = require("@aws-sdk/client-dynamodb");

function Home() {
    const [maquilas, setMaquilas] = useState([]);
    const [unitizadoResultado, setUnitizadoResultado] = useState({});
    const [maquilaResult, setMaquilaResult] = useState({});
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
            console.log(data);
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
                console.log(
                    `Comparando ${data.boxArea} que sea mayor que ${unitizada.areaMayorQue.S} y menor o igual a ${unitizada.areaMenorQue.S}`
                );
                if (
                    data.boxArea >= unitizada.areaMayorQue.S &&
                    data.boxArea <= unitizada.areaMenorQue.S
                ) {
                    result.push(unitizada);
                }
            }

            console.log(result);
            if (result[0]) {
                const getMaquilaCommand = new GetItemCommand({
                    TableName: "Maquila",
                    Key: {
                        IDMaquila: {
                            S: `${result[0].IDMaquila.S}`,
                        },
                    },
                });

                const maquila = await client.send(getMaquilaCommand);
                console.log(maquila);
                setMaquilaResult(maquila.Item);
                setUnitizadoResultado(result);
                setCode(data.code);
                alert("Unitizado encontrado!");
                setOpenMaquilaDetails((prevState) => !prevState);
            } else {
                alert(
                    "Unitizado no encontrado, por favor verifique los datos de entrada"
                );
            }
        } catch (err) {
            alert(
                `Error obteniendo los datos de la maquila o el unitizado, por favor contacte a soporte. ${err}`
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
                <Grid container spacing={3} sx={{ padding: 5 }}>
                    <Grid item xs={4}>
                        <img src={LogoFamilia} style={{ width: "70%" }} />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <SmurfitLogo
                            style={{ width: "100%", paddingTop: "5%" }}
                        />
                    </Grid>
                </Grid>

                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            getMaquilaDetails,
                            submitError
                        )}
                        noValidate
                    >
                        <Grid container spacing={3} sx={{ padding: 5 }}>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}>
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
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}>
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
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}>
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
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setOpenNewMaquila(
                                            (prevState) => !prevState
                                        );
                                    }}
                                    sx={{ height: "130%", width: "100%" }}
                                >
                                    Registrar Nueva Maquila
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ height: "130%", width: "100%" }}
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
                            maquila={maquilaResult}
                        />
                    </Modal>
                )}
            </Box>
        </>
    );
}

export { Home };

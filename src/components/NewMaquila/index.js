import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ModalsContext } from "../ModalsProvider";
import Box from "@mui/material/Box";
import { TextInput } from "../TextInput";
import { SelectInput } from "../SelectInput";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FileInput } from "../FileInput";
import axios from "axios";
import AWS from "aws-sdk";
const {
    S3Client,
    AbortMultipartUploadCommand,
    PutObjectCommand,
    UploadPartCommand,
} = require("@aws-sdk/client-s3");
const { PutItemCommand, DynamoDBClient } = require("@aws-sdk/client-dynamodb");

function NewMaquila() {
    const { setOpenNewMaquila, openNewMaquila } =
        React.useContext(ModalsContext);
    const { handleSubmit, control } = useForm();

    const createNewMaquila = async (data) => {
        try {
            const client = new DynamoDBClient({
                region: "us-east-1",
                credentials: {
                    accessKeyId: "AKIAWTIA3STNB4B3VHMG",
                    secretAccessKey: "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",
                },
            });

            alert(JSON.stringify(data));

            const command = new PutItemCommand({
                TableName: "Maquila",
                Item: {
                    IDMaquila: { S: `${data.name}` },
                    maxHeight: { S: `${data.maxHeight}` },
                    dimentions: { S: `${data.dimentions}` },
                    maxWeight: { S: `${data.maxWeight}` },
                    transporteGranel: { S: data.transporteGranel },
                    unitedTransport: { S: data.unitedTransport },
                },
            });

            const command1 = new PutItemCommand({
                TableName: "Unitizado",
                Item: {
                    IDUnitizado: { S: `${data.name}-50` },
                    IDMaquila: { S: `${data.name}` },
                    areaMenorQue: { S: "0.5" },
                    areaMayorQue: { S: "200" },
                    bultosPorTendido: { S: data.packagesPerTend1 },
                    detallesBulto: { S: data.packageDetails1 },
                    detallesPaletizado: { S: data.paletizadoDetails1 },
                    estiba: { S: `${data.estiba1}` },
                },
            });

            const command2 = new PutItemCommand({
                TableName: "Unitizado",
                Item: {
                    IDUnitizado: { S: `${data.name}-5095` },
                    IDMaquila: { S: `${data.name}` },
                    areaMenorQue: { S: "0.95" },
                    areaMayorQue: { S: "0.51" },
                    bultosPorTendido: { S: data.packagesPerTend1 },
                    detallesBulto: { S: data.packageDetails1 },
                    detallesPaletizado: { S: data.paletizadoDetails1 },
                    estiba: { S: `${data.estiba2}` },
                },
            });

            const command3 = new PutItemCommand({
                TableName: "Unitizado",
                Item: {
                    IDUnitizado: { S: `${data.name}-95` },
                    IDMaquila: { S: `${data.name}` },
                    areaMenorQue: { S: "3000" },
                    areaMayorQue: { S: "0.96" },
                    bultosPorTendido: { S: data.packagesPerTend3 },
                    detallesBulto: { S: data.packageDetails3 },
                    detallesPaletizado: { S: data.paletizadoDetails3 },
                    estiba: { S: `${data.estiba3}` },
                },
            });

            await client.send(command);
            await client.send(command1);
            await client.send(command2);
            await client.send(command3);
            alert("Maquila creada satisfactoriamente!");
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

    const newMaquila = useForm({
        defaultValues: {
            name: "",
            maxHeight: 0,
            dimentions: "",
            maxWeight: 0,
            transporteGranel: "Cualquier tipo de camión",
            unitedTransport: "Camión Sider",
            estiba1: false,
            estiba2: false,
            estiba3: false,
            packagesPerTend1: "",
            packageDetails1: "",
            paletizadoDetails1: "",
            packagesPerTend2: "",
            packageDetails2: "",
            paletizadoDetails2: "",
            packagesPerTend3: "",
            packageDetails3: "",
            paletizadoDetails3: "",
        },
    });

    const estiba = [
        {
            text: "Si",
            value: true,
        },
        {
            text: "No",
            value: false,
        },
    ];

    const unitedTrasportOptions = [
        { text: "Camión Sider", value: "Camión Sider" },
    ];

    const transporteGranel = [
        { text: "Cualquier tipo de camión", value: "Cualquier tipo de camión" },
    ];

    return (
        <FormProvider {...newMaquila}>
            <form
                onSubmit={newMaquila.handleSubmit(
                    createNewMaquila,
                    submitError
                )}
                noValidate
            >
                <Grid container spacing={3} sx={{ padding: 5 }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Registra una nueva Maquila
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"name"}
                            label={"Nombre Maquila"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="name"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"maxHeight"}
                            label={"Altura Maxima"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="maxHeight"
                            required
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"dimentions"}
                            label={"Dimensiones"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="dimentions"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"maxWeight"}
                            label={"Peso Maximo"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="maxWeight"
                            type="number"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectInput
                            listItems={transporteGranel}
                            label="Transporte para Referencia Granel"
                            name="transporteGranel"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectInput
                            listItems={unitedTrasportOptions}
                            label="Transporte para Referencia Unitizada"
                            name="unitedTransport"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">Menor a 0.50 M²</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"packagesPerTend1"}
                            label={"Bultos por tendido"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="packagesPerTend1"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"packageDetails1"}
                            label={"Observaciones Bulto"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="packageDetails1"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"paletizadoDetails1"}
                            label={"Observaciones Paletizado"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="paletizadoDetails1"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectInput
                            listItems={estiba}
                            label="Con Estiba?"
                            name="estiba1"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            De 0.50 M² hasta 0.95M²
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"packagesPerTend2"}
                            label={"Bultos por tendido"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="packagesPerTend2"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"packageDetails2"}
                            label={"Observaciones Bulto"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="packageDetails2"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"paletizadoDetails2"}
                            label={"Observaciones Paletizado"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="paletizadoDetails2"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectInput
                            listItems={estiba}
                            label="Con Estiba?"
                            name="estiba2"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">Mayores a 0.95M²</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"packagesPerTend3"}
                            label={"Bultos por tendido"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="packagesPerTend3"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"packageDetails3"}
                            label={"Observaciones Bulto"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="packageDetails3"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            name={"paletizadoDetails3"}
                            label={"Observaciones Paletizado"}
                            rules={{
                                required: "Campo Requerido!",
                            }}
                            autoFocus
                            id="paletizadoDetails3"
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectInput
                            listItems={estiba}
                            label="Con Estiba?"
                            name="estiba3"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "end" }}
                    >
                        <Button variant="contained" type="submit">
                            Crear nuevo registro
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setOpenNewMaquila((prevState) => !prevState);
                            }}
                            sx={{ marginLeft: "5%" }}
                        >
                            Atras
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
}

export { NewMaquila };

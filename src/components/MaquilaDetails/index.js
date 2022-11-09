import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ModalsContext } from "../ModalsProvider";
import Box from "@mui/material/Box";
import { TextInput } from "../TextInput";
import { SelectInput } from "../SelectInput";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactComponent as FamiliaLogo } from "../Logos/LogoFamilia.svg";
import { ReactComponent as SmurfitLogo } from "../Logos/LogoSmurfit.svg";
import { DataBox } from "../DataBox";
import { ReactComponent as MaxHeightIcon } from "../Icons/AlturaMaxima.svg";
import { ReactComponent as EstibaIcon } from "../Icons/Estiba.svg";
import { ReactComponent as DimensionsIcon } from "../Icons/Dimensiones.svg";
import { ReactComponent as ExclamationIcon } from "../Icons/Exclamacion.svg";
import { ReactComponent as PalletIcon } from "../Icons/Pallet.svg";
import { ReactComponent as PesoIcon } from "../Icons/Peso.svg";

function getImagen() {
    return;
}

function MaquilaDetails({ unitizado, codigo, maquila }) {
    const { setOpenMaquilaDetails, openMaquilaDetails } =
        React.useContext(ModalsContext);
    const [photo, setPhoto] = useState(null);

    return (
        <Grid container spacing={3} sx={{ padding: 5 }}>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={4}>
                    <FamiliaLogo style={{ width: "70%" }} />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h4">
                        CÓDIGO SAP:{" "}
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            {codigo}
                        </Typography>
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <SmurfitLogo style={{ width: "70%" }} />
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <DataBox titulo="ALTURA MAX." texto={maquila.maxHeight.S}>
                    <MaxHeightIcon style={{ height: "100%" }} />
                </DataBox>
                <DataBox
                    titulo="CON ESTIBA"
                    texto={unitizado[0].estiba ? "SI" : "NO"}
                >
                    <DimensionsIcon style={{ height: "100%" }} />
                </DataBox>
                <DataBox titulo="DIM. MAX (A x L)" texto={maquila.dimentions.S}>
                    <DimensionsIcon style={{ height: "100%" }} />
                </DataBox>
                <DataBox titulo="PESO MAX. " texto={maquila.maxWeight.S}>
                    <PesoIcon style={{ height: "100%" }} />
                </DataBox>
                <DataBox
                    titulo="TIPO TRANS. REF UNITIZADA"
                    texto={maquila.unitedTransport.S}
                ></DataBox>
                <DataBox
                    titulo="TIPO DE TRANS. REF GRANEL"
                    texto={maquila.transporteGranel.S}
                ></DataBox>
            </Grid>
            <Grid item xs={4}>
                <DataBox
                    titulo="OBSERVACIONES PALETIZADO"
                    texto={unitizado[0].detallesPaletizado.S}
                    titleHeigth="10vh"
                    bodyHeigth="25vh"
                >
                    <ExclamationIcon style={{ height: "100%" }} />
                </DataBox>
                <DataBox
                    titulo="OBSERVACIONES POR BULTO"
                    texto={unitizado[0].detallesBulto.S}
                    titleHeigth="10vh"
                    bodyHeigth="25vh"
                >
                    <ExclamationIcon style={{ height: "100%" }} />
                </DataBox>
            </Grid>
            <Grid item xs={4}>
                <DataBox
                    titulo="GRAFICO"
                    titleHeigth="10vh"
                    bodyHeigth="30vh"
                    imagen={getImagen(
                        unitizado[0].areaMenorQue.S,
                        unitizado[0].areaMayorQue.S
                    )}
                >
                    <PalletIcon style={{ height: "100%" }} />
                </DataBox>
                <DataBox
                    titulo="BULTOS X TENDIDO"
                    texto={unitizado[0].bultosPorTendido.S}
                    titleHeigth="10vh"
                    bodyHeigth="20vh"
                >
                    <ExclamationIcon style={{ height: "100%" }} />
                </DataBox>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setOpenMaquilaDetails((prevState) => !prevState);
                    }}
                    sx={{ marginLeft: "5%" }}
                >
                    Atras
                </Button>
            </Grid>
        </Grid>
    );
}

export { MaquilaDetails };

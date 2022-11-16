import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ModalsContext } from "../ModalsProvider";
import Box from "@mui/material/Box";
import { TextInput } from "../TextInput";
import { SelectInput } from "../SelectInput";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactComponent as SmurfitLogo } from "../Logos/LogoSmurfit.svg";
import { DataBox } from "../DataBox";
import { ReactComponent as MaxHeightIcon } from "../Icons/AlturaMaxima.svg";
import { ReactComponent as EstibaIcon } from "../Icons/Estiba.svg";
import { ReactComponent as DimensionsIcon } from "../Icons/Dimensiones.svg";
import { ReactComponent as ExclamationIcon } from "../Icons/Exclamacion.svg";
import { ReactComponent as PalletIcon } from "../Icons/Pallet.svg";
import { ReactComponent as PesoIcon } from "../Icons/Peso.svg";
import LogoFamilia from "../Logos/LogoFamilia.png";
import Caloto1 from "../Graphics/Caloto2x7.jpg";
import Caloto2 from "../Graphics/Caloto4x7.jpg";
import Caloto3 from "../Graphics/Caloto6x7.jpg";
import Medellin1 from "../Graphics/Medellin2x5.png";
import Medellin2 from "../Graphics/Medellin4x5.png";
import Medellin3 from "../Graphics/Medellin6x5.png";
import Rionegro1 from "../Graphics/Rionegro4x5.png";
import Rionegro2 from "../Graphics/Rionegro6x5.png";

function MaquilaDetails({ unitizado, codigo, maquila }) {
    const { setOpenMaquilaDetails, openMaquilaDetails } =
        React.useContext(ModalsContext);
    const [photo, setPhoto] = useState(null);

    function getImagen() {
        let logo;
        console.log(unitizado);
        if (maquila.IDMaquila.S.includes("Medellín")) {
            if (unitizado[0].IDUnitizado.S.split("-")[1] == "50") {
                logo = Medellin3;
            } else if (unitizado[0].IDUnitizado.S.split("-")[1] == "5095") {
                logo = Medellin2;
            } else {
                logo = Medellin1;
            }
        } else if (maquila.IDMaquila.S.includes("CALOTO")) {
            if (unitizado[0].IDUnitizado.S.split("-")[1] == "50") {
                logo = Caloto3;
            } else if (unitizado[0].IDUnitizado.S.split("-")[1] == "5095") {
                logo = Caloto2;
            } else {
                logo = Caloto1;
            }
        } else if (maquila.IDMaquila.S.includes("Rionegro")) {
            if (unitizado[0].IDUnitizado.S.split("-")[1] == "50") {
                logo = Rionegro2;
            } else if (unitizado[0].IDUnitizado.S.split("-")[1] == "5095") {
                logo = Rionegro1;
            }
        }
        return <img src={logo} style={{ height: "25vh" }} />;
    }

    function getPackageDetailsList() {
        const detallesBulto = unitizado[0].detallesBulto.S;
        return detallesBulto ? detallesBulto.split("-") : ["N/A"];
    }

    function getPaletizadoDetailsList() {
        const detallesPaletizado = unitizado[0].detallesPaletizado.S;
        return detallesPaletizado ? detallesPaletizado.split("-") : ["N/A"];
    }

    return (
        <Grid container spacing={3} sx={{ padding: 5 }}>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={4}>
                    <img src={LogoFamilia} style={{ width: "70%" }} />
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
                <DataBox
                    titulo="ALTURA MAX."
                    texto={`${maquila.maxHeight.S} mm`}
                >
                    <MaxHeightIcon style={{ height: "100%" }} />
                </DataBox>
                <DataBox
                    titulo="CON ESTIBA"
                    texto={unitizado[0].estiba ? "SI" : "NO"}
                >
                    <EstibaIcon style={{ height: "100%" }} />
                </DataBox>
                <DataBox titulo="DIM. MAX (A x L)" texto={maquila.dimentions.S}>
                    <DimensionsIcon style={{ height: "100%" }} />
                </DataBox>
                <DataBox
                    titulo="PESO MAX. "
                    texto={`${maquila.maxWeight.S} Kg`}
                >
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
                    titleHeigth="10vh"
                    bodyHeigth="25vh"
                    detailsList={getPaletizadoDetailsList()}
                >
                    <ExclamationIcon style={{ height: "100%" }} />
                </DataBox>
                <DataBox
                    titulo="OBSERVACIONES POR BULTO"
                    titleHeigth="10vh"
                    bodyHeigth="25vh"
                    detailsList={getPackageDetailsList()}
                >
                    <ExclamationIcon style={{ height: "100%" }} />
                </DataBox>
            </Grid>
            <Grid item xs={4}>
                <DataBox
                    titulo="GRÁFICO"
                    titleHeigth="10vh"
                    bodyHeigth="30vh"
                    image={getImagen(
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

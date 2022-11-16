async function run() {
    try {
        const detailsText = "Detalle 1";
        const emptyDetails = null;
        const detailsList = "Detalle 1 - Detalle 2 - Detalle 3";
        console.log(detailsText.split("-"));
        console.log(detailsList.split("-"));
        console.log(emptyDetails ? emptyDetails.split("-") : [""]);
    } catch (err) {
        console.log("Error", err);
    }
}
run();

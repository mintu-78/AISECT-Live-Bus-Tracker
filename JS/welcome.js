const startTrip = document.getElementById("startTrip");
const busSelect = document.getElementById("busSelect");

startTrip.addEventListener("click", () => {

    const selectedBus = busSelect.value;

    localStorage.setItem("selectedBus", selectedBus);

    window.location.href = "driver.html";

});
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const bus1 = document.getElementById("bus1");
const bus2 = document.getElementById("bus2");
const bus3 = document.getElementById("bus3");

const suggestions = document.getElementById("suggestions");

const track1 = document.getElementById("track1");
const track2 = document.getElementById("track2");
const track3 = document.getElementById("track3");

const busData = [
    { name: "Market", bus: "Bus 1" },
    { name: "Jhanda Chowk", bus: "Bus 2" },
    { name: "Ichak", bus: "Bus 3" }
];

function searchBus() {

    const value = searchInput.value.toLowerCase();

    bus1.style.display = "none";
    bus2.style.display = "none";
    bus3.style.display = "none";

   if (value.includes("1") || "market".includes(value)) {
    bus1.style.display = "block";
}

if (
    value.includes("2") ||
    "jhanda".includes(value) ||
    "jhanda chowk".includes(value)
) {
    bus2.style.display = "block";
}

if (value.includes("3") || "ichak".includes(value)) {
    bus3.style.display = "block";
}
}

searchBtn.addEventListener("click", searchBus);

searchInput.addEventListener("input", searchBus);

searchInput.addEventListener("input", function () {

    const value = searchInput.value.toLowerCase();

    suggestions.innerHTML = "";

    if (value === "") {
        suggestions.style.display = "none";
        return;
    }

    const result = busData.filter(function (item) {
        return item.name.toLowerCase().includes(value);
    });

    result.forEach(function (item) {

        const div = document.createElement("div");

        div.classList.add("suggestion-item");

        div.innerHTML = "🚌 " + item.name;

        div.addEventListener("click", function () {

            searchInput.value = item.name;

            suggestions.style.display = "none";

            searchBus();

        });

        suggestions.appendChild(div);

    });

    if (result.length > 0) {
        suggestions.style.display = "block";
    } else {
        suggestions.style.display = "none";
    }

});


const busModal = document.getElementById("busModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalRoute = document.getElementById("modalRoute");
const modalLocation = document.getElementById("modalLocation");
const modalEta = document.getElementById("modalEta");
const modalStatus = document.getElementById("modalStatus");


function showBusDetails(title, route, location, eta){

    busModal.style.display = "flex";

    modalTitle.innerHTML = "🚌 " + title;

    modalRoute.innerHTML = "🛣 Route: " + route;

    modalLocation.innerHTML = "📍 Location: " + location;

    modalEta.innerHTML = "⏱ ETA: " + eta;

    modalStatus.innerHTML = "🟢 Status: Running";

}


track1.addEventListener("click", function(){

    showBusDetails(
        "Bus 1",
        "Market → AISECT University",
        "Market",
        "5 min"
    );

});


track2.addEventListener("click", function(){

    showBusDetails(
        "Bus 2",
        "Jhanda Chowk → AISECT University",
        "Jhanda Chowk",
        "8 min"
    );

});


track3.addEventListener("click", function(){

    showBusDetails(
        "Bus 3",
        "Ichak → AISECT University",
        "Ichak",
        "12 min"
    );

});



closeModal.addEventListener("click", function(){

    busModal.style.display = "none";

});


busModal.addEventListener("click", function(e){

    if(e.target === busModal){

        busModal.style.display = "none";

    }

});
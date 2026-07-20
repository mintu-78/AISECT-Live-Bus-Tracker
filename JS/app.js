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

const liveBusData = {

    bus1: {
        location: "Market",
        eta: 5,
        status: "Running"
    },

    bus2: {
        location: "Jhanda Chowk",
        eta: 8,
        status: "Delayed"
    },

    bus3: {
        location: "Ichak",
        eta: 12,
        status: "Offline"
    }

};

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


function showBusDetails(title, route, location, eta, status) {

    busModal.style.display = "flex";

    modalTitle.innerHTML = "🚌 " + title;

    modalRoute.innerHTML = "🛣 Route:<br>" + route;

    modalLocation.innerHTML = "📍 Current Location:<br>" + location;

    modalEta.innerHTML = "⏱ ETA:<br>" + eta;

    modalStatus.innerHTML = status;

}


track1.addEventListener("click", function () {
    showOnlySelectedBus("bus1");
    currentBus = "bus1";
    showBusDetails(
        "Bus 1",
        "Market → AISECT University",
        liveBusData.bus1.location,
        etaTime.bus1 + " min",
        "Status: " + liveBusData.bus1.status + " 🟢"
    );

});


track2.addEventListener("click", function () {
    showOnlySelectedBus("bus2");
    currentBus = "bus2";
    showBusDetails(
        "Bus 2",
        "Jhanda Chowk → AISECT University",
        liveBusData.bus2.location,
        etaTime.bus2 + " min",
        "Status: " + liveBusData.bus2.status + " 🟡"
    );

});


track3.addEventListener("click", function () {
    showOnlySelectedBus("bus3");
    currentBus = "bus3";
    showBusDetails(
        "Bus 3",
        "Ichak → AISECT University",
        liveBusData.bus3.location,
        etaTime.bus3 + " min",
        "Status: " + liveBusData.bus3.status + " 🔴"
    );

});



closeModal.addEventListener("click", function () {

    busModal.style.display = "none";

});


busModal.addEventListener("click", function (e) {

    if (e.target === busModal) {

        busModal.style.display = "none";

    }

});

// Live ETA Update

let currentBus = null;

let etaTime = {
    bus1: 5,
    bus2: 8,
    bus3: 12
};


setInterval(function () {

    if (etaTime.bus1 > 0) {
        etaTime.bus1--;
        document.getElementById("eta1").innerHTML = etaTime.bus1 + " min";
    }


    if (etaTime.bus2 > 0) {
        etaTime.bus2--;
        document.getElementById("eta2").innerHTML = etaTime.bus2 + " min";
    }


    if (etaTime.bus3 > 0) {
        etaTime.bus3--;
        document.getElementById("eta3").innerHTML = etaTime.bus3 + " min";
    }
    if (currentBus) {

        modalEta.innerHTML = "⏱ ETA:<br>" + etaTime[currentBus] + " min";

    }

}, 60000);

const map = L.map("map").setView([24.02044095418254, 85.48831945904158], 13);
let routingControl = null;
const busIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20]

});


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

L.marker([24.02044095418254, 85.48831945904158])
    .addTo(map)
    .bindPopup("🏫 AISECT University")
    .openPopup();
const bus1Marker = L.marker([23.993467742407432, 85.35439829507688], {
    icon: busIcon
}).addTo(map);


const bus2Marker = L.marker([23.991772586135575, 85.36062589572639], {
    icon: busIcon
}).addTo(map);


const bus3Marker = L.marker([24.09048483048958, 85.42617589310147], {
    icon: busIcon
}).addTo(map);
bus1Marker.bindPopup("🚌 Bus 1");
bus2Marker.bindPopup("🚌 Bus 2");
bus3Marker.bindPopup("🚌 Bus 3");

function showOnlySelectedBus(selectedBus) {

    if (routingControl) {
        map.removeControl(routingControl);
    }

    let selectedMarker;

    if (selectedBus === "bus1") {
        selectedMarker = bus1Marker;
    } else if (selectedBus === "bus2") {
        selectedMarker = bus2Marker;
    } else {
        selectedMarker = bus3Marker;
    }

    map.setView(selectedMarker.getLatLng(), 15);

    selectedMarker.setZIndexOffset(1000);

    routingControl = L.Routing.control({
        waypoints: [
            selectedMarker.getLatLng(),
            L.latLng(24.02044095418254, 85.48831945904158)
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false,
        createMarker: function () {
            return null;
        },
        lineOptions: {
            styles: [{
                color: "#2196F3",
                weight: 5,
                opacity: 0.8
            }]
        }
    }).addTo(map);

    setTimeout(function () {
        selectedMarker.openPopup();
    }, 300);
}
 // <-- showOnlySelectedBus() yahin khatam hoga

database.ref("buses").on("value", function (snapshot) {

    const buses = snapshot.val();

    if (!buses) return;

    bus1Marker.setLatLng([buses.bus1.lat, buses.bus1.lng]);
    bus2Marker.setLatLng([buses.bus2.lat, buses.bus2.lng]);
    bus3Marker.setLatLng([buses.bus3.lat, buses.bus3.lng]);

});

console.log(map);
console.log(bus1Marker);
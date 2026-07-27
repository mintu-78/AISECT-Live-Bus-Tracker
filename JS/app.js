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
const panelBus = document.getElementById("panelBus");
const panelLocation = document.getElementById("panelLocation");
const panelRoute = document.getElementById("panelRoute");
const panelEta = document.getElementById("panelEta");
const panelStatus = document.getElementById("panelStatus");
const panelUpdated = document.getElementById("panelUpdated");


function showBusDetails(title, route, location, eta, status) {

    busModal.style.display = "flex";

    modalTitle.innerHTML = "🚌 " + title;

    modalRoute.innerHTML = "🛣 Route:<br>" + route;

    modalLocation.innerHTML = "📍 Current Location:<br>" + location;

    modalEta.innerHTML = "⏱ ETA:<br>" + eta;

    modalStatus.innerHTML = status;

}
function updatePanel(busKey) {

    const bus = liveBusData[busKey];

    panelBus.innerHTML = busKey === "bus1" ? "🚌 Bus 1" :
        busKey === "bus2" ? "🚌 Bus 2" : "🚌 Bus 3";

    panelLocation.innerHTML = bus.location;
    panelEta.innerHTML = etaTime[busKey] + " min";
    panelStatus.innerHTML = bus.status;
    panelUpdated.innerHTML = new Date().toLocaleTimeString();

    if (busKey === "bus1") {
        panelRoute.innerHTML = "Market → AISECT University";
    } else if (busKey === "bus2") {
        panelRoute.innerHTML = "Jhanda Chowk → AISECT University";
    } else {
        panelRoute.innerHTML = "Ichak → AISECT University";
    }

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
    updatePanel("bus1");

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
    updatePanel("bus2");
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
    updatePanel("bus3");

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


// setInterval(function () {

//     if (etaTime.bus1 > 0) {
//         etaTime.bus1--;
//         document.getElementById("eta1").innerHTML = etaTime.bus1 + " min";
//     }


//     if (etaTime.bus2 > 0) {
//         etaTime.bus2--;
//         document.getElementById("eta2").innerHTML = etaTime.bus2 + " min";
//     }


//     if (etaTime.bus3 > 0) {
//         etaTime.bus3--;
//         document.getElementById("eta3").innerHTML = etaTime.bus3 + " min";
//     }
//     if (currentBus) {

//         modalEta.innerHTML = "⏱ ETA:<br>" + etaTime[currentBus] + " min";
//         panelEta.innerHTML = etaTime[currentBus] + " min";

//     }

// }, 60000);

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

let busAnimations = {};

function animateMarker(marker, newLat, newLng) {

    const start = marker.getLatLng();

    const startLat = start.lat;
    const startLng = start.lng;

    const frames = 60;
    let current = 0;

    const deltaLat = (newLat - startLat) / frames;
    const deltaLng = (newLng - startLng) / frames;

    if (busAnimations[marker._leaflet_id]) {
        clearInterval(busAnimations[marker._leaflet_id]);
    }

    busAnimations[marker._leaflet_id] = setInterval(() => {

        current++;

        marker.setLatLng([
            startLat + deltaLat * current,
            startLng + deltaLng * current
        ]);

        if (current >= frames) {
            clearInterval(busAnimations[marker._leaflet_id]);
        }

    }, 16);
}
const universityLat = 24.02044095418254;
const universityLng = 85.48831945904158;

function calculateETA(lat, lng) {

    const distance = map.distance(
        [lat, lng],
        [universityLat, universityLng]
    );

    const speed = 400;

    return Math.max(1, Math.ceil(distance / speed));
}
function calculateDistance(lat, lng) {

    const distance = map.distance(
        [lat, lng],
        [universityLat, universityLng]
    );

    return (distance / 1000).toFixed(1);
}

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
function updateStatus(id, status) {

    const element = document.getElementById(id);

    element.className = "status";

    if (status === "Running") {
        element.classList.add("running");
    } else if (status === "Delayed") {
        element.classList.add("delayed");
    } else {
        element.classList.add("offline");
    }

    element.textContent = status;
}
// <-- showOnlySelectedBus() yahin khatam hoga

database.ref("buses").on("value", function (snapshot) {

    const buses = snapshot.val();


    if (!buses) return;
    if (buses.bus1) {

        liveBusData.bus1.location = buses.bus1.location;
        liveBusData.bus1.status = buses.bus1.status;

    }

    if (buses.bus2) {

        liveBusData.bus2.location = buses.bus2.location;
        liveBusData.bus2.status = buses.bus2.status;

    }

    if (buses.bus3) {

        liveBusData.bus3.location = buses.bus3.location;
        liveBusData.bus3.status = buses.bus3.status;

    }

    if (buses.bus1) {

        if (
            buses.bus1.status === "Offline" ||
            buses.bus1.lat === null ||
            buses.bus1.lng === null
        ) {

            if (map.hasLayer(bus1Marker)) {
                map.removeLayer(bus1Marker);
            }

        } else {

            if (!map.hasLayer(bus1Marker)) {
                bus1Marker.addTo(map);
            }

            animateMarker(
                bus1Marker,
                Number(buses.bus1.lat),
                Number(buses.bus1.lng)
            );

            etaTime.bus1 = calculateETA(
                Number(buses.bus1.lat),
                Number(buses.bus1.lng)
            );

            document.getElementById("distance1").textContent =
                calculateDistance(
                    Number(buses.bus1.lat),
                    Number(buses.bus1.lng)
                ) + " km";

            document.getElementById("eta1").textContent =
                etaTime.bus1 + " min";
            

            if (currentBus === "bus1") {
                modalEta.innerHTML = "⏱ ETA:<br>" + etaTime.bus1 + " min";
                panelEta.innerHTML = etaTime.bus1 + " min";
            }
        }

    }

    if (buses.bus2) {

        if (
            buses.bus2.status === "Offline" ||
            buses.bus2.lat === null ||
            buses.bus2.lng === null
        ) {

            if (map.hasLayer(bus2Marker)) {
                map.removeLayer(bus2Marker);
            }

        } else {

            if (!map.hasLayer(bus2Marker)) {
                bus2Marker.addTo(map);
            }

            animateMarker(
                bus2Marker,
                Number(buses.bus2.lat),
                Number(buses.bus2.lng)
            );

            etaTime.bus2 = calculateETA(
                Number(buses.bus2.lat),
                Number(buses.bus2.lng)
            );
            document.getElementById("distance2").textContent =
                calculateDistance(
                    Number(buses.bus2.lat),
                    Number(buses.bus2.lng)
                ) + " km";

            document.getElementById("eta2").textContent =
                etaTime.bus2 + " min";

            if (currentBus === "bus2") {
                modalEta.innerHTML = "⏱ ETA:<br>" + etaTime.bus2 + " min";
                panelEta.innerHTML = etaTime.bus2 + " min";
            }

        }

    }


    if (buses.bus3) {

        if (
            buses.bus3.status === "Offline" ||
            buses.bus3.lat === null ||
            buses.bus3.lng === null
        ) {

            if (map.hasLayer(bus3Marker)) {
                map.removeLayer(bus3Marker);
            }

        } else {

            if (!map.hasLayer(bus3Marker)) {
                bus3Marker.addTo(map);
            }

            animateMarker(
                bus3Marker,
                Number(buses.bus3.lat),
                Number(buses.bus3.lng)
            );

            etaTime.bus3 = calculateETA(
                Number(buses.bus3.lat),
                Number(buses.bus3.lng)
            );
            document.getElementById("distance3").textContent =
                calculateDistance(
                    Number(buses.bus3.lat),
                    Number(buses.bus3.lng)
                ) + " km";

            document.getElementById("eta3").textContent =
                etaTime.bus3 + " min";

            if (currentBus === "bus3") {
                modalEta.innerHTML = "⏱ ETA:<br>" + etaTime.bus3 + " min";
                panelEta.innerHTML = etaTime.bus3 + " min";
            }

        }




    }

    if (currentBus && buses[currentBus]) {
        liveBusData[currentBus].location = buses[currentBus].location;
        updatePanel(currentBus);
    }

    document.getElementById("location1").textContent = liveBusData.bus1.location;
    document.getElementById("location2").textContent = liveBusData.bus2.location;
    document.getElementById("location3").textContent = liveBusData.bus3.location;

    updateStatus("status1", liveBusData.bus1.status);
    updateStatus("status2", liveBusData.bus2.status);
    updateStatus("status3", liveBusData.bus3.status);

});
const showAllBtn = document.getElementById("showAllBtn");

showAllBtn.addEventListener("click", function () {

    if (routingControl) {
        map.removeControl(routingControl);
    }

    map.setView([24.02044095418254, 85.48831945904158], 12);

    const group = L.featureGroup([
        bus1Marker,
        bus2Marker,
        bus3Marker
    ]);

    map.fitBounds(group.getBounds(), {
        padding: [50, 50]
    });

    bus1Marker.openPopup();

});

console.log(map);
console.log(bus1Marker);
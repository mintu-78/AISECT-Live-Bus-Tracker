const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const bus1 = document.getElementById("bus1");
const bus2 = document.getElementById("bus2");
const bus3 = document.getElementById("bus3");

const suggestions = document.getElementById("suggestions");

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

// Track Bus Button Functionality

const track1 = document.getElementById("track1");
const track2 = document.getElementById("track2");
const track3 = document.getElementById("track3");


track1.addEventListener("click", function(){

    alert(
        "🚌 Bus 1\n\n" +
        "Route: Market → AISECT University\n\n" +
        "Current Location: Market\n\n" +
        "ETA: 5 min\n\n" +
        "Status: Running"
    );

});


track2.addEventListener("click", function(){

    alert(
        "🚌 Bus 2\n\n" +
        "Route: Jhanda Chowk → AISECT University\n\n" +
        "Current Location: Jhanda Chowk\n\n" +
        "ETA: 8 min\n\n" +
        "Status: Running"
    );

});


track3.addEventListener("click", function(){

    alert(
        "🚌 Bus 3\n\n" +
        "Route: Ichak → AISECT University\n\n" +
        "Current Location: Ichak\n\n" +
        "ETA: 12 min\n\n" +
        "Status: Running"
    );

});
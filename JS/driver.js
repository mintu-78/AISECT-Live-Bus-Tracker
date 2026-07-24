const busName = document.getElementById("busName");

const selectedBus = localStorage.getItem("selectedBus") || "bus1";


busName.innerText = selectedBus.replace("bus", "Bus ");
const startTracking = document.getElementById("startTracking");
const tripStatus = document.getElementById("tripStatus");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");

startTracking.addEventListener("click", () => {

    if (!navigator.geolocation) {
        alert("Your browser does not support Geolocation.");
        return;
    }

    startTracking.disabled = true;
    startTracking.innerHTML = "📍 Getting Location...";

    navigator.geolocation.watchPosition(

        function(position) {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            latitude.textContent = lat.toFixed(6);
            longitude.textContent = lng.toFixed(6);

            tripStatus.innerHTML = "🟢 Trip Started";
            startTracking.innerHTML = "✅ Live Tracking Started";
  database.ref("buses/" + selectedBus).update({
    lat: lat,
    lng: lng,
  location: "Live Location",
    status: "Running",
    updatedAt: Date.now()
});
        },

        function(error) {

            startTracking.disabled = false;
            startTracking.innerHTML = "▶️ Start Live Tracking";

            if (error.code === 1) {
                alert("Location Permission Denied");
            } else if (error.code === 2) {
                alert("Location Unavailable");
            } else if (error.code === 3) {
                alert("Location Request Timed Out");
            } else {
                alert("Unknown Error");
            }

        },

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }

    );

});
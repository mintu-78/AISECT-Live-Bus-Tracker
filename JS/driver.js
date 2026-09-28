const busName =
    document.getElementById("busName");

const selectedBus =
    localStorage.getItem("selectedBus") || "bus1";


if (busName) {

    const number =
        selectedBus.replace("bus", "");

    busName.innerText =
        "Bus " + number;

}


const startTracking =
    document.getElementById(
        "startTracking"
    );

const stopTracking =
    document.getElementById(
        "stopTracking"
    );

const tripStatus =
    document.getElementById(
        "tripStatus"
    );

const latitude =
    document.getElementById(
        "latitude"
    );

const longitude =
    document.getElementById(
        "longitude"
    );


let watchId = null;


/* =========================
   START LIVE TRACKING
========================= */

if (startTracking) {

    startTracking.addEventListener(
        "click",
        () => {

            if (!navigator.geolocation) {

                alert(
                    "Your browser does not support Geolocation."
                );

                return;

            }


            startTracking.disabled = true;

            startTracking.innerHTML =
                "📍 Getting Location...";


            watchId =
                navigator.geolocation.watchPosition(

                    position => {

                        const lat =
                            position.coords.latitude;

                        const lng =
                            position.coords.longitude;


                        if (latitude) {

                            latitude.textContent =
                                lat.toFixed(6);

                        }


                        if (longitude) {

                            longitude.textContent =
                                lng.toFixed(6);

                        }


                        if (tripStatus) {

                            tripStatus.innerHTML =
                                "🟢 Trip Started";

                        }


                        startTracking.innerHTML =
                            "✅ Live Tracking Started";


                        database
                            .ref(
                                "buses/" +
                                selectedBus
                            )
                            .update({

                                lat: lat,

                                lng: lng,

                                location:
                                    "Live GPS Location",

                                status:
                                    "Running",

                                updatedAt:
                                    Date.now()

                            });

                    },


                    error => {

                        startTracking.disabled =
                            false;

                        startTracking.innerHTML =
                            "▶️ Start Live Tracking";


                        if (error.code === 1) {

                            alert(
                                "Location Permission Denied"
                            );

                        }

                        else if (error.code === 2) {

                            alert(
                                "Location Unavailable"
                            );

                        }

                        else if (error.code === 3) {

                            alert(
                                "Location Request Timed Out"
                            );

                        }

                        else {

                            alert(
                                "Unknown Location Error"
                            );

                        }

                    },


                    {

                        enableHighAccuracy: true,

                        timeout: 15000,

                        maximumAge: 0

                    }

                );

        }
    );

}


/* =========================
   STOP LIVE TRACKING
========================= */

if (stopTracking) {

    stopTracking.addEventListener(
        "click",
        () => {

            if (
                watchId !== null
            ) {

                navigator.geolocation.clearWatch(
                    watchId
                );

                watchId = null;

            }


            database
                .ref(
                    "buses/" +
                    selectedBus
                )
                .update({

                    lat: null,

                    lng: null,

                    status:
                        "Offline",

                    location:
                        "Trip Ended",

                    updatedAt:
                        Date.now()

                });


            if (tripStatus) {

                tripStatus.innerHTML =
                    "🔴 Trip Ended";

            }


            if (latitude) {

                latitude.textContent =
                    "--";

            }


            if (longitude) {

                longitude.textContent =
                    "--";

            }


            if (startTracking) {

                startTracking.disabled =
                    false;

                startTracking.innerHTML =
                    "▶️ Start Live Tracking";

            }

        }
    );

}
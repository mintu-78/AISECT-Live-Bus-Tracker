document.addEventListener("DOMContentLoaded", () => {

    const busName =
        document.getElementById("busName");

    const startTracking =
        document.getElementById("startTracking");

    const stopTracking =
        document.getElementById("stopTracking");

    const tripStatus =
        document.getElementById("tripStatus");

    const latitude =
        document.getElementById("latitude");

    const longitude =
        document.getElementById("longitude");


    const validBuses = [
        "bus1",
        "bus2",
        "bus3",
        "bus4",
        "bus5",
        "bus6"
    ];


    let selectedBus = null;
    let watchId = null;


    /* =========================
       CREATE BUS SELECTION POPUP
    ========================== */

    const popup = document.createElement("div");

    popup.id = "busSelectionPopup";

    popup.innerHTML = `
        <div class="bus-popup-box">

            <div class="bus-popup-icon">
                🚌
            </div>

            <h2>Select Your Bus</h2>

            <p>
                Select the bus you want to track
            </p>

            <div class="bus-list">

                <button data-bus="bus1">
                    🚌 AISECT Bus 01
                </button>

                <button data-bus="bus2">
                    🚌 AISECT Bus 02
                </button>

                <button data-bus="bus3">
                    🚌 AISECT Bus 03
                </button>

                <button data-bus="bus4">
                    🚌 AISECT Bus 04
                </button>

                <button data-bus="bus5">
                    🚌 AISECT Bus 05
                </button>

                <button data-bus="bus6">
                    🚌 AISECT Bus 06
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(popup);


    /* =========================
       POPUP STYLE
    ========================== */

    const popupStyle = document.createElement("style");

    popupStyle.textContent = `
        #busSelectionPopup {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(8px);
        }

        .bus-popup-box {
            width: min(420px, 100%);
            padding: 30px 24px;
            border-radius: 24px;
            background: #ffffff;
            text-align: center;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
        }

        .bus-popup-icon {
            font-size: 48px;
            margin-bottom: 8px;
        }

        .bus-popup-box h2 {
            margin: 0;
            font-size: 26px;
        }

        .bus-popup-box p {
            margin: 8px 0 22px;
            color: #666;
        }

        .bus-list {
            display: grid;
            gap: 10px;
        }

        .bus-list button {
            width: 100%;
            padding: 14px 16px;
            border: none;
            border-radius: 12px;
            background: #f1f5f9;
            color: #111827;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
        }

        .bus-list button:hover {
            transform: translateY(-2px);
            background: #e2e8f0;
        }

        .bus-list button:active {
            transform: scale(0.98);
        }

        @media (max-width: 480px) {

            .bus-popup-box {
                padding: 25px 18px;
            }

            .bus-popup-box h2 {
                font-size: 23px;
            }

        }
    `;

    document.head.appendChild(popupStyle);


    /* =========================
       SELECT BUS
    ========================== */

    const busButtons =
        popup.querySelectorAll("[data-bus]");


    busButtons.forEach(button => {

        button.addEventListener("click", () => {

            const busId =
                button.getAttribute("data-bus");


            if (!validBuses.includes(busId)) {

                return;

            }


            selectedBus = busId;

            localStorage.setItem(
                "selectedBus",
                selectedBus
            );


            const number =
                selectedBus.replace("bus", "");


            if (busName) {

                busName.innerText =
                    "Bus " + number;

            }


            popup.remove();


            requestLocationAndStart();

        });

    });


    /* =========================
       LOCATION + START TRACKING
    ========================== */

    function requestLocationAndStart() {

        if (!navigator.geolocation) {

            alert(
                "Your browser does not support location."
            );

            return;

        }


        if (startTracking) {

            startTracking.disabled = true;

            startTracking.innerHTML =
                "📍 Getting Location...";

        }


        watchId =
            navigator.geolocation.watchPosition(

                position => {

                    const lat =
                        Number(
                            position.coords.latitude
                        );

                    const lng =
                        Number(
                            position.coords.longitude
                        );


                    if (
                        !Number.isFinite(lat) ||
                        !Number.isFinite(lng)
                    ) {

                        return;

                    }


                    if (
                        lat < -90 ||
                        lat > 90 ||
                        lng < -180 ||
                        lng > 180
                    ) {

                        return;

                    }


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


                    if (startTracking) {

                        startTracking.innerHTML =
                            "✅ Live Tracking Started";

                    }


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

                        })
                        .catch(error => {

                            console.error(
                                "Firebase update error:",
                                error
                            );

                        });

                },


                error => {

                    watchId = null;


                    if (startTracking) {

                        startTracking.disabled =
                            false;

                        startTracking.innerHTML =
                            "▶️ Start Live Tracking";

                    }


                    if (tripStatus) {

                        tripStatus.innerHTML =
                            "🔴 Tracking Error";

                    }


                    if (error.code === 1) {

                        alert(
                            "Location permission denied. Please allow location access."
                        );

                    }

                    else if (error.code === 2) {

                        alert(
                            "Location is currently unavailable."
                        );

                    }

                    else if (error.code === 3) {

                        alert(
                            "Location request timed out. Please try again."
                        );

                    }

                    else {

                        alert(
                            "Unable to get your location."
                        );

                    }

                },


                {

                    enableHighAccuracy:
                        true,

                    timeout:
                        15000,

                    maximumAge:
                        0

                }

            );

    }


    /* =========================
       STOP LIVE TRACKING
    ========================== */

    if (stopTracking) {

        stopTracking.addEventListener(
            "click",
            () => {

                if (!selectedBus) {

                    return;

                }


                if (watchId !== null) {

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

                    })
                    .catch(error => {

                        console.error(
                            "Firebase stop update error:",
                            error
                        );

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

});
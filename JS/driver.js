document.addEventListener("DOMContentLoaded", () => {

    const busName =
        document.getElementById("busName");

    const changeBus =
        document.getElementById("changeBus");

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

    const themeToggle =
        document.getElementById("themeToggle");

    const popup =
        document.getElementById("busSelectionPopup");

    const closeBusPopup =
        document.getElementById("closeBusPopup");

    const busButtons =
        document.querySelectorAll(".bus-option");


    const validBuses = [
        "bus1",
        "bus2",
        "bus3",
        "bus4",
        "bus5",
        "bus6"
    ];


    let selectedBus =
        localStorage.getItem("selectedBus");

    let watchId = null;


    /* =========================
       THEME
    ========================== */

    const savedTheme =
        localStorage.getItem("driver-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle("dark");

                const isDark =
                    document.body.classList.contains("dark");

                localStorage.setItem(
                    "driver-theme",
                    isDark ? "dark" : "light"
                );

                themeToggle.textContent =
                    isDark ? "☀️" : "🌙";

            }
        );

    }


    /* =========================
       UPDATE BUS UI
    ========================== */

    function updateBusUI() {

        if (!selectedBus) {
            return;
        }

        const number =
            selectedBus.replace("bus", "");

        if (busName) {

            busName.textContent =
                "Bus " + number;

        }


        busButtons.forEach(button => {

            const busId =
                button.getAttribute("data-bus");

            button.classList.toggle(
                "selected",
                busId === selectedBus
            );

        });

    }


    /* =========================
       OPEN POPUP
    ========================== */

    function openBusPopup() {

        if (!popup) {
            return;
        }

        updateBusUI();

        popup.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    /* =========================
       CLOSE POPUP
    ========================== */

    function closePopup() {

        if (!popup) {
            return;
        }

        popup.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (changeBus) {

        changeBus.addEventListener(
            "click",
            openBusPopup
        );

    }


    if (closeBusPopup) {

        closeBusPopup.addEventListener(
            "click",
            closePopup
        );

    }


    if (popup) {

        popup.addEventListener(
            "click",
            event => {

                if (
                    event.target === popup
                ) {

                    closePopup();

                }

            }
        );

    }


    /* =========================
       STOP CURRENT TRACKING
    ========================== */

    async function stopCurrentBus() {

        if (!selectedBus) {
            return;
        }


        if (watchId !== null) {

            navigator.geolocation.clearWatch(
                watchId
            );

            watchId = null;

        }


        try {

            await database
                .ref(
                    "buses/" +
                    selectedBus
                )
                .update({

                    lat: null,

                    lng: null,

                    status: "Offline",

                    location: "Trip Ended",

                    updatedAt: Date.now()

                });

        } catch (error) {

            console.error(
                "Firebase stop error:",
                error
            );

        }

    }


    /* =========================
       CHANGE BUS
    ========================== */

    busButtons.forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const newBus =
                    button.getAttribute("data-bus");


                if (
                    !validBuses.includes(newBus)
                ) {

                    return;

                }


                if (
                    newBus === selectedBus
                ) {

                    closePopup();

                    return;

                }


                if (
                    watchId !== null
                ) {

                    const confirmSwitch =
                        confirm(
                            "Current bus tracking is active.\n\nSwitching bus will stop the current trip. Continue?"
                        );

                    if (!confirmSwitch) {
                        return;
                    }

                    await stopCurrentBus();

                }


                selectedBus = newBus;


                localStorage.setItem(
                    "selectedBus",
                    selectedBus
                );


                if (latitude) {

                    latitude.textContent =
                        "--";

                }


                if (longitude) {

                    longitude.textContent =
                        "--";

                }


                if (tripStatus) {

                    tripStatus.innerHTML =
                        "🔴 Trip Not Started";

                }


                if (startTracking) {

                    startTracking.disabled =
                        false;

                    startTracking.innerHTML =
                        "▶️ Start Live Tracking";

                }


                updateBusUI();

                closePopup();

            }
        );

    });


    /* =========================
       START LIVE TRACKING
    ========================== */

    function startLiveTracking() {

        if (!selectedBus) {

            openBusPopup();

            return;

        }


        if (!navigator.geolocation) {

            alert(
                "Your browser does not support Geolocation."
            );

            return;

        }


        if (watchId !== null) {

            return;

        }


        if (startTracking) {

            startTracking.disabled =
                true;

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

                    } else if (error.code === 2) {

                        alert(
                            "Location is currently unavailable."
                        );

                    } else if (error.code === 3) {

                        alert(
                            "Location request timed out. Please try again."
                        );

                    } else {

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


    if (startTracking) {

        startTracking.addEventListener(
            "click",
            startLiveTracking
        );

    }


    /* =========================
       STOP LIVE TRACKING
    ========================== */

    if (stopTracking) {

        stopTracking.addEventListener(
            "click",
            async () => {

                if (!selectedBus) {

                    openBusPopup();

                    return;

                }


                if (watchId !== null) {

                    navigator.geolocation.clearWatch(
                        watchId
                    );

                    watchId = null;

                }


                try {

                    await database
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

                } catch (error) {

                    console.error(
                        "Firebase stop error:",
                        error
                    );

                }


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


    /* =========================
       INITIAL BUS
    ========================== */

    if (
        selectedBus &&
        validBuses.includes(selectedBus)
    ) {

        updateBusUI();

    } else {

        selectedBus = null;

        localStorage.removeItem(
            "selectedBus"
        );

        openBusPopup();

    }

});
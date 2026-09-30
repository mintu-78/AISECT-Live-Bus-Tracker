document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       THEME
    ====================================================== */

    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("aisect-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        }

    }

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const isDark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "aisect-theme",
                isDark ? "dark" : "light"
            );

            themeToggle.innerHTML =
                isDark
                    ? '<i class="fa-solid fa-sun"></i>'
                    : '<i class="fa-solid fa-moon"></i>';

        });

    }


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("open");

            menuBtn.innerHTML =
                mobileMenu.classList.contains("open")
                    ? '<i class="fa-solid fa-xmark"></i>'
                    : '<i class="fa-solid fa-bars"></i>';

        });

        document
            .querySelectorAll(".mobile-menu a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mobileMenu.classList.remove("open");

                    menuBtn.innerHTML =
                        '<i class="fa-solid fa-bars"></i>';

                });

            });

    }


    /* =====================================================
       HERO BUS ANIMATION
    ====================================================== */

    const movingBus =
        document.getElementById("movingBus");

    const busVisual =
        document.getElementById("busVisual");

    let busProgress = 0;

    let busDirection = 1;

    let lastTime = performance.now();

    const travelTime = 9000;


    function updateBusPosition() {

        if (!movingBus) return;

        const startPercent = 7;

        const endPercent = 93;

        const currentPercent =
            startPercent +
            (endPercent - startPercent) *
            busProgress;

        movingBus.style.left =
            currentPercent + "%";

        movingBus.style.transform =
            "translate3d(-50%, -50%, 0)";

        if (busVisual) {

            if (busDirection === 1) {

                busVisual.classList.remove("returning");

            } else {

                busVisual.classList.add("returning");

            }

        }

    }


    function animateHeroBus(currentTime) {

        if (!movingBus) return;

        const delta =
            currentTime - lastTime;

        lastTime = currentTime;

        busProgress +=
            (delta / travelTime) *
            busDirection;

        if (busProgress >= 1) {

            busProgress = 1;

            busDirection = -1;

        }

        if (busProgress <= 0) {

            busProgress = 0;

            busDirection = 1;

        }

        updateBusPosition();

        requestAnimationFrame(
            animateHeroBus
        );

    }


    if (movingBus) {

        updateBusPosition();

        requestAnimationFrame(
            animateHeroBus
        );

    }


    window.addEventListener(
        "resize",
        updateBusPosition
    );


    /* =====================================================
       HERO ETA
    ====================================================== */

    const heroEta =
        document.getElementById("heroEta");

    if (heroEta) {

        heroEta.textContent = "--";

    }


    /* =====================================================
       HERO STATUS
    ====================================================== */

    const heroStatus =
        document.getElementById("heroStatus");

    if (heroStatus) {

        heroStatus.textContent =
            "Select Bus";

    }


    /* =====================================================
       NAV ACTIVE SECTION
    ====================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    window.addEventListener(
        "scroll",
        () => {

            let current = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 180;

                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.id;

                }

            });

            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );

                if (
                    link.getAttribute("href") ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        }
    );


    /* =====================================================
       CARD 3D EFFECT
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".bus-card, .feature"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    (x / rect.width - 0.5) * 5;

                const rotateX =
                    (y / rect.height - 0.5) * -5;

                card.style.transform =
                    `
                    perspective(700px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-6px)
                    `;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       MAP
    ====================================================== */

    const mapElement =
        document.getElementById("map");

    if (!mapElement) return;


    /* =====================================================
       AISECT UNIVERSITY
    ====================================================== */

    const aisectUniversity = [
        24.02044095418254,
        85.48831945904158
    ];


    /* =====================================================
       MAP INITIALIZATION
    ====================================================== */

    const map =
        L.map("map", {
            zoomControl: true
        });


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    /* =====================================================
       BUS INFORMATION
    ====================================================== */

    const busInfo = {

        bus1: {
            name: "AISECT Bus 01",
            start: "Market"
        },

        bus2: {
            name: "AISECT Bus 02",
            start: "Jhanda Chowk"
        },

        bus3: {
            name: "AISECT Bus 03",
            start: "Ichak"
        },

        bus4: {
            name: "AISECT Bus 04",
            start: "Matwari"
        },

        bus5: {
            name: "AISECT Bus 05",
            start: "Matwari"
        },

        bus6: {
            name: "AISECT Bus 06",
            start: "Matwari"
        }

    };


    /* =====================================================
       UNIVERSITY MARKER
    ====================================================== */

    const universityIcon =
        L.divIcon({

            className:
                "university-map-marker",

            html: `
                <div class="map-university-icon">
                    <i class="fa-solid fa-graduation-cap"></i>
                </div>
            `,

            iconSize: [44, 44],

            iconAnchor: [22, 22]

        });


    L.marker(
        aisectUniversity,
        {
            icon: universityIcon
        }
    )
    .addTo(map)
    .bindPopup(`
        <strong>AISECT University</strong>
        <br>
        Destination
    `);


    /* =====================================================
       BUS MARKERS
    ====================================================== */

    const busMarkers = {};


    function createBusIcon(busName) {

        return L.divIcon({

            className:
                "custom-bus-marker",

            html: `
                <div class="map-bus-marker">

                    <div class="map-bus-icon">
                        <i class="fa-solid fa-bus"></i>
                    </div>

                    <div class="map-bus-name">
                        ${busName}
                    </div>

                </div>
            `,

            iconSize: [130, 72],

            iconAnchor: [65, 36]

        });

    }


    Object.keys(busInfo).forEach(busId => {

        busMarkers[busId] =
            L.marker(
                aisectUniversity,
                {
                    icon:
                        createBusIcon(
                            busInfo[busId].name
                        )
                }
            );

    });


    /* =====================================================
       DEFAULT MAP
    ====================================================== */

    map.setView(
        aisectUniversity,
        13
    );


    /* =====================================================
       SELECTED BUS VARIABLES
    ====================================================== */

    let selectedBus = null;

    let selectedBusData = null;

    let routeControl = null;

    let routeRequestId = 0;


    /* =====================================================
       SELECTED BUS UI
    ====================================================== */

    const selectedBusName =
        document.getElementById(
            "selectedBusName"
        );

    const selectedBusRoute =
        document.getElementById(
            "selectedBusRoute"
        );

    const selectedBusStatus =
        document.getElementById(
            "selectedBusStatus"
        );

    const selectedBusEta =
        document.getElementById(
            "selectedBusEta"
        );

    const selectedBusDistance =
        document.getElementById(
            "selectedBusDistance"
        );

    const selectedBusLocation =
        document.getElementById(
            "selectedBusLocation"
        );

    const selectedBusUpdated =
        document.getElementById(
            "selectedBusUpdated"
        );

    const selectedBusDot =
        document.getElementById(
            "selectedBusDot"
        );


    /* =====================================================
       HIDE ALL BUS MARKERS
    ====================================================== */

    function hideAllBusMarkers() {

        Object.keys(busMarkers)
            .forEach(busId => {

                const marker =
                    busMarkers[busId];

                if (
                    marker &&
                    marker._map
                ) {

                    map.removeLayer(marker);

                }

            });

    }


    /* =====================================================
       REMOVE CURRENT ROUTE
    ====================================================== */

    function removeRoute() {

        routeRequestId++;

        if (routeControl) {

            try {

                map.removeControl(
                    routeControl
                );

            } catch (error) {

                console.warn(
                    "Route remove error:",
                    error
                );

            }

            routeControl = null;

        }

    }


    /* =====================================================
       RESET BUS CARDS
    ====================================================== */

    function resetAllBusCards() {

        Object.keys(busInfo)
            .forEach(busId => {

                const statusElement =
                    document.getElementById(
                        "status-" + busId
                    );

                const locationElement =
                    document.getElementById(
                        "location-" + busId
                    );

                const timeElement =
                    document.getElementById(
                        "time-" + busId
                    );


                if (statusElement) {

                    statusElement.textContent =
                        "Offline";

                    statusElement.className =
                        "badge offline";

                }


                if (locationElement) {

                    locationElement.textContent =
                        "Waiting for live location";

                }


                if (timeElement) {

                    timeElement.textContent =
                        "--";

                }

            });

    }


    /* =====================================================
       UPDATE ALL BUS CARDS FROM FIREBASE
    ====================================================== */

    function updateAllBusCardsFromFirebase() {

        Object.keys(busInfo)
            .forEach(busId => {

                const data =
                    latestFirebaseBuses[busId];


                const statusElement =
                    document.getElementById(
                        "status-" + busId
                    );

                const locationElement =
                    document.getElementById(
                        "location-" + busId
                    );

                const timeElement =
                    document.getElementById(
                        "time-" + busId
                    );


                /*
                   No Firebase data
                */

                if (!data) {

                    if (statusElement) {

                        statusElement.textContent =
                            "Offline";

                        statusElement.className =
                            "badge offline";

                    }

                    if (locationElement) {

                        locationElement.textContent =
                            "Waiting for live location";

                    }

                    if (timeElement) {

                        timeElement.textContent =
                            "--";

                    }

                    return;

                }


                /*
                   Null means driver stopped
                   tracking / no current GPS.
                */

                if (
                    data.lat === null ||
                    data.lng === null ||
                    data.lat === undefined ||
                    data.lng === undefined
                ) {

                    if (statusElement) {

                        statusElement.textContent =
                            "Offline";

                        statusElement.className =
                            "badge offline";

                    }

                    if (locationElement) {

                        locationElement.textContent =
                            data.location ||
                            "Waiting for live location";

                    }

                    if (timeElement) {

                        timeElement.textContent =
                            data.updatedAt
                                ? formatTimeAgo(
                                    data.updatedAt
                                )
                                : "--";

                    }

                    return;

                }


                const lat =
                    Number(data.lat);

                const lng =
                    Number(data.lng);


                /*
                   Invalid GPS
                */

                if (
                    !Number.isFinite(lat) ||
                    !Number.isFinite(lng) ||
                    lat < -90 ||
                    lat > 90 ||
                    lng < -180 ||
                    lng > 180
                ) {

                    return;

                }


                const firebaseStatus =
                    String(
                        data.status ||
                        "Running"
                    );


                const isRunning =
                    firebaseStatus
                        .toLowerCase() ===
                    "running";


                if (statusElement) {

                    statusElement.textContent =
                        isRunning
                            ? "Running"
                            : firebaseStatus;

                    statusElement.className =
                        isRunning
                            ? "badge running"
                            : "badge offline";

                }


                if (locationElement) {

                    locationElement.textContent =
                        "Live GPS Location";

                }


                if (timeElement) {

                    timeElement.textContent =
                        data.updatedAt
                            ? formatTimeAgo(
                                data.updatedAt
                            )
                            : "--";

                }

            });

    }


    /* =====================================================
       RESET SELECTED BUS PANEL
    ====================================================== */

    function resetSelectedPanel() {

        if (selectedBusName) {

            selectedBusName.textContent =
                "No bus selected";

        }

        if (selectedBusRoute) {

            selectedBusRoute.textContent =
                "Select a bus to start tracking";

        }

        if (selectedBusStatus) {

            selectedBusStatus.textContent =
                "Offline";

        }

        if (selectedBusEta) {

            selectedBusEta.textContent =
                "--";

        }

        if (selectedBusDistance) {

            selectedBusDistance.textContent =
                "--";

        }

        if (selectedBusLocation) {

            selectedBusLocation.textContent =
                "Waiting...";

        }

        if (selectedBusUpdated) {

            selectedBusUpdated.textContent =
                "--";

        }

        if (selectedBusDot) {

            selectedBusDot.className =
                "selected-status-dot";

        }

    }


    /* =====================================================
       SELECT BUS
    ====================================================== */

    function selectBus(busId) {

        if (!busInfo[busId]) return;


        selectedBus =
            busId;


        selectedBusData =
            null;


        removeRoute();

        hideAllBusMarkers();


        const info =
            busInfo[busId];


        if (selectedBusName) {

            selectedBusName.textContent =
                info.name;

        }


        /*
           IMPORTANT:

           Route is NOT Market/Jhanda/Ichak/Matwari.

           Actual route will be:
           Firebase Current GPS → AISECT University
        */

        if (selectedBusRoute) {

            selectedBusRoute.textContent =
                "Current Location → AISECT University";

        }


        if (selectedBusStatus) {

            selectedBusStatus.textContent =
                "Waiting for live location";

        }


        if (selectedBusEta) {

            selectedBusEta.textContent =
                "--";

        }


        if (selectedBusDistance) {

            selectedBusDistance.textContent =
                "--";

        }


        if (selectedBusLocation) {

            selectedBusLocation.textContent =
                "Waiting for GPS...";

        }


        if (selectedBusUpdated) {

            selectedBusUpdated.textContent =
                "--";

        }


        if (selectedBusDot) {

            selectedBusDot.className =
                "selected-status-dot";

        }


        const marker =
            busMarkers[busId];


        if (
            marker &&
            !marker._map
        ) {

            marker.addTo(map);

        }


        setTimeout(() => {

            map.invalidateSize();

        }, 300);


        closeBusSelector();


        const mapSection =
            document.getElementById(
                "map-section"
            );


        if (mapSection) {

            mapSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        /*
           NO navigator.geolocation HERE.

           Location comes ONLY from Firebase.
        */

        updateSelectedBusFromFirebase();

    }


    window.selectBus =
        selectBus;


    /* =====================================================
       CREATE BUS SELECTOR
    ====================================================== */

    function createBusSelector() {

        if (
            document.getElementById(
                "busLocationSelector"
            )
        ) {

            return;

        }


        const selector =
            document.createElement("div");

        selector.id =
            "busLocationSelector";


        selector.innerHTML = `

            <div class="bus-selector-backdrop">

                <div
                    class="bus-selector-panel"
                    role="dialog"
                    aria-modal="true"
                >

                    <button
                        type="button"
                        class="bus-selector-close"
                        id="closeBusSelector"
                        aria-label="Close"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>


                    <div class="bus-selector-header">

                        <div class="bus-selector-header-icon">
                            <i class="fa-solid fa-location-crosshairs"></i>
                        </div>

                        <div>

                            <span>
                                LIVE LOCATION
                            </span>

                            <h3>
                                Select Your Bus
                            </h3>

                            <p>
                                Select a bus to view its live location
                                and route to AISECT University.
                            </p>

                        </div>

                    </div>


                    <div class="bus-selector-grid">

                        ${Object.keys(busInfo)
                            .map(busId => {

                                const number =
                                    busId.replace(
                                        "bus",
                                        ""
                                    );

                                return `

                                    <button
                                        type="button"
                                        class="bus-selector-item"
                                        data-select-bus="${busId}"
                                    >

                                        <span class="selector-bus-icon">
                                            <i class="fa-solid fa-bus"></i>
                                        </span>

                                        <span class="selector-bus-info">

                                            <strong>
                                                AISECT Bus ${number.padStart(2, "0")}
                                            </strong>

                                            <small>
                                                Current Location
                                                →
                                                AISECT University
                                            </small>

                                        </span>

                                        <i class="fa-solid fa-chevron-right"></i>

                                    </button>

                                `;

                            })
                            .join("")}

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(
            selector
        );


        document
            .getElementById(
                "closeBusSelector"
            )
            .addEventListener(
                "click",
                closeBusSelector
            );


        selector
            .querySelector(
                ".bus-selector-backdrop"
            )
            .addEventListener(
                "click",
                event => {

                    if (
                        event.target.classList.contains(
                            "bus-selector-backdrop"
                        )
                    ) {

                        closeBusSelector();

                    }

                }
            );


        selector
            .querySelectorAll(
                "[data-select-bus]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        selectBus(
                            button.dataset.selectBus
                        );

                    }
                );

            });

    }


    /* =====================================================
       OPEN BUS SELECTOR
    ====================================================== */

    function openBusSelector() {

        createBusSelector();


        const selector =
            document.getElementById(
                "busLocationSelector"
            );


        if (!selector) return;


        selector.classList.add(
            "show"
        );


        document.body.classList.add(
            "bus-selector-open"
        );

    }


    /* =====================================================
       CLOSE BUS SELECTOR
    ====================================================== */

    function closeBusSelector() {

        const selector =
            document.getElementById(
                "busLocationSelector"
            );


        if (selector) {

            selector.classList.remove(
                "show"
            );

        }


        document.body.classList.remove(
            "bus-selector-open"
        );

    }


    /* =====================================================
       LOCATION BUTTON
    ====================================================== */

    const locateBtn =
        document.getElementById(
            "locateBtn"
        );


    if (locateBtn) {

        locateBtn.addEventListener(
            "click",
            () => {

                /*
                   NO browser GPS here.
                   Only opens bus selector.
                */

                openBusSelector();

            }
        );

    }


    /* =====================================================
       FIREBASE LIVE DATA
    ====================================================== */

    let latestFirebaseBuses = {};


    /* =====================================================
       UPDATE SELECTED BUS FROM FIREBASE
    ====================================================== */

    function updateSelectedBusFromFirebase() {

        if (!selectedBus) return;


        const data =
            latestFirebaseBuses[
                selectedBus
            ];


        /*
           No Firebase data
        */

        if (!data) {

            const statusElement =
                document.getElementById(
                    "status-" + selectedBus
                );

            const locationElement =
                document.getElementById(
                    "location-" + selectedBus
                );

            const timeElement =
                document.getElementById(
                    "time-" + selectedBus
                );


            if (statusElement) {

                statusElement.textContent =
                    "Offline";

                statusElement.className =
                    "badge offline";

            }


            if (locationElement) {

                locationElement.textContent =
                    "Waiting for live location";

            }


            if (timeElement) {

                timeElement.textContent =
                    "--";

            }


            if (selectedBusStatus) {

                selectedBusStatus.textContent =
                    "Waiting for live location";

            }


            if (selectedBusLocation) {

                selectedBusLocation.textContent =
                    "Waiting for GPS...";

            }


            if (selectedBusEta) {

                selectedBusEta.textContent =
                    "--";

            }


            if (selectedBusDistance) {

                selectedBusDistance.textContent =
                    "--";

            }


            if (selectedBusUpdated) {

                selectedBusUpdated.textContent =
                    "--";

            }


            if (selectedBusDot) {

                selectedBusDot.className =
                    "selected-status-dot";

            }


            return;

        }


        /*
           IMPORTANT:

           null coordinates mean there is no
           active driver GPS.
        */

        if (
            data.lat === null ||
            data.lng === null ||
            data.lat === undefined ||
            data.lng === undefined
        ) {

            removeRoute();


            const statusElement =
                document.getElementById(
                    "status-" + selectedBus
                );


            const locationElement =
                document.getElementById(
                    "location-" + selectedBus
                );


            const timeElement =
                document.getElementById(
                    "time-" + selectedBus
                );


            if (statusElement) {

                statusElement.textContent =
                    "Offline";

                statusElement.className =
                    "badge offline";

            }


            if (locationElement) {

                locationElement.textContent =
                    data.location ||
                    "Waiting for live location";

            }


            if (timeElement) {

                timeElement.textContent =
                    data.updatedAt
                        ? formatTimeAgo(
                            data.updatedAt
                        )
                        : "--";

            }


            if (selectedBusStatus) {

                selectedBusStatus.textContent =
                    "Waiting for live location";

            }


            if (selectedBusEta) {

                selectedBusEta.textContent =
                    "--";

            }


            if (selectedBusDistance) {

                selectedBusDistance.textContent =
                    "--";

            }


            if (selectedBusLocation) {

                selectedBusLocation.textContent =
                    "Waiting for GPS...";

            }


            if (selectedBusUpdated) {

                selectedBusUpdated.textContent =
                    data.updatedAt
                        ? formatTimeAgo(
                            data.updatedAt
                        )
                        : "--";

            }


            if (selectedBusDot) {

                selectedBusDot.className =
                    "selected-status-dot";

            }


            return;

        }


        const lat =
            Number(data.lat);

        const lng =
            Number(data.lng);


        /*
           Validate GPS coordinates
        */

        if (
            !Number.isFinite(lat) ||
            !Number.isFinite(lng) ||
            lat < -90 ||
            lat > 90 ||
            lng < -180 ||
            lng > 180
        ) {

            console.warn(
                "Invalid Firebase GPS:",
                selectedBus,
                data
            );

            return;

        }


        selectedBusData =
            data;


        const position = [
            lat,
            lng
        ];


        const marker =
            busMarkers[selectedBus];


        /* =================================================
           ONLY SELECTED BUS MARKER
        ================================================== */

        hideAllBusMarkers();


        if (marker) {

            marker.setLatLng(
                position
            );

            marker.addTo(map);

        }


        /* =================================================
           STATUS
        ================================================== */

        const firebaseStatus =
            String(
                data.status ||
                "Running"
            );


        const isRunning =
            firebaseStatus
                .toLowerCase() ===
            "running";


        const statusElement =
            document.getElementById(
                "status-" + selectedBus
            );


        if (statusElement) {

            statusElement.textContent =
                isRunning
                    ? "Running"
                    : firebaseStatus;

            statusElement.className =
                isRunning
                    ? "badge running"
                    : "badge offline";

        }


        /* =================================================
           LOCATION
        ================================================== */

        const locationElement =
            document.getElementById(
                "location-" + selectedBus
            );


        if (locationElement) {

            locationElement.textContent =
                "Live GPS Location";

        }


        /* =================================================
           UPDATED TIME
        ================================================== */

        const timeElement =
            document.getElementById(
                "time-" + selectedBus
            );


        if (timeElement) {

            timeElement.textContent =
                data.updatedAt
                    ? formatTimeAgo(
                        data.updatedAt
                    )
                    : "--";

        }


        /* =================================================
           SELECTED BUS PANEL
        ================================================== */

        const info =
            busInfo[selectedBus];


        if (selectedBusName) {

            selectedBusName.textContent =
                info.name;

        }


        /*
           NEVER use info.start here.

           Actual route is always Firebase GPS
           → AISECT University.
        */

        if (selectedBusRoute) {

            selectedBusRoute.textContent =
                "Current Location → AISECT University";

        }


        if (selectedBusStatus) {

            selectedBusStatus.textContent =
                isRunning
                    ? "Live • Running"
                    : "Live • " + firebaseStatus;

        }


        if (selectedBusLocation) {

            selectedBusLocation.textContent =
                "Live GPS Location";

        }


        if (selectedBusUpdated) {

            selectedBusUpdated.textContent =
                data.updatedAt
                    ? formatTimeAgo(
                        data.updatedAt
                    )
                    : "--";

        }


        if (selectedBusDot) {

            selectedBusDot.className =
                isRunning
                    ? "selected-status-dot live"
                    : "selected-status-dot";

        }


        /* =================================================
           POPUP
        ================================================== */

        if (marker) {

            marker.bindPopup(`

                <div class="bus-popup">

                    <div class="popup-bus-title">

                        <i class="fa-solid fa-bus"></i>

                        <strong>
                            ${info.name}
                        </strong>

                    </div>


                    <div class="popup-row">

                        <span>
                            Route
                        </span>

                        <strong>
                            Current Location
                            →
                            AISECT University
                        </strong>

                    </div>


                    <div class="popup-row">

                        <span>
                            Status
                        </span>

                        <strong class="popup-live">
                            ● ${firebaseStatus}
                        </strong>

                    </div>


                    <div class="popup-row">

                        <span>
                            GPS
                        </span>

                        <strong>
                            Live Location
                        </strong>

                    </div>

                </div>

            `);

        }


        /*
           EXACT ROUTE:

           Firebase current GPS
                    ↓
           AISECT University
        */

        createLiveRoute(
            position
        );

    }


    /* =====================================================
       CREATE LIVE ROAD ROUTE
    ====================================================== */

    function createLiveRoute(
        busPosition
    ) {

        if (!selectedBus) return;


        if (
            typeof L.Routing ===
            "undefined"
        ) {

            console.error(
                "Leaflet Routing Machine is not loaded."
            );

            if (selectedBusStatus) {

                selectedBusStatus.textContent =
                    "Routing service unavailable";

            }

            return;

        }


        const currentRequest =
            ++routeRequestId;


        if (routeControl) {

            try {

                map.removeControl(
                    routeControl
                );

            } catch (error) {

                console.warn(
                    "Old route remove error:",
                    error
                );

            }

            routeControl = null;

        }


        /*
           Firebase GPS
        */

        const start =
            L.latLng(
                Number(busPosition[0]),
                Number(busPosition[1])
            );


        /*
           AISECT University
        */

        const destination =
            L.latLng(
                aisectUniversity[0],
                aisectUniversity[1]
            );


        /*
           Do not create route if current GPS
           is already invalid.
        */

        if (
            !Number.isFinite(start.lat) ||
            !Number.isFinite(start.lng)
        ) {

            return;

        }


        /*
           EXACT:

           CURRENT DRIVER GPS
                  ↓
           ROAD ROUTE
                  ↓
           AISECT UNIVERSITY
        */

        routeControl =
            L.Routing.control({

                waypoints: [
                    start,
                    destination
                ],

                router:
                    L.Routing.osrmv1({
                        serviceUrl:
                            "https://router.project-osrm.org/route/v1"
                    }),

                addWaypoints: false,

                draggableWaypoints: false,

                routeWhileDragging: false,

                showAlternatives: false,

                fitSelectedRoutes: true,

                show: false,

                collapsible: false,

                createMarker:
                    function () {
                        return null;
                    },

                lineOptions: {

                    styles: [
                        {
                            color: "#2563eb",
                            opacity: 0.95,
                            weight: 6
                        }
                    ]

                }

            });


        routeControl.on(
            "routesfound",
            event => {

                if (
                    currentRequest !==
                    routeRequestId
                ) {

                    return;

                }


                const routes =
                    event.routes || [];


                if (!routes.length) {

                    return;

                }


                const route =
                    routes[0];


                const summary =
                    route.summary || {};


                const distance =
                    Number(
                        summary.totalDistance
                    );


                const totalTime =
                    Number(
                        summary.totalTime
                    );


                /* =========================================
                   DISTANCE
                ========================================== */

                if (
                    selectedBusDistance &&
                    Number.isFinite(distance)
                ) {

                    if (
                        distance >= 1000
                    ) {

                        selectedBusDistance.textContent =
                            (
                                distance / 1000
                            ).toFixed(1) +
                            " km";

                    } else {

                        selectedBusDistance.textContent =
                            Math.round(
                                distance
                            ) +
                            " m";

                    }

                }


                /* =========================================
                   ETA
                ========================================== */

                if (
                    selectedBusEta &&
                    Number.isFinite(totalTime)
                ) {

                    const minutes =
                        Math.max(
                            1,
                            Math.round(
                                totalTime / 60
                            )
                        );


                    selectedBusEta.textContent =
                        minutes +
                        " min";

                }


                /* =========================================
                   HERO DETAILS
                ========================================== */

                if (
                    heroEta &&
                    Number.isFinite(totalTime)
                ) {

                    const minutes =
                        Math.max(
                            1,
                            Math.round(
                                totalTime / 60
                            )
                        );


                    heroEta.textContent =
                        String(minutes).padStart(
                            2,
                            "0"
                        ) +
                        " min";

                }


                if (heroStatus) {

                    heroStatus.textContent =
                        "Running";

                }


                /* =========================================
                   FIT ROUTE
                ========================================== */

                if (
                    route.coordinates &&
                    route.coordinates.length
                ) {

                    const bounds =
                        L.latLngBounds(
                            route.coordinates.map(
                                coordinate => [
                                    coordinate.lat,
                                    coordinate.lng
                                ]
                            )
                        );


                    if (bounds.isValid()) {

                        map.fitBounds(
                            bounds,
                            {
                                padding: [
                                    60,
                                    60
                                ],
                                maxZoom: 16,
                                animate: true
                            }
                        );

                    }

                }

            }
        );


        routeControl.on(
            "routingerror",
            error => {

                if (
                    currentRequest !==
                    routeRequestId
                ) {

                    return;

                }


                console.error(
                    "Routing error:",
                    error
                );


                if (selectedBusStatus) {

                    selectedBusStatus.textContent =
                        "Live • Route unavailable";

                }

            }
        );


        routeControl.addTo(
            map
        );

    }


    /* =====================================================
       FIREBASE LISTENER
    ====================================================== */

    if (
        typeof database !==
        "undefined"
    ) {

        database
            .ref("buses")
            .on(
                "value",
                snapshot => {

                    latestFirebaseBuses =
                        snapshot.val() || {};


                    /*
                       IMPORTANT:

                       First update ALL SIX cards
                       independently.
                    */

                    resetAllBusCards();

                    updateAllBusCardsFromFirebase();


                    /*
                       If no bus selected,
                       don't show a bus route.
                    */

                    if (!selectedBus) {

                        hideAllBusMarkers();

                        removeRoute();

                        return;

                    }


                    /*
                       Only selected bus is shown
                       on the map and routed.
                    */

                    updateSelectedBusFromFirebase();

                },
                error => {

                    console.error(
                        "Firebase read error:",
                        error
                    );


                    if (selectedBusStatus) {

                        selectedBusStatus.textContent =
                            "Unable to load live location";

                    }

                }
            );

    } else {

        console.error(
            "Firebase database is not available."
        );

    }


    /* =====================================================
       TRACK BUS BUTTONS
    ====================================================== */

    document
        .querySelectorAll(".track-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const busId =
                        button.dataset.bus;


                    if (!busInfo[busId]) return;


                    selectBus(
                        busId
                    );

                }
            );

        });


    /* =====================================================
       BUS SEARCH
    ====================================================== */

    const busSearch =
        document.getElementById(
            "busSearch"
        );

    const clearSearch =
        document.getElementById(
            "clearSearch"
        );

    const searchResults =
        document.getElementById(
            "searchResults"
        );


    const searchBusData = [

        {
            id: "bus1",
            name: "AISECT Bus 01",
            route: "Current Location → AISECT University",
            keywords: [
                "bus 1",
                "bus 01",
                "bus1",
                "bus01",
                "market"
            ]
        },

        {
            id: "bus2",
            name: "AISECT Bus 02",
            route: "Current Location → AISECT University",
            keywords: [
                "bus 2",
                "bus 02",
                "bus2",
                "bus02",
                "jhanda chowk",
                "jhanda"
            ]
        },

        {
            id: "bus3",
            name: "AISECT Bus 03",
            route: "Current Location → AISECT University",
            keywords: [
                "bus 3",
                "bus 03",
                "bus3",
                "bus03",
                "ichak"
            ]
        },

        {
            id: "bus4",
            name: "AISECT Bus 04",
            route: "Current Location → AISECT University",
            keywords: [
                "bus 4",
                "bus 04",
                "bus4",
                "bus04",
                "matwari"
            ]
        },

        {
            id: "bus5",
            name: "AISECT Bus 05",
            route: "Current Location → AISECT University",
            keywords: [
                "bus 5",
                "bus 05",
                "bus5",
                "bus05",
                "matwari"
            ]
        },

        {
            id: "bus6",
            name: "AISECT Bus 06",
            route: "Current Location → AISECT University",
            keywords: [
                "bus 6",
                "bus 06",
                "bus6",
                "bus06",
                "matwari"
            ]
        }

    ];


    function searchBuses(value) {

        if (!searchResults) return;


        const query =
            value.trim().toLowerCase();


        if (!query) {

            searchResults.innerHTML =
                "";

            searchResults.classList.remove(
                "show"
            );


            if (clearSearch) {

                clearSearch.style.display =
                    "none";

            }


            document
                .querySelectorAll(
                    ".bus-card"
                )
                .forEach(card => {

                    card.style.display =
                        "";

                });


            return;

        }


        if (clearSearch) {

            clearSearch.style.display =
                "flex";

        }


        let matches = [];


        if (
            query ===
            "matwari"
        ) {

            matches =
                searchBusData.filter(
                    bus =>
                        bus.id === "bus4" ||
                        bus.id === "bus5" ||
                        bus.id === "bus6"
                );

        } else {

            matches =
                searchBusData.filter(
                    bus => {

                        const searchableText =
                            [
                                bus.name,
                                bus.route,
                                ...bus.keywords
                            ]
                            .join(" ")
                            .toLowerCase();


                        return searchableText
                            .includes(query);

                    }
                );

        }


        document
            .querySelectorAll(
                ".bus-card"
            )
            .forEach(card => {

                const busId =
                    card.dataset.busCard;


                const visible =
                    matches.some(
                        bus =>
                            bus.id === busId
                    );


                card.style.display =
                    visible
                        ? ""
                        : "none";

            });


        if (!matches.length) {

            searchResults.innerHTML = `

                <div class="search-result-item">

                    <div class="search-result-icon">

                        <i class="fa-solid fa-magnifying-glass"></i>

                    </div>

                    <div class="search-result-text">

                        <strong>
                            No bus found
                        </strong>

                        <span>
                            Try Bus 1, Bus 2, Bus 3, Bus 4, Bus 5 or Bus 6
                        </span>

                    </div>

                </div>

            `;


            searchResults.classList.add(
                "show"
            );


            return;

        }


        searchResults.innerHTML =
            matches
                .map(
                    bus => `

                        <div
                            class="search-result-item"
                            data-search-bus="${bus.id}"
                        >

                            <div class="search-result-icon">

                                <i class="fa-solid fa-bus"></i>

                            </div>


                            <div class="search-result-text">

                                <strong>
                                    ${bus.name}
                                </strong>

                                <span>
                                    ${bus.route}
                                </span>

                            </div>

                        </div>

                    `
                )
                .join("");


        searchResults.classList.add(
            "show"
        );


        searchResults
            .querySelectorAll(
                "[data-search-bus]"
            )
            .forEach(item => {

                item.addEventListener(
                    "click",
                    () => {

                        const busId =
                            item.dataset.searchBus;


                        if (busSearch) {

                            busSearch.value =
                                "";

                        }


                        searchResults.classList.remove(
                            "show"
                        );


                        selectBus(
                            busId
                        );

                    }
                );

            });

    }


    if (busSearch) {

        busSearch.addEventListener(
            "input",
            () => {

                searchBuses(
                    busSearch.value
                );

            }
        );


        busSearch.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Enter"
                ) {

                    const firstResult =
                        searchResults
                            ?.querySelector(
                                "[data-search-bus]"
                            );


                    if (firstResult) {

                        firstResult.click();

                    }

                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    busSearch.value =
                        "";

                    searchBuses(
                        ""
                    );

                }

            }
        );

    }


    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                if (busSearch) {

                    busSearch.value =
                        "";

                    searchBuses(
                        ""
                    );

                    busSearch.focus();

                }

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (
                searchResults &&
                !event.target.closest(
                    ".navbar-search"
                )
            ) {

                searchResults.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       TIME FORMAT
    ====================================================== */

    function formatTimeAgo(timestamp) {

        const difference =
            Date.now() -
            Number(timestamp);


        if (
            !Number.isFinite(
                difference
            )
        ) {

            return "--";

        }


        const seconds =
            Math.max(
                0,
                Math.floor(
                    difference / 1000
                )
            );


        if (seconds < 10) {

            return "Just now";

        }


        if (seconds < 60) {

            return seconds +
                " sec ago";

        }


        const minutes =
            Math.floor(
                seconds / 60
            );


        if (minutes < 60) {

            return minutes +
                " min ago";

        }


        const hours =
            Math.floor(
                minutes / 60
            );


        return hours +
            " hr ago";

    }

});
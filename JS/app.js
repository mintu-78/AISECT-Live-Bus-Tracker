document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       THEME
    ========================== */

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


    /* =========================
       MOBILE MENU
    ========================== */

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


    /* =========================
       HERO BUS ANIMATION
    ========================== */

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

                busVisual.classList.remove(
                    "returning"
                );

            } else {

                busVisual.classList.add(
                    "returning"
                );

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


    /* =========================
       HERO ETA
    ========================== */

    const heroEta =
        document.getElementById("heroEta");

    let eta = 5;

    if (heroEta) {

        setInterval(() => {

            eta--;

            if (eta <= 0) {
                eta = 5;
            }

            heroEta.textContent =
                String(eta).padStart(2, "0") +
                " min";

        }, 60000);

    }


    /* =========================
       NAV ACTIVE SECTION
    ========================== */

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


    /* =========================
       CARD 3D EFFECT
    ========================== */

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


    /* =========================
       MAP
    ========================== */

    const mapElement =
        document.getElementById("map");

    if (!mapElement) return;


    const aisectUniversity = [
        24.02044095418254,
        85.48831945904158
    ];


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


    /* =========================
       BUS INFORMATION
    ========================== */

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


    /* =========================
       UNIVERSITY MARKER
    ========================== */

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


    /* =========================
       BUS MARKERS
    ========================== */

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


    /* =========================
       DEFAULT MAP VIEW
    ========================== */

    map.setView(
        aisectUniversity,
        13
    );


    /* =========================
       SELECTED BUS
    ========================== */

    let selectedBus = null;


    const selectedBusName =
        document.getElementById(
            "selectedBusName"
        );

    const selectedBusStatus =
        document.getElementById(
            "selectedBusStatus"
        );

    const selectedBusDot =
        document.getElementById(
            "selectedBusDot"
        );


    function selectBus(busId) {

        selectedBus = busId;

        const info =
            busInfo[busId];

        if (!info) return;


        selectedBusName.textContent =
            info.name;

        selectedBusStatus.textContent =
            "Waiting for live location";

        selectedBusDot.className =
            "selected-status-dot";


        const marker =
            busMarkers[busId];

        if (marker) {

            marker.addTo(map);

        }


        setTimeout(() => {

            map.invalidateSize();

            map.setView(
                aisectUniversity,
                13,
                {
                    animate: true
                }
            );

        }, 400);

    }


    /* =========================
       LIVE FIREBASE TRACKING
    ========================== */

    if (
        typeof database !== "undefined"
    ) {

        database
            .ref("buses")
            .on(
                "value",
                snapshot => {

                    const buses =
                        snapshot.val() || {};


                    Object.keys(busInfo)
                        .forEach(busId => {

                            const data =
                                buses[busId];

                            const marker =
                                busMarkers[busId];

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


                            /* NO LIVE DATA */

                            if (
                                !data ||
                                !data.lat ||
                                !data.lng
                            ) {

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


                                if (
                                    selectedBus ===
                                    busId
                                ) {

                                    selectedBusStatus.textContent =
                                        "Waiting for live location";

                                    selectedBusDot.className =
                                        "selected-status-dot";

                                }

                                return;

                            }


                            /* LIVE LOCATION */

                            const position = [
                                Number(data.lat),
                                Number(data.lng)
                            ];


                            marker.setLatLng(
                                position
                            );


                            if (
                                !marker._map
                            ) {

                                marker.addTo(map);

                            }


                            /* STATUS */

                            const currentStatus =
                                data.status ||
                                "Running";


                            if (statusElement) {

                                statusElement.textContent =
                                    currentStatus;

                                if (
                                    currentStatus
                                        .toLowerCase()
                                        .includes("running")
                                ) {

                                    statusElement.className =
                                        "badge running";

                                } else {

                                    statusElement.className =
                                        "badge delayed";

                                }

                            }


                            /* LOCATION TEXT */

                            if (locationElement) {

                                locationElement.textContent =
                                    "Live GPS Location";

                            }


                            /* UPDATED TIME */

                            if (
                                timeElement &&
                                data.updatedAt
                            ) {

                                timeElement.textContent =
                                    formatTimeAgo(
                                        data.updatedAt
                                    );

                            }


                            /* POPUP */

                            marker.bindPopup(`

                                <div class="bus-popup">

                                    <div class="popup-bus-title">

                                        <i class="fa-solid fa-bus"></i>

                                        <strong>
                                            ${busInfo[busId].name}
                                        </strong>

                                    </div>

                                    <div class="popup-row">

                                        <span>
                                            Route
                                        </span>

                                        <strong>
                                            ${busInfo[busId].start}
                                            → AISECT University
                                        </strong>

                                    </div>

                                    <div class="popup-row">

                                        <span>
                                            Status
                                        </span>

                                        <strong class="popup-live">
                                            ● ${currentStatus}
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


                            /* SELECTED BUS */

                            if (
                                selectedBus ===
                                busId
                            ) {

                                selectedBusStatus.textContent =
                                    "Live • " +
                                    currentStatus;

                                selectedBusDot.className =
                                    "selected-status-dot live";


                                map.setView(
                                    position,
                                    16,
                                    {
                                        animate: true
                                    }
                                );

                            }

                        });

                }
            );

    }


    /* =========================
       TRACK BUS BUTTONS
    ========================== */

    document
        .querySelectorAll(".track-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const busId =
                        button.dataset.bus;

                    selectBus(busId);


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


                    setTimeout(() => {

                        const marker =
                            busMarkers[busId];

                        if (
                            marker &&
                            marker._map
                        ) {

                            marker.openPopup();

                        }

                    }, 700);

                }
            );

        });


    /* =========================
       MY LOCATION
    ========================== */

    const locateBtn =
        document.getElementById(
            "locateBtn"
        );


    if (locateBtn) {

        locateBtn.addEventListener(
            "click",
            () => {

                if (
                    !navigator.geolocation
                ) {

                    alert(
                        "Location is not supported by your browser."
                    );

                    return;

                }


                locateBtn.innerHTML =
                    `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Locating...
                    `;


                navigator.geolocation.getCurrentPosition(

                    position => {

                        const lat =
                            position.coords.latitude;

                        const lng =
                            position.coords.longitude;


                        map.setView(
                            [
                                lat,
                                lng
                            ],
                            16
                        );


                        L.circleMarker(
                            [
                                lat,
                                lng
                            ],
                            {
                                radius: 8,
                                color: "#2563eb",
                                fillColor: "#2563eb",
                                fillOpacity: 0.8
                            }
                        )
                        .addTo(map)
                        .bindPopup(
                            "You are here"
                        )
                        .openPopup();


                        locateBtn.innerHTML =
                            `
                            <i class="fa-solid fa-location-crosshairs"></i>
                            My Location
                            `;

                    },


                    () => {

                        alert(
                            "Unable to get your location."
                        );


                        locateBtn.innerHTML =
                            `
                            <i class="fa-solid fa-location-crosshairs"></i>
                            My Location
                            `;

                    }

                );

            }
        );

    }


    /* =========================
       TIME FORMAT
    ========================== */

    function formatTimeAgo(timestamp) {

        const difference =
            Date.now() - Number(timestamp);

        const seconds =
            Math.floor(
                difference / 1000
            );


        if (seconds < 10) {
            return "Just now";
        }


        if (seconds < 60) {
            return seconds + " sec ago";
        }


        const minutes =
            Math.floor(
                seconds / 60
            );


        if (minutes < 60) {
            return minutes + " min ago";
        }


        const hours =
            Math.floor(
                minutes / 60
            );


        return hours + " hr ago";

    }

});
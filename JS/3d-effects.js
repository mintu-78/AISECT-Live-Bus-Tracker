document.addEventListener("DOMContentLoaded", () => {

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    /* =========================
       GSAP SETUP
    ========================= */

    if (typeof gsap === "undefined") {
        console.warn("GSAP not loaded.");
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    /* =========================
       LENIS SMOOTH SCROLL
    ========================= */

   let lenis = null;

if (!reduceMotion && window.Lenis) {

  lenis = new Lenis({
    duration: 0.65,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1.15,
    touchMultiplier: 1.2,
    infinite: false
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(1000, 16);
}


    /* =========================
       NAVBAR INTRO
    ========================= */

    gsap.from(".navbar", {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });


    gsap.from(".nav-links a", {
        y: -20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.3,
        ease: "power3.out"
    });


    /* =========================
       HERO INTRO
    ========================= */

    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    heroTimeline
        .from(".hero-content h1", {
            y: 80,
            opacity: 0,
            rotateX: 25,
            duration: 1.1
        })
        .from(".hero-content > p", {
            y: 30,
            opacity: 0,
            duration: 0.7
        }, "-=0.6")
        .from(".search-box", {
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.8
        }, "-=0.4")
        .from(".stat-card", {
            y: 50,
            opacity: 0,
            rotateX: 20,
            stagger: 0.12,
            duration: 0.7
        }, "-=0.3");


    /* =========================
       HERO PARTICLES
    ========================= */

    gsap.to(".hero-particles span", {
        y: "random(-35,35)",
        x: "random(-25,25)",
        rotation: "random(-30,30)",
        duration: "random(3,6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
            each: 0.15,
            from: "random"
        }
    });


    /* =========================
       HERO ORBS
    ========================= */

    gsap.to(".depth-orb", {
        x: "random(-60,60)",
        y: "random(-50,50)",
        scale: "random(0.85,1.15)",
        duration: "random(4,7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4
    });


    /* =========================
       MOUSE PARALLAX
    ========================= */

    const hero = document.querySelector(".hero");

    if (hero) {

        hero.addEventListener("mousemove", (event) => {

            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            gsap.to(".depth-orb", {
                x: x * 45,
                y: y * 45,
                duration: 0.8,
                overwrite: "auto"
            });


            gsap.to(".hero-content", {
                rotateY: x * 2,
                rotateX: -y * 2,
                duration: 0.8,
                transformPerspective: 1200,
                ease: "power2.out",
                overwrite: "auto"
            });

        });


        hero.addEventListener("mouseleave", () => {

            gsap.to(".hero-content", {
                rotateY: 0,
                rotateX: 0,
                duration: 0.8,
                ease: "power3.out"
            });

        });

    }


    /* =========================
       3D CARD TILT
    ========================= */

    const tiltCards = document.querySelectorAll(".bus-card, .feature-card, .stat-card");

    tiltCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 8;

            const rotateX =
                ((centerY - y) / centerY) * 8;


            gsap.to(card, {
                rotateX,
                rotateY,
                scale: 1.025,
                duration: 0.35,
                transformPerspective: 1000,
                ease: "power2.out",
                overwrite: "auto"
            });

        });


        card.addEventListener("mouseleave", () => {

            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.5,
                ease: "power3.out"
            });

        });

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    if (typeof ScrollTrigger !== "undefined") {

        const revealElements = document.querySelectorAll(
            ".about-text, .about-image, .features-header, .contact-info, .contact-form, .map-section"
        );


        revealElements.forEach((element) => {

            gsap.from(element, {

                y: 80,
                opacity: 0,
                rotateX: 10,

                duration: 1,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }

            });

        });


        /* =========================
           FEATURE CARDS
        ========================= */

        gsap.from(".feature-card", {

            y: 100,
            opacity: 0,
            rotateX: 30,

            stagger: 0.15,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {
                trigger: ".features-container",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }

        });


        /* =========================
           BUS CARDS
        ========================= */

        gsap.from(".bus-card", {

            y: 120,
            opacity: 0,
            rotateY: 20,
            rotateX: 10,

            stagger: 0.18,

            duration: 1.1,

            ease: "power3.out",

            scrollTrigger: {
                trigger: ".bus-container",
                start: "top 82%",
                toggleActions: "play none none reverse"
            }

        });


        /* =========================
           ABOUT BUS FLOAT
        ========================= */

        gsap.to(".about-bus", {

            y: -18,
            rotation: 2,

            duration: 2.5,

            repeat: -1,
            yoyo: true,

            ease: "sine.inOut"

        });


        /* =========================
           ABOUT CIRCLES
        ========================= */

        gsap.to(".circle-one", {

            rotation: 360,

            duration: 14,

            repeat: -1,

            ease: "none"

        });


        gsap.to(".circle-two", {

            rotation: -360,

            duration: 18,

            repeat: -1,

            ease: "none"

        });


        /* =========================
           SCROLL PARALLAX
        ========================= */

        gsap.to(".about-image", {

            y: -60,

            ease: "none",

            scrollTrigger: {
                trigger: ".about",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }

        });


        /* =========================
           CONTACT PARALLAX
        ========================= */

        gsap.to(".contact-form", {

            y: -25,

            ease: "none",

            scrollTrigger: {
                trigger: ".contact",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }

        });


        /* =========================
           MAP PARALLAX
        ========================= */

        gsap.from(".map-container", {

            scale: 0.9,
            opacity: 0,

            duration: 1,

            scrollTrigger: {
                trigger: ".map-section",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }

        });

    }


    /* =========================
       BUTTON HOVER EFFECT
    ========================= */

    const buttons = document.querySelectorAll(
        "button, .student-login-link"
    );

    buttons.forEach((button) => {

        button.addEventListener("mouseenter", () => {

            gsap.to(button, {
                y: -3,
                scale: 1.02,
                duration: 0.25,
                ease: "power2.out"
            });

        });


        button.addEventListener("mouseleave", () => {

            gsap.to(button, {
                y: 0,
                scale: 1,
                duration: 0.25,
                ease: "power2.out"
            });

        });

    });


    /* =========================
       LIQUID BACKGROUND
    ========================= */

    const liquidElements = document.querySelectorAll(
        ".liquid-blob"
    );

    liquidElements.forEach((blob, index) => {

        gsap.to(blob, {

            x: index % 2 === 0 ? 80 : -80,

            y: index % 2 === 0 ? -50 : 60,

            rotation: index % 2 === 0 ? 30 : -30,

            scale: 1.15,

            duration: 6 + index,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        });

    });


    /* =========================
       SCROLL PROGRESS
    ========================= */

    if (typeof ScrollTrigger !== "undefined") {

        ScrollTrigger.create({

            start: 0,
            end: "max",

            onUpdate: (self) => {

                const progress =
                    self.progress * 100;

                const progressBar =
                    document.querySelector("#scrollProgress");

                if (progressBar) {

                    progressBar.style.width =
                        `${progress}%`;

                }

            }

        });

    }


    /* =========================
       CURSOR GLOW
    ========================= */

    const cursorGlow =
        document.querySelector("#cursorGlow");

    if (cursorGlow) {

        window.addEventListener("mousemove", (event) => {

            gsap.to(cursorGlow, {

                x: event.clientX,
                y: event.clientY,

                duration: 0.25,

                ease: "power2.out"

            });

        });

    }


    /* =========================
       REFRESH SCROLLTRIGGER
    ========================= */

    window.addEventListener("load", () => {

        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }

    });

});
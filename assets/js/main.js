document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-item");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.classList.toggle("active");

            navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );
        });

        navItems.forEach((item) => {
            item.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");
            });
        });

        document.addEventListener("click", (event) => {
            const clickedOutside =
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target);

            if (clickedOutside) {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");
            }
        });
    }

    const carousel = document.querySelector(".orbital-carousel");
    const slides = document.querySelectorAll(".carousel-slide");

    let currentSlide = 0;
    let carouselTimer = null;
    const slideInterval = 5000;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function showSlide(index) {
        slides[currentSlide].classList.remove("active");

        currentSlide = index;

        slides[currentSlide].classList.add("active");
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function startCarousel() {
        stopCarousel();
        carouselTimer = setInterval(nextSlide, slideInterval);
    }

    function stopCarousel() {
        if (carouselTimer) {
            clearInterval(carouselTimer);
            carouselTimer = null;
        }
    }

    if (slides.length > 1 && !prefersReducedMotion) {
        startCarousel();

        if (carousel) {
            carousel.addEventListener("mouseenter", stopCarousel);
            carousel.addEventListener("mouseleave", startCarousel);
        }

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                stopCarousel();
            } else {
                startCarousel();
            }
        });
    }
});
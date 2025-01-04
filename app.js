document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section"); // All sections with IDs
    const navLinks = document.querySelectorAll(".nav-wrapper a"); // Navigation links

    const highlightNav = () => {
        let currentSection = "";

        // Check which section is in the viewport
        sections.forEach((section) => {
            const sectionTop = section.offsetTop; // Section's top position
            const sectionHeight = section.offsetHeight; // Section's height
            const scrollPosition = window.scrollY; // Current scroll position

            if (
                scrollPosition >= sectionTop - sectionHeight / 3 &&
                scrollPosition < sectionTop + sectionHeight - sectionHeight / 3
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        // Highlight the corresponding nav link
        navLinks.forEach((link) => {
            link.classList.remove("active"); // Remove active class
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active"); // Add active class
            }
        });
    };

    // Run on scroll and initially
    window.addEventListener("scroll", highlightNav);
    highlightNav(); // Run on page load to highlight the correct section
});

document.querySelectorAll('.nav-wrapper a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default if the link is an internal anchor link (i.e., starts with #)
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();  // Prevents default link behavior
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'  // Smooth scroll to the section
            });
        }
    });
});


const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    const name = form.querySelector("input[name='name']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const message = form.querySelector("textarea[name='message']").value.trim();

    if (!name || !email || !message) {
        e.preventDefault();
        alert("Please fill out all fields.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
    }
});

// JavaScript to add active class on click
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(link => link.classList.remove('active')); // Remove 'active' from all links
        this.classList.add('active'); // Add 'active' to the clicked link
    });
});

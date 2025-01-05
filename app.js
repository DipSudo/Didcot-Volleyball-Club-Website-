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


document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const largeImage = document.getElementById("large-image");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    let currentIndex = 0;

    function updateGallery(index) {
        // Ensure index is within bounds
        if (index < 0) {
            currentIndex = thumbnails.length - 1; // Wrap to last image
        } else if (index >= thumbnails.length) {
            currentIndex = 0; // Wrap to first image
        } else {
            currentIndex = index;
        }

        // Update large image
        largeImage.src = thumbnails[currentIndex].src;

        // Update active thumbnail
        thumbnails.forEach(t => t.classList.remove("active"));
        thumbnails[currentIndex].classList.add("active");
    }

    // Left button click
    prevButton.addEventListener("click", () => {
        updateGallery(currentIndex - 1);
    });

    // Right button click
    nextButton.addEventListener("click", () => {
        updateGallery(currentIndex + 1);
    });

    // Thumbnail click
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            updateGallery(index);
        });
    });
});

// JavaScript for controlling thumbnail scrolling
const prevButton = document.querySelector('.thumbnail-prev-button');
const nextButton = document.querySelector('.thumbnail-next-button');
const thumbnailsContainer = document.querySelector('.thumbnails-container');
const thumbnailWidth = document.querySelector('.thumbnail').offsetWidth;
const maxScroll = thumbnailsContainer.scrollWidth - thumbnailsContainer.offsetWidth;

prevButton.addEventListener('click', () => {
    let currentScroll = thumbnailsContainer.scrollLeft;
    thumbnailsContainer.scrollLeft = Math.max(currentScroll - thumbnailWidth, 0);
});

nextButton.addEventListener('click', () => {
    let currentScroll = thumbnailsContainer.scrollLeft;
    thumbnailsContainer.scrollLeft = Math.min(currentScroll + thumbnailWidth, maxScroll);
});

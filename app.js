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
    const largeImage = document.getElementById("large-image");
    const thumbnails = document.querySelectorAll("#gallery .thumbnail");
    const prevButton = document.querySelector("#gallery #prev-button");
    const nextButton = document.querySelector("#gallery #next-button");
    const thumbnailPrev = document.querySelector("#gallery .thumbnail-prev-button");
    const thumbnailNext = document.querySelector("#gallery .thumbnail-next-button");
    const thumbnailsContainer = document.querySelector("#gallery .thumbnails-container");

    let currentIndex = 0;

    // Update large image display
    const updateLargeImage = (index) => {
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle("active", i === index);
        });
        largeImage.src = thumbnails[index].src;
        largeImage.alt = thumbnails[index].alt;
    };

    // Large image navigation
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateLargeImage(currentIndex);
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateLargeImage(currentIndex);
    });

    // Thumbnail navigation
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            currentIndex = index;
            updateLargeImage(currentIndex);
        });
    });

    // Thumbnail scroll navigation
    thumbnailPrev.addEventListener("click", () => {
        thumbnailsContainer.scrollLeft -= 100;
    });

    thumbnailNext.addEventListener("click", () => {
        thumbnailsContainer.scrollLeft += 100;
    });

    // Initialize with the first image active
    updateLargeImage(currentIndex);
});
let currentIndex = 0;
const images = document.querySelectorAll(".carousel .large-image-container img"); // Large images
const thumbnails = document.querySelectorAll(".carousel .thumbnails .thumbnail"); // Thumbnails

// Function to update the large image based on the current index
function updateLargeImage() {
    const largeImage = document.getElementById("large-image");
    largeImage.src = thumbnails[currentIndex].src; // Change the large image to the selected thumbnail image
    thumbnails.forEach((thumbnail) => thumbnail.classList.remove("active")); // Remove active class from all thumbnails
    thumbnails[currentIndex].classList.add("active"); // Add active class to the selected thumbnail
}

// Function to go to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % thumbnails.length; // Move to the next thumbnail
    updateLargeImage();
}

// Function to go to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length; // Move to the previous thumbnail
    updateLargeImage();
}

// Event listeners for the previous and next buttons for the main image
document.getElementById("next-button").addEventListener("click", function () {
    nextImage();
    resetAutoScroll(); // Reset auto-scroll after manual interaction
});

document.getElementById("prev-button").addEventListener("click", function () {
    prevImage();
    resetAutoScroll(); // Reset auto-scroll after manual interaction
});

// Event listeners for the thumbnail images
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", function () {
        currentIndex = index; // Set the current index to the clicked thumbnail
        updateLargeImage();
        resetAutoScroll(); // Reset auto-scroll after manual interaction
    });
});

// Thumbnail navigation buttons
document.querySelector(".thumbnail-prev-button").addEventListener("click", function () {
    const thumbnailsContainer = document.querySelector(".thumbnails-container");
    const firstThumbnail = thumbnailsContainer.querySelector(".thumbnail");
    thumbnailsContainer.appendChild(firstThumbnail); // Move the first thumbnail to the end
});

document.querySelector(".thumbnail-next-button").addEventListener("click", function () {
    const thumbnailsContainer = document.querySelector(".thumbnails-container");
    const lastThumbnail = thumbnailsContainer.querySelector(".thumbnail:last-child");
    thumbnailsContainer.insertBefore(lastThumbnail, thumbnailsContainer.firstChild); // Move the last thumbnail to the beginning
});

// Auto-scroll for main image
let autoScrollInterval = setInterval(nextImage, 5000); // Change 5000 to your desired interval (in milliseconds)

// Function to reset the auto-scroll interval
function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(nextImage, 5000); // Restart auto-scroll with the desired interval
}

// Initially, set the first image as active
updateLargeImage();


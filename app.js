document.addEventListener("DOMContentLoaded", () => {


    // Add scroll event listener and call highlightNav on page load
    window.addEventListener("scroll", highlightNav);
    highlightNav(); // Initial highlight on page load

    // === Contact Form Validation ===
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            const name = form.querySelector("input[name='name']").value.trim();
            const email = form.querySelector("input[name='email']").value.trim();
            const message = form.querySelector("textarea[name='message']").value.trim();

            console.log(`Form values: Name=${name}, Email=${email}, Message=${message}`);
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert("Please fill out all fields.");
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                e.preventDefault();
                alert("Please enter a valid email address.");
            }
        });
    } else {
        console.log("Form not found!");
    }

    // === Image Carousel Logic ===
    const largeImage = document.getElementById("large-image");
    const thumbnails = document.querySelectorAll("#gallery .thumbnail");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const thumbnailPrev = document.querySelector(".thumbnail-prev-button");
    const thumbnailNext = document.querySelector(".thumbnail-next-button");
    const thumbnailsContainer = document.querySelector(".thumbnails-container");

    if (!largeImage) console.log("Large image not found!");
    if (thumbnails.length === 0) console.log("Thumbnails not found!");
    
    let currentIndex = 0;

    const updateLargeImage = () => {
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle("active", i === currentIndex);
        });
        largeImage.src = thumbnails[currentIndex]?.src;
        largeImage.alt = thumbnails[currentIndex]?.alt;
        console.log(`Updated large image to: ${thumbnails[currentIndex]?.src}`);
    };

    const nextImage = () => {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateLargeImage();
    };

    const prevImage = () => {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateLargeImage();
    };

    // Check if the buttons are found
    if (nextButton && prevButton) {
        nextButton.addEventListener("click", () => {
            nextImage();
            resetAutoScroll();
        });

        prevButton.addEventListener("click", () => {
            prevImage();
            resetAutoScroll();
        });
    } else {
        console.log("Next/Previous buttons not found!");
    }

    // Event listeners for thumbnail navigation
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            currentIndex = index;
            updateLargeImage();
            resetAutoScroll();
        });
    });

    // Thumbnail scroll navigation (left/right arrows)
    if (thumbnailPrev && thumbnailNext) {
        thumbnailPrev.addEventListener("click", () => {
            thumbnailsContainer.scrollLeft -= 100;
        });

        thumbnailNext.addEventListener("click", () => {
            thumbnailsContainer.scrollLeft += 100;
        });
    } else {
        console.log("Thumbnail navigation buttons not found!");
    }

    // Auto-scroll functionality for carousel
    let autoScrollInterval = setInterval(nextImage, 5000); // Adjust interval as needed

    const resetAutoScroll = () => {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(nextImage, 5000); // Reset auto-scroll with interval
    };

    updateLargeImage(); // Initialize first image
});

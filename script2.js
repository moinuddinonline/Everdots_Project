// Get all gallery images and modal elements
const galleryImages = document.querySelectorAll('.gallery-img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close-btn');

// Open modal when an image is clicked
galleryImages.forEach(image => {
    image.addEventListener('click', function () {
        modal.style.display = 'flex'; // Show the modal
        modalImg.src = this.src; // Set the image source in the modal
    });
});

// Close the modal when the close button is clicked
closeBtn.addEventListener('click', function () {
    modal.style.display = 'none'; // Hide the modal
});

// Close the modal when clicking anywhere outside the image
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide the modal when clicking outside the image
    }
});

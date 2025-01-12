document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
  
    if (!form) {
        console.error("Form with ID 'contactForm' not found.");
        return; // Stop further execution if form is missing
    }
  
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(form);

        fetch("submit_contact.php", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Make a floating success message
            const successMessage = document.createElement("div");
            successMessage.textContent = "Successfully uploaded!";
            successMessage.style.position = "fixed";
            successMessage.style.top = "20px";
            successMessage.style.right = "20px";
            successMessage.style.backgroundColor = "#4CAF50";
            successMessage.style.color = "white";
            successMessage.style.padding = "15px";
            successMessage.style.borderRadius = "5px";
            successMessage.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            document.body.appendChild(successMessage);
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000); // Redirect after 2 seconds
        })
        .catch(error => {
            console.error("Error:", error);
            const errorMessage = document.createElement("div");
            errorMessage.textContent = "Failed to upload!";
            errorMessage.style.position = "fixed";
            errorMessage.style.top = "20px";
            errorMessage.style.right = "20px";
            errorMessage.style.backgroundColor = "#f44336";
            errorMessage.style.color = "white";
            errorMessage.style.padding = "15px";
            errorMessage.style.borderRadius = "5px";
            errorMessage.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            document.body.appendChild(errorMessage);
        });
    });
                    
});
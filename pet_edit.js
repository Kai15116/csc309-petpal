// function to handle image selection and display
function handleImageSelect(input, preview) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = "no_image_icon.png"; // reset to the default image
    }
}

// attach event listeners to image inputs
const imageInputs = document.querySelectorAll(".image-input");
const imagePreviews = document.querySelectorAll(".image-preview");

imageInputs.forEach((input, index) => {
    input.addEventListener("change", function() {
        handleImageSelect(input, imagePreviews[index]);
    });
});

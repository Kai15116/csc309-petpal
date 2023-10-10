// get a reference to the button and the form-result-box
const applyButton = document.querySelector('.apply-button');
const formResultBox = document.getElementById('form-result-box');
const errorMessage = document.getElementById('error-message');

// add a click event listener to the button
applyButton.addEventListener('click', function (event) {
    event.preventDefault();

    // show the form-result-box
    formResultBox.classList.remove('d-none');
});
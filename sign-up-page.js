
// reference petShelter Image: https://unsplash.com/photos/A3DPhhAL6Zg?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
const petShelterBGURL = 'images/login-signup-images/alexander-andrews-A3DPhhAL6Zg-unsplash.jpg';
// reference petSeeker Image: https://unsplash.com/ja/写真/PHNvtz8H4WU
const petSeekerBGURL = 'images/login-signup-images/robert-murdock-PHNvtz8H4WU-unsplash.jpg';
const body = document.querySelector('body');
const userTypeSelector = document.querySelector('#user-type');
const formHeader = document.querySelector('#form-header');
const formResultBox = document.querySelector('#form-result-box');
const inputEmailField = document.querySelector('#inputEmail4');
const inputPassWordField = document.querySelector('#inputPassword1');
const inputConfirmPassWordField = document.querySelector('#inputPassword2');
const submitButton = document.querySelector('#form-submission-btn');
const signUpForm = document.querySelector('#sign-up-form');
const inputAddress = document.querySelector('#inputAddress');
const inputProvince = document.querySelector('#inputProvince');
const inputPhone = document.querySelector('#inputPhone');
const errorType = document.querySelector('#error-type');
const errorMessage = document.querySelector('#error-message');
function resetSignUpFields() {
  inputEmailField.value = "";
    inputPhone.value = "";
    inputPassWordField.value="";
    inputConfirmPassWordField.value="";
    inputAddress.value="";
    inputProvince.value="";
    return;
}
// Error For Demo Purpose
signUpForm.addEventListener("submit", function(e) {
  if (inputEmailField.value ==="error@gmail.com") {
    
    
    resetSignUpFields();
    if (formResultBox.classList.contains('d-none')){
      formResultBox.classList.toggle('d-none');
    }
    if (!inputEmailField.classList.contains('is-invalid')) {
      inputEmailField.classList.add("is-invalid");

    }
    
    e.preventDefault();
    
    
    
    
    return false;
    
  } else if (inputPassWordField.value !== inputConfirmPassWordField.value) {
    
    resetSignUpFields();
    if (inputEmailField.classList.contains('is-invalid')) {
      inputEmailField.classList.remove('is-invalid');
    }
    errorType.innerHTML = "Password Fields Do Not Match";
    errorMessage.innerHTML = "Make sure the two passwords you entered are the same."
    if (formResultBox.classList.contains('d-none')){
      formResultBox.classList.toggle('d-none');
    }
    // inputEmailField.classList.toggle("is-invalid");
    
    inputPassWordField.classList.toggle("is-invalid");
    inputConfirmPassWordField.classList.toggle("is-invalid");   
    e.preventDefault();
    return false;
  } else {
    return true;
  }
})

userTypeSelector.addEventListener("change", function() {
  if (userTypeSelector.value == "shelter") {
    // Reference: https://icons.getbootstrap.com/icons/house-heart/
    formHeader.innerHTML = `<span class="pet-shelter-header-text">Pet Shelter </span>Sign Up <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-heart" viewBox="0 0 16 16">
<path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982Z"/>
<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
</svg>`;
    body.style.background = `url(${petShelterBGURL})`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';


  } else {
    // Reference: https://icons.getbootstrap.com/icons/person-bounding-box/
    formHeader.innerHTML = `<span class="pet-seeker-header-text">Pet Seeker </span>Sign Up  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16">
<path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
</svg>`;
    body.style.background = `url(${petSeekerBGURL})`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';

  }
})

  // const optionList = document.querySelector('')


const loginForm = document.querySelector('#login-form');
const petShelterBGURL = 'images/login-signup-images/alexander-andrews-A3DPhhAL6Zg-unsplash.jpg';
const petSeekerBGURL = 'images/login-signup-images/robert-murdock-PHNvtz8H4WU-unsplash.jpg';
const body = document.querySelector('body');
const userTypeSelector = document.querySelector('#user-type');
const formHeader = document.querySelector('#form-header');


const errorDemo = document.querySelector('#form-res-error-demo');
const formResultBox = document.querySelector('#form-result-box');
const inputEmailField = document.querySelector('#inputEmail4');
const inputPassWordField = document.querySelector('#inputPassword4');

loginForm.addEventListener("submit", function(e) {
  if (inputEmailField.value ==="error@gmail.com") {
    
    
    inputEmailField.value = '';
    inputPassWordField.value ='';
    formResultBox.classList.toggle("d-none");
  inputEmailField.classList.toggle("is-invalid");
  inputPassWordField.classList.toggle("is-invalid");

    
    e.preventDefault();
  }
});

// errorDemo.addEventListener("click", function() {
//   inputEmailField.value = '';
//   inputPassWordField.value ='';
//   formResultBox.classList.toggle("d-none");
//   inputEmailField.classList.toggle("is-invalid");
//   inputPassWordField.classList.toggle("is-invalid");
  
  
// })

userTypeSelector.addEventListener("change", function() {
  if (userTypeSelector.value == "shelter") {
    formHeader.innerHTML = `<span class="pet-shelter-header-text">Pet Shelter </span>Login <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-heart" viewBox="0 0 16 16">
<path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982Z"/>
<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
</svg>`;
    body.style.background = `url(${petShelterBGURL})`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';


  } else {
    formHeader.innerHTML = `<span class="pet-seeker-header-text">Pet Seeker </span>Login  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
<path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
</svg>`;
    body.style.background = `url(${petSeekerBGURL})`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';

  }
})

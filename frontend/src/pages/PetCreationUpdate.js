/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useContext } from 'react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import '../styles/pet_creation_and_update.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "../assets/images/image1.jpg"
import image2 from "../assets/images/image2.jpg"
import image3 from "../assets/images/image3.jpg"
import noImage from '../assets/images/no_image_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';

const PetCreationUpdate = () => {
  const {getContextUser} = useContext(userContext);
  const navigate = useNavigate();
  const { petId, shelterId } = useParams();
  const [petInfo, setPetInfo] = useState(null);
  const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();
  const [petTypes, setPetTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);

  // initialize with values from props for editing, or set to initial values if we are creating a pet
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState(1);
  const [petSex, setPetSex] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState(null);
  const [petWeight, setPetWeight] = useState( null);
  const [petFee, setPetFee] = useState(null);
  const [petLocation, setPetLocation] = useState('');
  const [petMedicalHistory, setPetMedicalHistory] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [editMode, setEditMode] = useState(false);

  const [petNameError, setPetNameError] = useState('')
  const [petAgeError, setPetAgeError] = useState('');
  const [petWeightError, setPetWeightError] = useState( '');
  const [petFeeError, setPetFeeError] = useState('');
  const [petLocationError, setPetLocationError] = useState('');
  const [petMedicalHistoryError, setPetMedicalHistoryError] = useState('');
  const [additionalNotesError, setAdditionalNotesError] = useState('');

  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  // image upload error states
  const [imageError1, setImageError1] = useState('');
  const [imageError2, setImageError2] = useState('');
  const [imageError3, setImageError3] = useState('');

  // success message
  const [successMessage, setSuccessMessage] = useState('');

  const handlePetNameChange = (e) => {
    setPetName(e.target.value);
    if (e.target.value !== '') {
      setPetNameError('');
    }
  };
  
  const handlePetAgeChange = (e) => {
    setPetAge(e.target.value);
    if (e.target.value !== '') {
      setPetAgeError('');
    }
  };
  
  const handlePetWeightChange = (e) => {
    setPetWeight(e.target.value);
    if (e.target.value !== '') {
      setPetWeightError('');
    }
  };
  
  const handlePetFeeChange = (e) => {
    setPetFee(e.target.value);
    if (e.target.value !== '') {
      setPetFeeError('');
    }
  };
  
  const handlePetLocationChange = (e) => {
    setPetLocation(e.target.value);
    if (e.target.value !== '') {
      setPetLocationError('');
    }
  };
  
  const handlePetMedicalHistoryChange = (e) => {
    setPetMedicalHistory(e.target.value);
    if (e.target.value !== '') {
      setPetMedicalHistoryError('');
    }
  };
  
  const handleImageChange1 = (e) => {
    setSelectedImage1(e.target.files[0]);
    // clear any previous error message when a new image is selected
    setImageError1('');
  };

  const handleImageChange2 = (e) => {
    setSelectedImage2(e.target.files[0]);
    // clear any previous error message when a new image is selected
    setImageError2('');
  };

  const handleImageChange3 = (e) => {
    setSelectedImage3(e.target.files[0]);
    // clear any previous error message when a new image is selected
    setImageError3('');
  };

  const handleAdditionalNotesChange = (e) => {
    setAdditionalNotes(e.target.value);
    if (e.target.value !== '') {
      setAdditionalNotesError('');
    }
  };

  const extractFileName = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  useEffect(function() {
      async function fetchPetTypes() {
          try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/pets/pettype/`, {
              method: 'GET',
          });
          if (response.status === 403) {
              navigate('/');

              // setAllowAccess(false);
          } else if (response.status >= 200 && response.status < 300) {
              const data = await response.json();
              setPetTypes([...data])
              console.log(data)

          }} catch (e) {
              console.log(e);
              navigate('/');
          }
      }
      fetchPetTypes();

  }, [])


  useEffect(function() {
      async function fetchBreeds() {
          try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/pets/pettype/${petType}/breed`, {
                  method: 'GET',
              });
              if (response.status === 403) {
                  navigate('/');

                  // setAllowAccess(false);
              } else if (response.status >= 200 && response.status < 300) {
                  const data = await response.json();
                  setBreeds([...data])
                  console.log(data)

              }
          } catch (e) {
              console.log(e);
              navigate('/');
          }
      }

      if (petType === 0 || petType) {
          fetchBreeds();
      }

  }, [petType])

  useEffect(function() {
      async function fetchUserInfo() {
          try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/pets/${petId}`, {
              method: 'GET',
          });
          if (response.status === 403) {
              navigate('/');


              // setAllowAccess(false);
          } else if (response.status >= 200 && response.status < 300) {
              const data = await response.json();

              if (data.owner !== contextUserId){
                  console.log(data.owner)
                  console.log(contextUserId)
              }

              setPetInfo({...data})

             
              // set each value based on the data received
              setPetName(data.name || '');
              setPetType(data.breed || '');
              setPetSex(data.sex || '');
              setPetBreed(data.breed || '');
              setPetAge(data.age || null);
              setPetWeight(data.weight || null);
              setPetFee(data.adoption_fee || null);
              setPetLocation(data.adoption_location || '');
              setPetMedicalHistory(data.medical_history || '');

              const blob1 = await fetch(data.picture_1).then((r) => r.blob());
              const file1 = new File([blob1], extractFileName(data.picture_1), { type: "image/jpeg" });
              setSelectedImage1(file1);

              if (data.picture_2){
                  const blob2 = await fetch(data.picture_2).then((r) => r.blob());
                  const file2 = new File([blob2], extractFileName(data.picture_2), { type: "image/jpeg" });
                  setSelectedImage2(file2);
              }

              if (data.picture_3) {
                  const blob3 = await fetch(data.picture_3).then((r) => r.blob());
                  const file3 = new File([blob3], extractFileName(data.picture_3), {type: "image/jpeg"});
                  setSelectedImage3(file3);
              }
              setAdditionalNotes(data.notes || '');
             
              if (petId) {
                setEditMode(true);
              }

              // setAllowAccess(true);
          }} catch (e) {
              console.log(e);
              navigate('/');
          }
      }
      fetchUserInfo();


  }, [ petId ])

  const createPet = () => {  
    // append fields
    const formData = new FormData();
    formData.append('name', petName);
    formData.append('pet_type', petType);
    formData.append('sex', petSex);
    formData.append('breed', petBreed);
    formData.append('age', Number(petAge));
    formData.append('weight', Number(petWeight));
    formData.append('adoption_fee', Number(petFee).toFixed(2));
    formData.append('adoption_location', petLocation);
    formData.append('age', petAge);
    formData.append('medical_history', petMedicalHistory);
    formData.append('notes', additionalNotes);

    formData.append('picture_1', selectedImage1);

    if (selectedImage2)
        formData.append('picture_2', selectedImage2);

    if (selectedImage3)
        formData.append('picture_3', selectedImage3);
  
    // Make a POST request to your server with the FormData
    fetch(`${process.env.REACT_APP_API_URL}/pets/`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then(response => response.json())
      .then(data => {
       // Handle the response from the server
        if (data.id)
            navigate(`/details/${data.id}`)
        console.log('Upload successful:', data);
      })
      .catch(error => {
        console.error('Error creating pet:', error);
      });
  };

  const editPet = () => {
    // append fields
    const formData = new FormData();
    formData.append('name', petName);
    formData.append('pet_type', petType);
    formData.append('sex', petSex);
    formData.append('breed', petBreed);
    formData.append('age', Number(petAge));
    formData.append('weight', Number(petWeight));
    formData.append('adoption_fee', Number(petFee).toFixed(2));
    formData.append('adoption_location', petLocation);
    formData.append('medical_history', petMedicalHistory);
    formData.append('notes', additionalNotes);
  
    formData.append('picture_1', selectedImage1);
    formData.append('picture_2', selectedImage2);
    formData.append('picture_3', selectedImage3);
  
    // make a PUT request to update the pet
    fetch(`${process.env.REACT_APP_API_URL}/pets/${petId}/`, {
      method: 'PUT', 
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log('Edit successful:', data);
      })
      .catch(error => {
        console.error('Error editing pet:', error);
      });
  };

  const validateForm = () => {
    console.log("VALIDATION")
    let formIsValid = true;

    // validate each required field
    if (petName.trim() === '') {
      console.log("BOOM")
      setPetNameError('Name is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    if (petAge === null) {
      setPetAgeError('Age is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    if (petWeight === null) {
      setPetWeightError('Weight is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    if (petFee === null) {
      setPetFeeError('Fee is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    if (petLocation.trim() === '') {
      setPetLocationError('Location is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    if (petMedicalHistory.trim() === '') {
      setPetMedicalHistoryError('Medical History is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    // validate images
    if (!selectedImage1) {
      setImageError1('Image 1 is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    if (!selectedImage2) {
      setImageError2('Image 2 is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    if (!selectedImage3) {
      setImageError3('Image 3 is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    if (additionalNotes.trim() === '') {
      setAdditionalNotesError('Additional Notes is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    return formIsValid;
  };
  
  // handle button click
  const handleButtonClick = () => {
    if (validateForm()) {
      if (editMode) {
        // edit the pet
        editPet();
        setSuccessMessage('Pet edited successfully!');
      } 
      else {
        // create a new pet
        setSuccessMessage('Pet created successfully!');
        createPet();
      }
    }
  };

  return (
    <div className="wrapper">
      <LandingHeader />
      <main class="page-content"> 
        <div>
          {editMode ? (
            <h3>Edit Pet Listing</h3>
          ) : (
            <h3>Post your pet for adoption, it's quick and easy!</h3>
          )}
        </div>
            <div class="background-details">
                <div class="bg-white mt-4 p-4 rounded shadow">
                    <div class="container">
                        <div class="pet-change-details">
                            <h4>1. Pet Details</h4>
                            <form class="form-inputs" action="submit_pet_listing.php" method="POST">
                              <div class="form-group">
                                <label for="name" class="col-sm-2 col-form-label">Pet Name:</label>
                                <div class="col-sm-10">
                                    <input 
                                        type="text" 
                                        class={`form-control ${petNameError ? 'is-invalid' : ''}`}
                                        id="name" 
                                        name="breed" 
                                        value={petName} 
                                        onChange={handlePetNameChange}
                                        required 
                                    />
                                    {petNameError && (
                                        <div className="invalid-feedback">{petNameError}</div>
                                    )}
                                </div>
                              </div>
                                <div class="form-group">
                                    <label for="pet_type">Pet Type:</label>
                                    <select class="form-control" 
                                      id="pet_type" 
                                      name="pet_type" 
                                      value={petType} 
                                      onChange={(e) => setPetType(e.target.value)}
                                      required  
                                    >
                                        {petTypes?.map((item, index) =>
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="sex">Sex:</label>
                                    <select 
                                      class="form-control" 
                                      id="sex" name="sex" 
                                      value={petSex} 
                                      onChange={(e) => setPetSex(e.target.value)}
                                      required
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                  <label for="breed">Breed:</label>
                                  <select 
                                    className="form-control" 
                                    id="breed" name="breed" 
                                    onChange={(e) => setPetBreed(e.target.value)}
                                    required
                                  >
                                        {breeds?.map((item, index) =>
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )}
                                  </select>
                                  {/*<input type="text" class="form-control" id="breed" name="breed" placeholder="ex: Shih Tzu" value={petBreed} onChange={(e) => setPetBreed(e.target.value)}/>*/}
                                </div>

                                <div class="form-group">
                                  <label for="age" class="col-sm-2 col-form-label">Age:</label>
                                  <div class="col-sm-10">
                                      <input type="number" class={`form-control ${petAgeError ? 'is-invalid' : ''}`} id="age" name="age" min="0" max="99" placeholder="0-99" value={petAge} onChange={handlePetAgeChange} required/>
                                      {petAgeError && (
                                          <div class="invalid-feedback">{petAgeError}</div>
                                      )}
                                  </div>
                                </div>

                              <div class="form-group">
                                <label for="weight" class="col-sm-2 col-form-label">Weight (lbs):</label>
                                <div class="col-sm-10">
                                    <input type="number" class={`form-control ${petWeightError ? 'is-invalid' : ''}`} id="weight" name="weight" min="0" max="999" placeholder="0-999" value={petWeight} onChange={handlePetWeightChange} required/>
                                    {petWeightError && (
                                        <div class="invalid-feedback">{petWeightError}</div>
                                    )}
                                </div>
                              </div>

                              <div class="form-group">
                                <label for="adoption_fee" class="col-sm-2 col-form-label">Adoption Fee (CAD):</label>
                                <div class="col-sm-10">
                                    <div class="input-group">
                                        <span class="input-group-text">$</span>
                                        <input type="number" class={`form-control ${petFeeError ? 'is-invalid' : ''}`} id="adoption_fee" name="adoption_fee" step="0.01" placeholder="Use 0 for free adoption" value={petFee} onChange={handlePetFeeChange} required/>
                                    </div>
                                    {petFeeError && (
                                        <div class="invalid-feedback">{petFeeError}</div>
                                    )}
                                </div>
                              </div>

                              <div class="form-group">
                                  <label for="addressLine1" class="col-sm-2 col-form-label">Adoption Location:</label>
                                  <div class="col-sm-10">
                                      <input type="text" class={`form-control ${petLocationError ? 'is-invalid' : ''}`} id="addressLine1" placeholder="ex: address, city" value={petLocation} onChange={handlePetLocationChange} required/>
                                      {petLocationError && (
                                          <div class="invalid-feedback">{petLocationError}</div>
                                      )}
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label for="medical_history" class="col-sm-2 col-form-label">Medical History:</label>
                                  <div class="col-sm-10">
                                      <input type="text" class={`form-control ${petMedicalHistoryError ? 'is-invalid' : ''}`} id="medical_history" name="medical_history" placeholder="vaccines received, allergies, etc" value={petMedicalHistory} onChange={handlePetMedicalHistoryChange} required/>
                                      {petMedicalHistoryError && (
                                          <div class="invalid-feedback">{petMedicalHistoryError}</div>
                                      )}
                                  </div>
                              </div>

                            </form>
                            </div>
                        </div>
                    </div>   
                </div>
                <div class="bg-white mt-4 p-4 rounded shadow">
                  <div class="container">
                    <div class="pet-change-details">
                      <h4>2. Media</h4>
                        <h6>Include photos with different angles and environments</h6>
                        <div className="row">
                          <div className="col-4">
                            <label htmlFor="image1" className="image-label">
                              <input
                                type="file"
                                className="image-input"
                                id="image1"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange1}
                              />
                              <div className="image-container">
                                <img
                                  src={selectedImage1 ? URL.createObjectURL(selectedImage1) : noImage}
                                  alt="Image 1"
                                  className="img-fluid image-preview"
                                />
                              </div>
                            </label>
                          </div>
                          <div className="col-4">
                            <label htmlFor="image2" className="image-label">
                              <input
                                type="file"
                                className="image-input"
                                id="image2"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange2}
                              />
                              <div className="image-container">
                                <img
                                  src={selectedImage2 ? URL.createObjectURL(selectedImage2) : noImage}
                                  alt="Image 2"
                                  className="img-fluid image-preview"
                                />
                              </div>
                            </label>
                          </div>
                          <div className="col-4">
                            <label htmlFor="image3" className="image-label">
                              <input
                                type="file"
                                className="image-input"
                                id="image3"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange3}
                              />
                              <div className="image-container">
                                <img
                                  src={selectedImage3 ? URL.createObjectURL(selectedImage3) : noImage}
                                  alt="Image 3"
                                  className="img-fluid image-preview"
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="bg-white mt-4 p-4 rounded shadow">
                    <div class="container">
                          <div class="pet-change-details">
                            <h4 >3. Additional Details</h4>
                            <h6>Include any notable details about the pet's behaviour and traits for the new owner</h6>
                            <form class="form-inputs" action="submit_pet_listing.php" method="POST">
                              {/* <div class="form-group">
                                  <label for="additional_notes">Additional Notes:</label>
                                  <textarea class={`form-control ${additionalNotesError ? 'is-invalid' : ''}`} id="additional_notes" name="additional_notes" rows="4" value={additionalNotes} onChange={handleAdditionalNotesChange} required></textarea>
                              </div> */}
                              <div class="form-group">
                                <label for="additional_notes" class="col-sm-2 col-form-label">Additional Notes:</label>
                                <div class="col-sm-10">
                                <textarea class={`form-control ${additionalNotesError ? 'is-invalid' : ''}`} id="additional_notes" name="additional_notes" rows="4" value={additionalNotes} onChange={handleAdditionalNotesChange} required></textarea>
                                    {additionalNotesError && (
                                        <div class="invalid-feedback">{additionalNotesError}</div>
                                    )}
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                    </div>
                    <div class="confirm-button"> 
                      <button
                        className="btn btn-primary btn-lg btn-xl post-button"
                        // href={editMode ? "edit_pets.html" : "my_pets.html"}
                        onClick={()=>{handleButtonClick()}}
                      >
                        {editMode ? "Edit Pet Listing" : "Post Pet Listing"}
                      </button>
                      {imageError1 && (
                      <div className="alert alert-danger mt-4" role="alert">
                        {imageError1}
                      </div>
                    )}

                    {imageError2 && (
                      <div className="alert alert-danger mt-4" role="alert">
                        {imageError2}
                      </div>
                    )}

                    {imageError3 && (
                      <div className="alert alert-danger mt-4" role="alert">
                        {imageError3}
                      </div>
                    )}
                    {successMessage && (
                      <div className="alert alert-success mt-4" role="alert">
                        {successMessage}
                      </div>
                    )}    
                    <div>
                </div>
            </div> 
            <div class="d-flex pet-creation-graphic" id="post-pet">
              <div
                className="ms-5 p-2 my-auto"
                style={{
                  backgroundImage: "linear-gradient(rgb(0, 0, 0, 0.4), rgb(0, 0, 0, 0.4))",
                  width: "60%",
                }}
              >
                <h1 className="mb-2" style={{ color: "#87CEEB" }}>
                  Post your pet, find them a new home!
                </h1>
                <p className="text-light">
                  By posting your pet on our site, you can make a profound difference in the
                  lives of both animals in need and caring individuals looking to provide a
                  loving home, opening the door to a brighter future for pets who may have
                  experienced hardship or abandonment. Post your pet today and be a part of
                  this wonderful journey of compassion and companionship!
                </p>
              </div>;
            </div>     
      </main>
      <Footer />
    </div>
  );
};

export default PetCreationUpdate;
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useContext } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import Footer from '../components/Footer';
import '../styles/pet_creation_and_update.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "../assets/images/image1.jpg"
import image2 from "../assets/images/image2.jpg"
import image3 from "../assets/images/image3.jpg"
import noImage from '../assets/images/no_image_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
const baseURL = "http://localhost:8000/media/pet_images/";

const PetCreationUpdate = () => {
  const {getContextUser} = useContext(userContext);
  const navigate = useNavigate();
  const { petId, shelterId } = useParams();
  const [petInfo, setPetInfo] = useState(null);
  const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();

  // initialize with values from props for editing, or set to initial values if we are creating a pet
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petSex, setPetSex] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState(null);
  const [petWeight, setPetWeight] = useState( null);
  const [petFee, setPetFee] = useState(null);
  const [petLocation, setPetLocation] = useState('');
  const [petMedicalHistory, setPetMedicalHistory] = useState('');
  const [uploadedImages, setUploadedImages] = useState([noImage, noImage, noImage]);
  const [uploadedImagesToStr, setUploadedImagesToStr] = useState(["noImage.jpg", "noImage.jpg", "noImage.jpg"]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [editMode, setEditMode] = useState(false);

  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  const handleImageChange1 = (e) => {
    setSelectedImage1(e.target.files[0]);
  };
  const handleImageChange2 = (e) => {
    setSelectedImage2(e.target.files[0]);
  };
  const handleImageChange3 = (e) => {
    setSelectedImage3(e.target.files[0]);
  };

  const extractFileName = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };
  
  useEffect(function() {
      async function fetchUserInfo() {
          try {
              const response = await fetch(`http://localhost:8000/pets/${petId}`, {
              method: 'GET',
          });
          if (response.status === 403) {
              navigate('/');


              // setAllowAccess(false);
          } else if (response.status >= 200 && response.status < 300) {
              const data = await response.json();

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

              const blob2 = await fetch(data.picture_2).then((r) => r.blob());
              const file2 = new File([blob2], extractFileName(data.picture_2), { type: "image/jpeg" });
              setSelectedImage2(file2);

              const blob3 = await fetch(data.picture_3).then((r) => r.blob());
              const file3 = new File([blob3], extractFileName(data.picture_3), { type: "image/jpeg" });
              setSelectedImage3(file3);

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
    formData.append('picture_2', selectedImage2);
    formData.append('picture_3', selectedImage3);
  
    // Make a POST request to your server with the FormData
    fetch(`http://localhost:8000/pets/`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log('Upload successful:', data);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
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
    fetch(`http://localhost:8000/pets/${petId}/`, {
      method: 'PUT', // TODO: put and patch is not allowed
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
  
  // handle button click
  const handleButtonClick = () => {
    if (editMode) {
      // edit the pet
      editPet();
    } 
    else {
      // create a new pet
      createPet();
    }
  };

  return (
    <div className="wrapper">
      <ProfileHeader />
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
                        <div class="pet-details">
                            <h4>1. Pet Details</h4>
                            <form class="form-inputs" action="submit_pet_listing.php" method="POST">
                            <div class="form-group">
                              <label for="name">Pet Name:</label>
                              <input type="text" class="form-control" id="name" name="breed" value={petName} onChange={(e) => setPetName(e.target.value)} />
                            </div>
                                <div class="form-group">
                                    <label for="pet_type">Pet Type:</label>
                                    <select class="form-control" id="pet_type" name="pet_type" value={petType} onChange={(e) => setPetType(e.target.value)}>
                                        <option value="Dog">Dog</option>
                                        <option value="Cat">Cat</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="sex">Sex:</label>
                                    <select class="form-control" id="sex" name="sex" value={petSex} onChange={(e) => setPetSex(e.target.value)}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                  <label for="breed">Breed:</label>
                                  <input type="text" class="form-control" id="breed" name="breed" placeholder="ex: Shih Tzu" value={petBreed} onChange={(e) => setPetBreed(e.target.value)}/>
                                </div>

                                <div class="form-group">
                                    <label for="age">Age:</label>
                                    <input type="number" class="form-control" id="age" name="age" min="0" max="99" placeholder="0-99" value={petAge} onChange={(e) => setPetAge(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                    <label for="weight">Weight (lbs):</label>
                                    <input type="number" class="form-control" id="weight" name="weight" min="0" max="999" placeholder="0-999" value={petWeight} onChange={(e) => setPetWeight(e.target.value)}/>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="weight">Adoption Fee (CAD):</label>
                                    <span class="input-group-text">$</span>
                                    <input type="number" class="form-control" id="adoption_fee" name="adoption_fee" step="0.01" placeholder="Use 0 for free adoption" value={petFee} onChange={(e) => setPetFee(e.target.value)}/>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="addressLine1" class="form-label">Adoption Location:</label>
                                    <input type="text" class="form-control" id="addressLine1" placeholder="ex: address, city" value={petLocation} onChange={(e) => setPetLocation(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                    <label for="medical_history">Medical History:</label>
                                    <input type="text" class="form-control" id="medical_history" name="medical_history" placeholder="vaccines received, allergies, etc" value={petMedicalHistory} onChange={(e) => setPetMedicalHistory(e.target.value)}/>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>   
                </div>
                <div class="bg-white mt-4 p-4 rounded shadow">
                  <div class="container">
                    <div class="pet-details">
                      <h4>2. Media</h4>
                        <h6>Include photos with different angles and environments (JPEG Required)</h6>
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
                        <div class="pet-details">
                            <h4 >3. Additional Details</h4>
                            <h6>Include any notable details about the pet's behaviour and traits for the new owner</h6>

                            <form class="form-inputs" action="submit_pet_listing.php" method="POST">
                                <div class="form-group">
                                    <label for="additional_notes">Additional Notes:</label>
                                    <textarea class="form-control" id="additional_notes" name="additional_notes" rows="4" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)}></textarea>
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
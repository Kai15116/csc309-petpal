/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'; 
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import '../styles/pet_creation_and_update.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import noImage from '../assets/images/no_image_icon.png'; 

export default function PetCreationUpdate(props) {
  // initialize with values from props for editing, or set to initial values if we are creating a pet
  const [petName, setPetName] = useState(props.petName || '');
  const [petType, setPetType] = useState(props.petType || '');
  const [petSex, setPetSex] = useState(props.petSex || '');
  const [petBreed, setPetBreed] = useState(props.petBreed || ''); 
  const [petAge, setPetAge] = useState(props.petAge || null);
  const [petWeight, setPetWeight] = useState(props.petWeight || null);
  const [petFee, setPetFee] = useState(props.petFee || null);
  const [petLocation, setPetLocation] = useState(props.petLocation || '');
  const [petMedicalHistory, setPetMedicalHistory] = useState(props.petMedicalHistory || ''); 
  const [uploadedImages, setUploadedImages] = useState(props.uploadedImages || [noImage, noImage, noImage]);
  const [additionalNotes, setAdditionalNotes] = useState(props.additionalNotes || '');
  
  // determine if user is editing existing pet, if mode not provided it's creating by default
  // eslint-disable-next-line no-unused-vars
  const [editMode, setEditMode] = useState(props.editMode || false);

  const handleImageSelect = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const newPreviews = [...uploadedImages];
        newPreviews[index] = e.target.result;
        setUploadedImages(newPreviews);
      };
      reader.readAsDataURL(file);
    } else {
      // reset to the default image
      const newPreviews = [...uploadedImages];
      newPreviews[index] = 'images/no_image_icon.png';
      setUploadedImages(newPreviews);
    }
  };

  return (
    <div className="wrapper">
      <LandingHeader />
      <main class="page-content">  
        <div>
          {editMode ? (
            <h3>Edit Pet Listing: {petName}</h3>
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
                        <h6>Include photos with different angles and environments (4:3 Aspect Ratio Recomended)</h6>
                        <div className="row">
                          {[1, 2, 3].map((index) => (
                            <div className="col-4" key={index}>
                              <label htmlFor={`image${index}`} className="image-label">
                                <input
                                  type="file"
                                  className="image-input"
                                  id={`image${index}`}
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={(e) => handleImageSelect(index - 1, e.target.files[0])}
                                />
                                <img
                                  src={uploadedImages[index - 1]}
                                  alt={`Image ${index}`}
                                  className="img-fluid image-preview"
                                />
                              </label>
                            </div>
                          ))}
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
                      <a
                        className="btn btn-primary btn-lg btn-xl post-button"
                        href={editMode ? "edit_pets.html" : "my_pets.html"}
                        role="button"
                      >
                        {editMode ? "Edit Pet Listing" : "Post Pet Listing"}
                      </a>   
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


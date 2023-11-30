/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import '../styles/details_and_adoption.css';
import image1 from "../assets/images/image1.jpg"
import image2 from "../assets/images/image2.jpg"
import image3 from "../assets/images/image3.jpg"
import noImage from "../assets/images/image-not-found-scaled.png"
import ShelterCard from '../components/ShelterCard';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';


const PetDetails = () => {
  const navigate = useNavigate();
  const {petId} = useParams();
  const [petInfo, setPetInfo] = useState(null);
  const [petName, setPetName] = useState('');
  const [petSex, setPetSex] = useState('');
  const [petBreed, setPetBreed] = useState(''); 
  const [petAge, setPetAge] = useState(null);
  const [petWeight, setPetWeight] = useState( null);
  const [petFee, setPetFee] = useState(null);
  const [petLocation, setPetLocation] = useState('');
  const [petMedicalHistory, setPetMedicalHistory] = useState(''); 
  const [petStatus, setPetStatus] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([noImage, noImage, noImage]);
  const [additionalNotes, setAdditionalNotes] = useState('');

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
              console.log(data)
              
              // set each value based on the data received
              setPetName(data.name || '');
              setPetSex(data.sex || '');
              setPetBreed(data.breed || '');
              setPetAge(data.age || null);
              setPetWeight(data.weight || null);
              setPetFee(data.adoption_fee || null);
              setPetLocation(data.adoption_location || '');
              setPetMedicalHistory(data.medical_history || '');
              setPetStatus(data.status || '');
              setUploadedImages([
                getPetImage(data.picture_1),
                getPetImage(data.picture_2),
                getPetImage(data.picture_3),
              ]);
              setAdditionalNotes(data.notes || '');

              // setAllowAccess(true);
          }} catch (e) {
              console.log(e);
              navigate('/');
          }
      }
      fetchUserInfo();

  }, [ petId ])

  // helper function to get image given url that is stored in object
  const getPetImage = (key) => {
    // Create a dictionary for images within the function
    const petImages = {
      "http://localhost:8000/media/pet_images/image1.jpg": image1,
      "http://localhost:8000/media/pet_images/image2.jpg": image2,
      "http://localhost:8000/media/pet_images/image3.jpg": image3,
    };

    // return no image photo if image not found
    return petImages[key] || noImage;
  };


  // helper function to format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };


  return (
    <div className="wrapper">
      <LandingHeader />
      <main class="page-content">        
      <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={uploadedImages[0]} alt="Image 1"/>
            <Carousel.Caption>
              <h2>Meet {petName}!</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={uploadedImages[1]} alt="Image 2" />
            <Carousel.Caption>
              <h5>Give {petName} A Loving Home</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={uploadedImages[2]} alt="Image 3" />
            <Carousel.Caption>
              <h5>{petName} Is Waiting For Wonderful Parents </h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      <div class="background-details">
          <div class="container" id="pet-details-container">
              <div class="pet-details">
                  <h1>Get To Know Lalo</h1>
                  <div class="d-flex pet_details_and_shelter">
                      <div class="col-lg-6">
                          <table class="table">
                              <tbody>
                              <tr>
                                <th scope="row"><strong>Sex:</strong></th>
                                <td>{petSex}</td>
                              </tr>
                              <tr>
                                <th scope="row"><strong>Breed:</strong></th>
                                <td>{petBreed}</td>
                              </tr>
                              <tr>
                                <th scope="row"><strong>Age:</strong></th>
                                <td>{`${petAge} Years`}</td>
                              </tr>
                              <tr>
                                <th scope="row"><strong>Weight:</strong></th>
                                <td>{`${petWeight} lbs`}</td>
                              </tr>
                              <tr>
                                <th scope="row"><strong>Adoption Fee:</strong></th>
                                <td>{`$${petFee}`}</td>
                              </tr>
                              <tr>
                                <th scope="row"><strong>Posted Date:</strong></th>
                                <td>{formatDate(petLocation)}</td>
                              </tr>
                              <tr>
                                <th scope="row"><strong>Location:</strong></th>
                                <td>{petLocation}</td>
                              </tr>
                              <tr>
                                <th scope="row"><strong>Medical History:</strong></th>
                                <td>{petMedicalHistory}</td>
                              </tr>
                              <tr>
                                <th scope="row"><strong>Adoption Status:</strong></th>
                                <td>{petStatus}</td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                      <div className="pet_details_and_shelter">
                        {/* Replace the existing shelter card code with the Shelter component */}
                        <ShelterCard
                          name="Toronto Zoo Escapees"
                          profileLink="shelter_profile_view_unauth.html"
                          stars={['', '', '', '']} // Add stars as needed
                          reviewCount={123}
                          joinDate="Sep. 21, 2023"
                        />
                      </div>
                  </div>
                  <div class="col-lg-12" id="owner-notes">
                    <h2>Owner Notes:</h2>
                    <ul>
                      {additionalNotes &&
                        additionalNotes.split('.').map((sentence, index) => (
                          <li key={index}>{sentence.trim()}{index < additionalNotes.split('.').length - 1 && '.'}</li>
                        ))}
                    </ul>
                  </div>
                  <Link to="/adoption" role="button">
                    <a class="btn btn-primary btn-lg apply-button" href="adoption.html" role="button">Apply For Adoption</a>
                  </Link>
                  </div>
                </div>
            </div>
        </main>
      <Footer />
    </div>
  );
};

export default PetDetails;

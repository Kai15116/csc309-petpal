/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useContext} from 'react';
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
import {userContext} from "../context/userContext";


const PetDetails = () => {
  const navigate = useNavigate();
  const {petId} = useParams();
  const [petInfo, setPetInfo] = useState(null);
  const [petName, setPetName] = useState('');
  const [petSex, setPetSex] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petBreedName, setPetBreedName] = useState('');
  const [petAge, setPetAge] = useState(null);
  const [petWeight, setPetWeight] = useState( null);
  const [petFee, setPetFee] = useState(null);
  const [petLocation, setPetLocation] = useState('');
  const [petMedicalHistory, setPetMedicalHistory] = useState('');
  const [petStatus, setPetStatus] = useState(false);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const { getContextUser } = useContext(userContext);
  const user = getContextUser()
  const extractFileName = (url) => {
    if (!url)
        return noImage
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  useEffect(function() {
      async function fetchPet() {
          try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/pets/${petId}`, {
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
              setPetBreedName(data.breed_name || '');
              setPetAge(data.age || null);
              setPetWeight(data.weight || null);
              setPetFee(data.adoption_fee || null);
              setPetLocation(data.adoption_location || '');
              setPetMedicalHistory(data.medical_history || '');
              setPetStatus(data.status || '');

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

              // setAllowAccess(true);
          }} catch (e) {
              console.log(e);
              navigate('/');
          }
      }
      fetchPet();

  }, [ petId ])

    useEffect(function () {
        async function fetchUserInfo() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/shelter/${petInfo?.owner}`, {
                    method: 'GET'
                }
            );
            if (response.status >= 400) {
                navigate('/');
            } else if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                setUserInfo({...data})
                console.log(data)
            }} catch (e) {
                console.log(e)
                navigate('/');
            }
        }
        if (petInfo)
            fetchUserInfo();
    }, [petInfo]);

  // helper function to format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };


  return (
    <div className="wrapper pet-details-page">
      <LandingHeader />
      <main className="page-content kareem-carousel-container">
      <Carousel id="kcarousel" style={{height: "40vh"}}>
          <Carousel.Item id="kcarousel">
            <img
              src={selectedImage1 ? URL.createObjectURL(selectedImage1) : noImage}
              alt="Image 1"
              className="d-block"
            />
            <Carousel.Caption id="kcarousel" >
              <h2>Meet {petName}!</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item id="kcarousel" >
            <img
              src={selectedImage2 ? URL.createObjectURL(selectedImage2) : noImage}
              alt="Image 2"
              className="d-block"
            />
            <Carousel.Caption id="kcarousel" >
              <h5>Give {petName} A Loving Home</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item id="kcarousel" >
            <img
              src={selectedImage3 ? URL.createObjectURL(selectedImage3) : noImage}
              alt="Image 3"
              className="d-block"
            />
            <Carousel.Caption id="kcarousel" >
              <h5>{petName} Is Waiting For Wonderful Parents </h5>
            </Carousel.Caption>
          </Carousel.Item>
      </Carousel>
      <div class="background-details">
          <div class="container" id="pet-details-container">
              <div className="pet-details ">
                  <div className="d-flex justify-content-center align-items-center">
                      <h1>Get To Know {petName}</h1>
                      {petInfo?.owner === user?.contextUserId && <a className="btn btn-secondary ms-3 mb-auto" href={`/petCreateUpdate/${petInfo?.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen"
                             viewBox="0 0 16 16">
                      <path
                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                  </a>}
                  </div>
                  <div class="d-flex pet_details_and_shelter">
                      <div class="col-lg-6" style={{"marginRight": "20px"}}>
                          <table class="table">
                              <tbody>
                              <tr>
                                <th scope="row"><strong>Sex:</strong></th>
                                <td>{petSex ? petSex : "Unknown/Others"}</td>
                              </tr>
                              <tr>
                                <th scope="row"><strong>Breed:</strong></th>
                                <td>{petBreedName ? petBreedName : "Unknown/Others"}</td>
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
                                <td>{formatDate(petInfo?.created_at)}</td>
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
                      <div className="pet_details_and_shelter shelter-card-wrapper" style={{marginLeft: "32px"}}>
                        {/* Replace the existing shelter card code with the Shelter component */}
                        <ShelterCard name={userInfo?.username} profileLink={`/shelterprofile/${userInfo?.id}`} stars={userInfo?.avg_rating}
                                     reviewCount={userInfo?.review_count}
                                     joinDate={new Date(Date.parse(userInfo?.created_at))}
                                     profilePicUrl={userInfo?.profile_picture} bannerPicUrl={userInfo?.banner}>
                        </ShelterCard>
                      </div>
                  </div>
                  <div class="col-lg-12" id="owner-notes" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <h2>Owner Notes:</h2>
                    <ul>
                      {additionalNotes &&
                        additionalNotes.split('.').map((sentence, index) => (
                          <li key={index}>{sentence.trim()}{index < additionalNotes.split('.').length - 1 && '.'}</li>
                        ))}
                    </ul>
                  </div>
                  {user?.contextUserType === "seeker" && petInfo?.status === "available" && <Link to={`/adoption/${petId}`} role="button">
                    <button class="btn btn-primary btn-lg apply-button" >Apply For Adoption</button>
                  </Link>}
                  </div>
                </div>
            </div>
        </main>
      <Footer />
    </div>
  );
};

export default PetDetails;

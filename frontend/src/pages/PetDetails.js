/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import '../styles/details_and_adoption.css'; 
import image1 from "../assets/images/image1.jpg"
import image2 from "../assets/images/image2.jpg"
import image3 from "../assets/images/image3.jpg"
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
                // setAllowAccess(true);
            }} catch (e) {
                console.log(e);
                navigate('/');
            }
        }
        fetchUserInfo();

    }, [ petId ])

  return (
    <div className="wrapper">
      <LandingHeader />
      <main class="page-content">        
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={image1} alt="Image 1" />
            <Carousel.Caption>
              <h2>Meet Lalo!</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={image2} alt="Image 2" />
            <Carousel.Caption>
              <h5>Give Lalo A Loving Home</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={image3} alt="Image 3" />
            <Carousel.Caption>
              <h5>Another Meaningful Caption</h5>
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
                                  <td>Male</td>
                              </tr>
                              <tr>
                                  <th scope="row"><strong>Breed:</strong></th>
                                  <td>American Bobtail</td>
                              </tr>
                              <tr>
                                  <th scope="row"><strong>Age:</strong></th>
                                  <td>0 Years/6 Months</td>
                              </tr>
                              <tr>
                                  <th scope="row"><strong>Weight:</strong></th>
                                  <td>11.464 lbs</td>
                              </tr>
                              <tr>
                                  <th scope="row"><strong>Adoption Fee:</strong></th>
                                  <td>$125</td>
                              </tr>
                              <tr>
                                  <th scope="row"><strong>Posted Date:</strong></th>
                                  <td>March 20, 2022</td>
                              </tr>
                              <tr>
                                  <th scope="row"><strong>Location:</strong></th>
                                  <td>27 King's College Cir, Toronto</td>
                              </tr>
                              <tr>
                                  <th scope="row"><strong>Medical History:</strong></th>
                                  <td>5 Vacinations (Polio, Flu, etc)</td>
                              </tr>
                              <tr>
                                <th scope="row"><strong>Adoption Status:</strong></th>
                                <td>Available</td>
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
                      <li>Lalo is a very nice cat</li>
                      <li>He loves to be curious and is always exploring stuff</li>
                      <li>This cat is great for big families</li>
                      <li>He's always ready for a new adventure, and ensuring his safety is a top priority</li>
                      <li>Lalo can't wait to find his forever home, where he'll continue to be the warrior with the heart of gold!</li>
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

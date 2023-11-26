/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import '../styles/details_and_adoption.css'; 
import image1 from "../assets/images/image1.jpg"
import image2 from "../assets/images/image2.jpg"
import image3 from "../assets/images/image3.jpg"
import shelterPortrait from "../assets/example_images/shelter_portrait.jpg"
import Shelter from './Shelter'; // Make sure to use the correct path
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const PetDetails = () => {
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
                        <Shelter
                          name="Toronto Zoo Escapees"
                          profileLink="shelter_profile_view_unauth.html"
                          stars={['', '', '', '']} // Add stars as needed
                          reviewCount={123}
                          joinDate="Sep. 21, 2023"
                          bannerImage="example_images/shelter_portrait.jpg"
                        />
                      </div>
                      {/* <div class="col-lg-6">
                          <div class="card text-center" id="profile-card">
                          <div className="mb-4 banner">
                            <img
                              className="mt-3 mx-auto rounded-circle border text-center d-flex flex-column justify-content-center"
                              src={shelterPortrait}
                              alt="Shelter Portrait"
                              style={{ width: '80px', height: '80px', transform: 'translate(0, 50%)' }}
                            />
                          </div>                    
                        
                              <div class="card-body d-flex flex-column justify-content-center mt-2">
                                <h5 class="card-title">Toronto Zoo Escapees</h5>
                                <a href="shelter_profile_view_unauth.html" class="card-link link-underline link-underline-opacity-0"><b>View Profile</b></a>
                            
                            
                                <div class="d-flex my-4 m-auto">
                                <div style={{ width: '30%', justifyContent: 'center' }} className="d-flex my-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                      <path
                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                                      />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      class="bi bi-star-fill" viewBox="0 0 16 16">
                                      <path
                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      class="bi bi-star-fill" viewBox="0 0 16 16">
                                      <path
                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      class="bi bi-star-fill" viewBox="0 0 16 16">
                                      <path
                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
                                      <path
                                        d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"
                                      />
                                    </svg>

                                  </div>
                                  <div class="vr mx-2"></div>
                                  <div className="my-auto text-muted" style={{ width: '30%' }}>123 reviews</div>
                                  <div className="vr mx-2"></div>
                                  <div className="text-muted my-auto" style={{ width: '30%' }}>Joined Sep. 21, 2023</div>

                                </div>
                              </div>
                            </div>
                      </div> */}
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
                    <a class="btn btn-primary btn-lg apply-button" href="adoption.html" role="button">Apply For Adoption</a>
                  </div>
                </div>
            </div>
        </main>
      <Footer />
    </div>
  );
};

export default PetDetails;

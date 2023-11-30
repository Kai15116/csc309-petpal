import React, {useContext, useEffect, useState} from 'react';
import '../styles/myPets.css'
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import userImage from '../assets/example_images/shelter_portrait.jpg';
import {userContext} from "../context/userContext";
import {Col, Row} from "react-bootstrap";
import PetCard from "../components/PetCard";
import SimplePetCard from "../components/SimplePetCard";

const MyPets = () => {
    const { getContextUser, setContextUser} = useContext(userContext);
    const user = getContextUser()

    const [myPets, setMyPets] = useState(null);

    useEffect(function () {
        async function fetchPets() {
            try {
                const response = await fetch(`http://localhost:8000/pets?owner=${user?.contextUserId}`, {
                    method: 'GET',
                });

                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    console.log(data)
                    setMyPets([...data])
                } else if (response.status === 404) {
                    alert(404);
                } else {
                    console.log(response.status)
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchPets();
    }, []);

    return (
        <div className="bg-body-tertiary my-0 ">
        <LandingHeader/>
        <div className="container-fluid d-flex flex-column justify-content-center py-5" >
        <div className="d-flex mx-auto" id="my-pets-main-container">

          <div className="d-flex flex-column justify-content-center" id="profile-container">
            <div className="card text-center" id="profile-card">
              <div className="mb-4 banner">
                <img className="mt-3 mx-auto rounded-circle border text-center d-flex flex-column justify-content-center"
                  src={userImage} style={{width: "80px", height: "80px", transform: "translate(0, 50%)"}} alt="user icon"></img>
              </div>


              <div className="card-body d-flex flex-column justify-content-center mt-2">
                <h5 className="card-title">Toronto Zoo Escapees</h5>
                <a href={`/shelterprofile/${user?.contextUserId}`} className="card-link link-underline link-underline-opacity-0"><b>View
                    Profile</b></a>


                <div className="d-flex my-4 mx-auto">
                  <div className="d-flex my-auto" style={{width: "30%"}}>
                    {/*https://icons.getbootstrap.com/icons/star-fill/ */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    {/*https://icons.getbootstrap.com/icons/star-half/ */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="bi bi-star-half" viewBox="0 0 16 16">
                      <path
                        d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                    </svg>
                  </div>
                  <div className="vr mx-2"></div>
                  <div className="my-auto text-muted" style={{width: "30%"}}>123 reviews</div>
                  <div className="vr mx-2"></div>
                  <div className="text-muted my-auto" style={{width: "30%"}}>Joined Sep. 21, 2023</div>
                </div>
              </div>
            </div>

            <ul className="list-group flex-column mt-5">
              <li className="list-group-item active">
                <a className="nav-link" href="/mypets">My Pets</a>
              </li>
              <li className="list-group-item">
                <a className="nav-link" href="/applications">Applications</a>
              </li>
            </ul>
          </div>

          <div id="lst-container">
            <div className="d-flex">
              <h1 className="ms-1 mb-0">My Pets</h1>
              <a className="btn btn-secondary ms-auto align-self-end" href="/petscreation">Add New Pet</a>
            </div>
            <hr></hr>
            <div className="d-grid" id="pets-grid">
                {myPets?.map((pet, index) => <SimplePetCard key={index} size="12rem" {...pet}></SimplePetCard>)}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    );
};

export default MyPets;
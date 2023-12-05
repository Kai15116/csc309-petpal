import React, {useContext, useEffect, useState} from 'react';
import '../styles/shelterManagement.css'
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import {userContext} from "../context/userContext";
import SimplePetCard from "../components/SimplePetCard";
import ShelterCard from "../components/ShelterCard";
import {useNavigate, useParams} from "react-router-dom";

const MyPets = () => {
    const { getContextUser, setContextUser} = useContext(userContext);
    const user = getContextUser()

    const [myPets, setMyPets] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const { shelterId } = useParams();
    let id;
    if (shelterId)
        id = shelterId
    else
        id = user?.contextUserId
    const isOwner = user?.contextUserId === Number(shelterId) || !shelterId

    useEffect(function () {
        async function fetchPets() {
            try {
                const response = await fetch(`http://localhost:8000/pets?owner=${id}`, {
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

        async function fetchUserInfo() {

            try {
                const response = await fetch(`http://localhost:8000/accounts/shelter/${id}`, {
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
        fetchUserInfo();
        fetchPets();
    }, []);

    return (
        <div className="bg-body-tertiary my-0 ">
        <LandingHeader/>
        <div className="container-fluid d-flex flex-column justify-content-center py-5" >
        <div className="d-flex mx-auto" id="my-pets-main-container">

          <div className="d-flex flex-column justify-content-center" id="profile-container">
            <ShelterCard name={userInfo?.username} profileLink={`shelterprofile/${id}`} stars={3.5} reviewCount={123} joinDate="2023, Jan. 1"></ShelterCard>

              {isOwner &&
            <ul className="list-group flex-column mt-5" style={{width: "100%"}}>
              <li className="list-group-item active">
                <a className="nav-link" href="/mypets">My Pets</a>
              </li>
              <li className="list-group-item">
                <a className="nav-link" href="/applications">Applications</a>
              </li>
            </ul> }
          </div>

          <div id="lst-container">
            <div className="d-flex">
              <h1 className="ms-1 mb-0">{isOwner ? "My Pets" : "Pets" }</h1>
                {isOwner && <button
                    className="btn btn-secondary ms-auto align-self-end"
                    onClick={() => navigate("/petCreateUpdate")}
                    >
                    Add New Pet
                </button>}
            </div>
            <hr></hr>
            <div className="d-grid" id="pets-grid">
                {myPets?.map((pet, index) => <SimplePetCard key={index} size="12rem" {...pet}></SimplePetCard>)}
            </div>
            {myPets?.length === 0 && <h3 className="ms-2 text-secondary">No pets found . . . </h3>}
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    );
};

export default MyPets;
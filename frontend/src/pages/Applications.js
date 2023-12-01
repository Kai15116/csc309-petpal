import React, {useContext, useEffect, useState} from 'react';
import '../styles/shelterManagement.css'
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import {userContext} from "../context/userContext";
import SimplePetCard from "../components/SimplePetCard";
import ShelterCard from "../components/ShelterCard";
import {useNavigate} from "react-router-dom";

const Applications = () => {
    const { getContextUser, setContextUser} = useContext(userContext);
    const user = getContextUser()

    const [myApplications, setMyApplications] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(function () {
        async function fetchApplications() {
            try {
                const response = await fetch(`http://localhost:8000/applications?size=8&page=1`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                    }
                });

                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    console.log(data)
                    setMyApplications({...data})
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
                const response = await fetch(`http://localhost:8000/accounts/shelter/${user?.contextUserId}`, {
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
        fetchApplications();
    }, []);

    return (
        <div className="bg-body-tertiary my-0 ">
        <LandingHeader/>
        <div className="container-fluid d-flex flex-column justify-content-center py-5" >
        <div className="d-flex mx-auto" id="my-pets-main-container">

          <div className="d-flex flex-column justify-content-center" id="profile-container">
              <ShelterCard name={userInfo?.username} profileLink={`shelterprofile/${user?.contextUserId}`} stars={3.5} reviewCount={123} joinDate="2023, Jan. 1"></ShelterCard>

            <ul className="list-group flex-column mt-5" style={{width: "100%"}}>
              <li className="list-group-item">
                <a className="nav-link" href="/mypets">My Pets</a>
              </li>
              <li className="list-group-item active">
                <a className="nav-link" href="/applications">Applications</a>
              </li>
            </ul>
          </div>

          <div className="d-flex flex-column" id="lst-container" style={{minWidth: "40vw"}}>
            <div className="d-flex">
              <h1 className="ms-1 mb-0">Applications</h1>
            </div>
            <hr></hr>
            <ul className="list-group" >
                {myApplications?.results?.map((application, index) => <>
                    <li className="list-group-item" >
                        <b>Happy Dog</b>
                        <div className="d-flex">
                            <div className="text-muted">From: {application.name}</div>
                            <div className="px-2"></div>
                            <div className="text-muted ms-auto">{new Date(Date.parse(application.created_at)).toLocaleDateString("en-US", dateOptions)}</div>
                            <a className="stretched-link" href={`/application/${application.id}`}></a>
                        </div>
                    </li>
                </>)}
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    );
};

export default Applications;
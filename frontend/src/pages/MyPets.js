import React, {useContext, useEffect, useMemo, useState} from 'react';
import '../styles/shelterManagement.css'
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import {userContext} from "../context/userContext";
import SimplePetCard from "../components/SimplePetCard";
import ShelterCard from "../components/ShelterCard";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import CPagination from "../components/CPagination";

// Reference Lecture example: URL parser.
function to_url_params(object) {
    var result = [];
    for (const key in object) {
        if (Array.isArray(object[key])) {
            for (const value of object[key]) {
                result.push(`${key}[]=${value}`);
            }
        }
        else {
            let value = object[key];
            if (value !== "") {
            result.push(`${key}=${value}`);
            }
        }
    }
    return result.join('&');
}

const MyPets = () => {
    const { getContextUser, setContextUser} = useContext(userContext);
    const user = getContextUser()

    const [myPets, setMyPets] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const { shelterId } = useParams();

    const [ searchParams, setSearchParams ] = useSearchParams();
    const query = useMemo(() => ({
        page : parseInt(searchParams.get("page") ?? 1),
        size: parseInt(searchParams.get("size") ?? 12),
    }), [searchParams]);
    const pagesCount = Math.ceil(myPets?.count / query?.size);
    const noResult = myPets?.count === 0 || isNaN(pagesCount);

    let id;
    if (shelterId)
        id = shelterId
    else
        id = user?.contextUserId
    const isOwner = user?.contextUserId === Number(shelterId) || !shelterId

    // used for pagination state management
    const setcurrentActivePage = (value) => {
        setSearchParams({...query, page : value})
    }

    useEffect(function () {
        const urlParams = to_url_params({...query, owner: id});
        async function fetchPets() {
            try {
                const response = await fetch(`http://localhost:8000/pets?${urlParams}`, {
                    method: 'GET',
                });

                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    console.log(data)
                    setMyPets({...data})
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
            <ShelterCard name={userInfo?.username} profileLink={`shelterprofile/${id}`} stars={userInfo?.avg_rating}
                         reviewCount={userInfo?.review_count}
                         joinDate={new Date(Date.parse(userInfo?.created_at))}
                         profilePicUrl={userInfo?.profile_picture} bannerPicUrl={userInfo?.banner}>
            </ShelterCard>

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
                {myPets?.results?.map((pet, index) => <SimplePetCard key={index} size="12rem" {...pet}></SimplePetCard>)}
            </div>
              {!noResult && <div className="mt-4">
                   <CPagination setcurrentActivePage={setcurrentActivePage} currentActivePage={query?.page} pagesCount={pagesCount}/>
              </div>}
            {noResult && <h3 className="ms-2 text-secondary">No pets found . . . </h3>}
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    );
};

export default MyPets;
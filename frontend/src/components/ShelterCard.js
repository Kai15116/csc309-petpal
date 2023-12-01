import React from 'react';
import shelterPortrait from "../assets/example_images/shelter_portrait.jpg"
import '../styles/details_and_adoption.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

import banner from "../assets/example_images/yosemite_banner.jpg"


const ShelterCard = ({ name, profileLink, stars, reviewCount, joinDate }) => {
  console.log(banner)
  return (
    // <div className="col-lg-6" style={{ width: '500px' }}>
      <div className="card text-center" id="profile-card">
        <div className="mb-4 banner" style={{backgroundImage: `url(${banner})`,
                                             backgroundSize: "cover"}}>
          <img
            className="mt-3 mx-auto rounded-circle border text-center d-flex flex-column justify-content-center"
            src={shelterPortrait}
            alt="Shelter Portrait"
            style={{ width: '80px', height: '80px', transform: 'translate(0, 50%)' }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-center mt-2">
          <h5 className="card-title">{name}</h5>
          <a href={profileLink} className="card-link link-underline link-underline-opacity-0">
            <b>View Profile</b>
          </a>
          <div className="d-flex my-4 m-auto">
            <div style={{ width: '30%', justifyContent: 'center' }} className="d-flex my-auto">
              {[...Array(5)].map((item, index) => {
                if (index < Math.floor(stars)){
                  return <i key={index} className="bi bi-star-fill"></i>
                } else if (index === Math.floor(stars) && stars % 1 !== 0) {
                  return <i key={index} className="bi bi-star-half"></i>
                }else {
                  return <i key={index} className="bi bi-star"></i>
                }
              })}

              {/* Add the half star if needed */}
            </div>
            <div className="vr mx-2"></div>
            <div className="my-auto text-muted" style={{ width: '30%' }}>{reviewCount} reviews</div>
            <div className="vr mx-2"></div>
            <div className="text-muted my-auto" style={{ width: '30%' }}>Joined {joinDate}</div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default ShelterCard;

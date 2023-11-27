import React from 'react';
import shelterPortrait from "../assets/example_images/shelter_portrait.jpg"
import '../styles/details_and_adoption.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const ShelterCard = ({ name, profileLink, stars, reviewCount, joinDate }) => {
  return (
    <div className="col-lg-6" style={{ width: '500px' }}>
      <div className="card text-center" id="profile-card">
        <div className="mb-4 banner">
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
              {stars.map((star, index) => (
                <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                  <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                  />
                </svg>
              ))}
              {/* Add the half star if needed */}
            </div>
            <div className="vr mx-2"></div>
            <div className="my-auto text-muted" style={{ width: '30%' }}>{reviewCount} reviews</div>
            <div className="vr mx-2"></div>
            <div className="text-muted my-auto" style={{ width: '30%' }}>Joined {joinDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterCard;

/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useContext } from 'react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import '../styles/details_and_adoption.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicationForm from "../components/ApplicationForm";
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';

const Adoption = () => {
  const {getContextUser} = useContext(userContext);
  const { petId } = useParams();
  const {accessToken} = getContextUser();
  const navigate = useNavigate();

  const handleApplicationSubmit = (adoptionInputs) => {
    console.log("Form submitted with data:", adoptionInputs);
    // append fields
    const formData = new FormData();
    formData.append('name', adoptionInputs.name);
    formData.append('phone_number', adoptionInputs.phone);
    formData.append('email', adoptionInputs.email);
    formData.append('address', adoptionInputs.address);
    formData.append('qualifications', adoptionInputs.qualitiesDescription);
    formData.append('digital_signature', adoptionInputs.signature);
    formData.append('pet', petId);
  
    // Make a POST request to your server with the FormData
    fetch(`http://localhost:8000/applications/`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log('Upload successful:', data);
        navigate(`/application/${data.id}`)
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div className="wrapper">
      <LandingHeader />
      <main className="page-content">
        <div className="background-adoption">
          <div className="container" id="pet-details-container">
            <ApplicationForm onSubmit={handleApplicationSubmit} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Adoption;


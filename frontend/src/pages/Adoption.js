/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'; 
import ProfileHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import '../styles/details_and_adoption.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicationForm from "../components/ApplicationForm";

export default function Adoption() {
  return (
    <div className="wrapper">
      <ProfileHeader />
      <main className="page-content">
        <div className="background-adoption">
          <div className="container" id="pet-details-container">
              <ApplicationForm/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};


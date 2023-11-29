import React from 'react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
// Fake pet details page, only for test purposes.
const PetDetails = () => {
  const navigate = useNavigate();
  const {petId} = useParams();
  const [petInfo, setPetInfo] = useState(null);

    useEffect(function() {
        async function fetchPetInfo() {
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
        fetchPetInfo();

    }, [ petId ])
  return (
    <div>
      <LandingHeader />
      <div>
        <h2>Pet Details Page Content</h2>
      </div>
      <Footer />
    </div>
  );
};

export default PetDetails;

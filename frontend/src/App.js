import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import PetDetails from './pages/PetDetails';
import SignUp from './pages/SignUp';
import { userContext, useUserContext } from './context/userContext';
import SeekerProfile from './pages/SeekerProfile';
import ShelterProfile from './pages/ShelterProfile';
import SearchFilter from './pages/SearchFilter';
import Adoption from './pages/Adoption';
import PetCreationUpdate from './pages/PetCreationUpdate';
import BlogCreationUpdate from './pages/BlogCreationUpdate';
import ShelterBlogs from './pages/ShelterBlogs';

const App = () => {
  return (
    <Router>
      <div>
        {/* Your common layout or navigation goes here */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/details/:petId" element={<PetDetails />} />
          <Route path="/adoption" element={<Adoption />} />
          
          {/* creating pets by shelter */}
          <Route path="/petCreateUpdate" element={<PetCreationUpdate />} />
          {/* updating pets by shelter */}
          <Route path="/petCreateUpdate/:petId" element={<PetCreationUpdate />} />
          
          {/* creating blog by shelter */}
          <Route path="/blogCreateUpdate" element={<BlogCreationUpdate />} />
          {/* updating blog by shelter */}
          <Route path="/blogCreateUpdate/:blogId" element={<BlogCreationUpdate />} />

          {/* blogs by all shelters */}
          <Route path="/blogs" element={<ShelterBlogs />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;


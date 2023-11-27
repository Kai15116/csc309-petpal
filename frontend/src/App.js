import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import PetDetails from './pages/PetDetails';
import SignUp from './pages/SignUp';
import Adoption from './pages/Adoption';
import PetCreationUpdate from './pages/PetCreationUpdate';

const App = () => {
  return (
    <Router>
      <div>
        {/* Your common layout or navigation goes here */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/details" element={<PetDetails />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/createUpdate" element={<PetCreationUpdate />} />
          {/* Add more routes for additional pages */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


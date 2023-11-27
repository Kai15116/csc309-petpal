import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import PetDetails from './pages/PetDetails';
import SignUp from './pages/SignUp';
import { userContext, useUserContext } from './context/userContext';

const App = () => {
  return (
    <userContext.Provider value={useUserContext()}>
    <Router>
      <div>
        {/* Your common layout or navigation goes here */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/details" element={<PetDetails />} />
          {/* Add more routes for additional pages */}
        </Routes>
      </div>
    </Router>
    </userContext.Provider>
  );
};

export default App;



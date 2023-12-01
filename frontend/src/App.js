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
import ShelterList from './pages/ShelterList';
import NotFound from './pages/NotFound';
import NotificationPage from './pages/NotificationPage';

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
          <Route path="/details/:petId" element={<PetDetails />} />
          <Route path="/searchpage" element={<SearchFilter/>}/>
          <Route path="/seekerprofile/:userId" element={<SeekerProfile />} />
          <Route path="/shelterprofile/:userId" element={<ShelterProfile />} />
          <Route path='/shelters' element={<ShelterList/>}/>
          <Route path='/notifications/:userId' element={<NotificationPage></NotificationPage>}/>
          <Route path='*' element={<NotFound/>}/>

          {/* Add more routes for additional pages */}
        </Routes>
      </div>
    </Router>
    </userContext.Provider>
  );
};

export default App;



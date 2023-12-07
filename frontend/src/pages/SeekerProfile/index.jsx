import {useContext, useState, useEffect} from "react";
import { userContext } from "../../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
import LandingHeader from "../../components/LandingHeader";
import Footer from "../../components/Footer";
import SeekerProfileDetailsCard from "../../components/Profile/SeekerProfileDetails";


function SeekerProfile() {
    const {getContextUser} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);
    // current user profile's user id.
    const {userId} = useParams(); 
    const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();
    // const [allowAccess, setAllowAccess] = useState(false)
    const navigate = useNavigate();

    useEffect(function() {
        async function fetchUserInfo() {
            try { 
                const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/seeker/${userId}`, {
                method: 'GET',
                headers: {

                    'Authorization': `Bearer ${accessToken}`,
                    
                }
            });
            if (response.status === 403) {
                navigate('/');
                
                // setAllowAccess(false);
            } else if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                console.log("this is " + data)
                setUserInfo({...data})
                // setAllowAccess(true);
            }} catch (e) {
                console.log(e);
                navigate('/');
            }
            
            
        }
        fetchUserInfo();

    }, [ userId ])
    
    return (
        <div className="bg-body-tertiary my-0 ">
            <LandingHeader/>
                <div className="container-fluid d-flex flex-column justify-content-center py-5" >
                    <div className="d-flex mx-auto" id="my-pets-main-container">

                        <div className="d-flex flex-column justify-content-center align-items-e" id="profile-container">
                            <SeekerProfileDetailsCard 
                                contextUserId={contextUserId}
                                userInfo={userInfo}
                            />
                        </div>

                        {/* <div id="lst-container">
                            <div className="d-flex">
                                <h1 className="ms-1 mb-0"> Applications </h1>
                            </div>
                            <hr></hr>
                            <div className="d-grid" id="pets-grid">
                                {myPets?.map((pet, index) => <SimplePetCard key={index} size="12rem" {...pet}></SimplePetCard>)}
                            </div>
                        </div> */}
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default SeekerProfile;
import {useContext, useState, useEffect} from "react";
import { userContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Stack, Image } from "react-bootstrap";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import ShelterPetCarouselCard from "../components/profile/ShelterPetCarousel";
import ShelterProfileDetailsCard from "../components/profile/ShelterProfileDetails";
import ShelterReviewsCard from "../components/profile/ShelterReviews";
import ExampleBanner from "../assets/example_images/yosemite_banner.jpg"
import ShelterProfileBanner from "../components/profile/ShelterProfileBanner";

function ShelterProfile() {
    const {getContextUser} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);
    // current user profile's user id.
    const {userId} = useParams(); 
    const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();
    // const [allowAccess, setAllowAccess] = useState(false)
    const navigate = useNavigate();

    async function deleteShelter() {
        try { 
            const response = await fetch(`http://localhost:8000/accounts/shelter/${userId}`, {
                method: 'DELETE',
                headers: {

                    'Authorization': `Bearer ${accessToken}`,
                    
                }
            }
        );
        if (response.status >= 400) {
            navigate('/');
            
            // setAllowAccess(false);
        } else if (response.status >= 200 && response.status < 300) {
            return;
            // const data = await response.json();
            // setUserInfo({...data})
            // console.log(userInfo)
            // setAllowAccess(true);
        }} catch (e) {
            console.log(e)
            navigate('/');
        }
        

        navigate('/shelters')
        
        
    }

    useEffect(function() {
        async function fetchUserInfo() {
            try { 
                const response = await fetch(`http://localhost:8000/accounts/shelter/${userId}`, {
                    method: 'GET'
                }
            );
            if (response.status >= 400) {
                navigate('/');
                
                // setAllowAccess(false);
            } else if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                setUserInfo({...data})
                console.log(userInfo)
                // setAllowAccess(true);
            }} catch (e) {
                console.log(e)
                navigate('/');
            }
            
            
        }
        fetchUserInfo();

    }, [ userId ])

    return (
        <div style={{ backgroundColor: "#C8F4FF"}}>
            <LandingHeader />
            <ShelterProfileBanner
                contextUserId={contextUserId} 
                userInfo={userInfo}
            />
            <Container className="pt-3 pb-5" style={{ backgroundColor: "#C8F4FF"}}>
                <Row style={{ width: "100%" }}>
                    <Col className="shelter-profile-col" xs={12} sm={3}>
                        <div className="test-div"></div>
                        <ShelterProfileDetailsCard
                            userInfo={userInfo}
                        /> 
                    </Col>
                    <Col xs={12} sm={6}>
                        <Stack gap={3}>
                            <ShelterPetCarouselCard />
                        </Stack>
                    </Col>
                    <Col xs={12} sm={3}>
                        <ShelterReviewsCard />
                    </Col>
                </Row>

                {/* <div>
                    <h1>This is from user context</h1>
                    <h2>{accessToken}</h2>
                    <h2>{contextUserId}</h2>
                    <h2>{contextUserType}</h2>
                    <input></input>
                </div>
                <div>
                    <h1>This is from the api.</h1>
                    <h2>{userInfo?.id}</h2>
                    <h2>{userInfo?.username}</h2>
                    <h2>{userInfo?.email}</h2>
                    <h2>{userInfo?.address}</h2>
                    <h2>{userInfo?.created_at}</h2>
                </div> */}
            </Container>
            <Footer />
        </div>
    )
}
                // <div>
                //     {/* Just testing there might be changes you have to make later. */}
                //     {userInfo?.id === contextUserId && <Button onClick={deleteShelter}>Delete Shelter</Button>}
                // </div>
export default ShelterProfile;
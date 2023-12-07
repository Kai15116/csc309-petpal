import {useContext, useState, useEffect} from "react";
import "./style.css";
import { userContext } from "../../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Stack, Image, Card } from "react-bootstrap";
import LandingHeader from "../../components/LandingHeader";
import Footer from "../../components/Footer";
import ShelterPetCarouselCard from "../../components/Profile/ShelterPetCarousel";
import ShelterProfileDetailsCard from "../../components/Profile/ShelterProfileDetails";
import ShelterReviewsCard from "../../components/Profile/ShelterReviews";
import ShelterProfileBanner from "../../components/Profile/ShelterProfileBanner";
import ExampleMilky from "../../assets/example_images/milky3.jpg";

function ShelterProfile() {
    const {getContextUser} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);
    // current user profile's user id.
    const {userId} = useParams(); 
    const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();
    const user = getContextUser();
    // const [allowAccess, setAllowAccess] = useState(false)
    const navigate = useNavigate();

    async function deleteShelter() {
        try { 
            const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/shelter/${userId}`, {
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
                const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/shelter/${userId}`, {
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
                        {/* <div className="test-div"></div> */}
                        <Image 
                            className="test-div" 
                            src={userInfo?.profile_picture ? userInfo?.profile_picture : ExampleMilky}
                            style={{
                                backgroundColor: "#FAAF75", 
                                minWidth: "15rem", 
                                maxWidth: "15rem",
                                minHeight: "15rem", 
                                maxHeight: '15rem',
                                borderRadius: '7.5rem',
                            }} 
                            alt="Profile Picture"
                        />
                        <ShelterProfileDetailsCard
                            userInfo={userInfo}
                            userId={userId}
                        /> 
                    </Col>
                    <Col xs={12} sm={6}>
                        <Stack gap={3}>
                            <Card>
                                <Card.Body>
                                    <Card.Title><h4>Our Mission</h4></Card.Title>
                                    <Card.Text>
                                        {
                                            (userInfo?.mission_statement !== null && userInfo?.mission_statement !== '') ? 
                                            userInfo?.mission_statement : 
                                            "It looks like you do not have a mission statement. Here is some filler text to simulate what it would be like. You may set one up in the edit profile section by clicking the icon next to the banner title. This instruction text is meant to fill the space so you can see what it is like to have a mission statement."
                                        }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <ShelterPetCarouselCard 
                                shelterId={userId}
                            />
                        </Stack>
                    </Col>
                    <Col xs={12} sm={3}>
                        <ShelterReviewsCard 
                            userContext={user}
                            objectId={userId}
                            for={'shelter'}
                        />
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
import {useContext, useState, useEffect} from "react";
import { userContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Stack, Image, ListGroup } from "react-bootstrap";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import ShelterPetCarouselCard from "../components/profile/ShelterPetCarousel";
import ShelterProfileDetailsCard from "../components/profile/ShelterProfileDetails";
import ShelterReviewsCard from "../components/profile/ShelterReviews";
import ExampleBanner from "../assets/example_images/yosemite_banner.jpg"
import ShelterProfileBanner from "../components/profile/ShelterProfileBanner";
import ShelterCard from "../components/ShelterCard";


function ViewShelterPets() {
    const {getContextUser} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);
    const userId = useParams();
    const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();
    const navigate = useNavigate();

    return (
        <div>
            <LandingHeader />
            <Container className="p-0" style={{ minHeight: "82vh", backgroundColor: "#C8F4FF"}}>
                <Row className="justify-content-center" style={{ width: "100%", backgroundColor: "#FFF4FF"}}>
                    <Col xs={12} sm={4}>
                        <div >
                            <ShelterCard />
                        </div>
                        <ListGroup as="ul" className="mt-5">
                            <ListGroup.Item as="li" active> My Pets </ListGroup.Item>
                            <ListGroup.Item as="li"> Applications </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xs={12} sm={8}>
                        <div>

                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default ViewShelterPets;
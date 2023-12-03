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

function ViewShelterPets() {
    const {getContextUser} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);
    const userId = useParams();
    const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();
    const navigate = useNavigate();

    return (
        <div>
            <LandingHeader />
            <Container>
                Shelter ID: {userId}
                Shelter Name: {userId.username}
                Your ID: {contextUserId.id}
                Your Name: {contextUserId.username}
            </Container>
        </div>
    );
}

export default ViewShelterPets;
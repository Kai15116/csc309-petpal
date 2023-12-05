import React, {useContext, useEffect, useState} from 'react';
import LandingHeader from '../../components/LandingHeader';
import Footer from '../../components/Footer';
import './style.css'
import PetCard from '../../components/PetCard'
import {Col, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { userContext } from '../../context/userContext';

const Landing = () => {
    const { getContextUser } = useContext(userContext);
    const {contextUserType} = getContextUser();
    const [topDogs, setTopDogs] = useState(null);
    const [topCats, setTopCats] = useState(null);
    const navigate = useNavigate();

    if (contextUserType === "shelter"){
        navigate("/mypets")
    }

    useEffect(function () {

        async function fetchPets(type) {
            try {
                const response = await fetch(`http://localhost:8000/pets?size=5&page=1&pet_type=${type}`, {
                    method: 'GET',
                });

                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    console.log(data)
                    return data
                } else if (response.status === 404) {
                    alert(404);
                } else {
                    console.log(response.status)
                }
            } catch (e) {
                console.log(e);
            }
        }

        async function fetchCats(){
            const data = await fetchPets(1)
            setTopCats({...data})
        }

        async function fetchDogs(){
            const data = await fetchPets(2)
            setTopDogs({...data})
        }
        fetchCats();
        fetchDogs();
    }, []);

      return (
          <>
        <div>
            <LandingHeader />
            <div>
              <div className="d-flex flex-column justify-content-center text-center" id="landing-main-container">
                <h1 className="text-light pb-3">Find your lovely pets!</h1>
                <form className="mx-auto" role="search" style={{width: "600px", minWidth: "35%", maxWidth: "90%"}} action="/searchpage" method="GET">
                  <div className="input-group">
                    <input type="search" className="form-control" placeholder="Search here..." aria-label="Search"
                           aria-describedby="search-btn-nav" name="name"></input>
                    <button className="btn btn-primary" type="submit" id="search-btn-nav">Search</button>
                  </div>
                </form>
              </div>

              <div className="d-flex flex-column" style={{backgroundColor: "rgb(237, 237, 237)"}}>
                <h1 className="m-4">Dogs Near By:</h1>
                <Row className="card-container mx-4" xs={1} md={2} lg={3} xl={5}>
                    {topDogs?.results?.map((pet, index) => <Col key={index}><PetCard pet={{...pet}}></PetCard></Col>)}
                </Row>
              </div>

              <div className="d-flex flex-column pb-4" style={{backgroundColor: "rgb(237, 237, 237)"}}>
                <h1 className="m-4">Cats Near By:</h1>
                <Row className="card-container mx-4" xs={1} md={2} lg={3} xl={5}>
                    {topCats?.results?.map((pet, index) => <Col key={index}><PetCard pet={{...pet}}></PetCard></Col>)}
                </Row>
              </div>


              <div className="d-flex" id="become-pet-shelter">
                <div className="mx-5 p-2 my-auto"
                  style={{backgroundImage: "linear-gradient(rgb(0, 0, 0, 0.4), rgb(0, 0, 0, 0.4))", width: "700px", maxWidth: "100%"}}>
                  <h1 className="mb-2" style={{"color": "#87CEEB"}}>Are you willing to become a pet shelter?</h1>
                  <p className="text-light"> At our pet adoption website, we believe in the power of compassion and love to change
                    lives—both for animals in need and for those seeking a faithful companion. By considering the noble role of
                    becoming a pet shelter, you open your heart and your home to animals longing for a second chance at happiness.
                    It's a commitment that requires dedication, patience, and a profound love for animals. Together, we can make a
                    difference in the lives of countless furry friends, providing them with the love and care they deserve while
                    bringing joy and fulfillment to your own life. Join us on this heartwarming journey of saving lives and forging
                    lifelong bonds.</p>
                    <Link to="/signup" className="btn btn-light" role="button">Become a pet shelter!</Link>

                </div>
              </div>
            </div>
        </div>
              <Footer/>
          </>
      );
};

export default Landing;

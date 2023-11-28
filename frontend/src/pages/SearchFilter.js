import { useState,  useEffect } from "react";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form, FloatingLabel, FormGroup, FormControl, FormLabel, Alert} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PetCard from "../components/PetCard";
import { useNavigate } from "react-router-dom";

function SearchFilter() {
    // TODO: Change this to actual cards, with paginations
    const [pets, setPets] = useState([]);
    // const pets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11]
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    useEffect(function () {
        async function fetchPets() {
            try { 
                const response = await fetch(`http://localhost:8000/pets`, {
                method: 'GET',
            });
            
            if (response.status >= 200 && response.status < 300) {
                const data = await response.json();

                setPets([...data])
                console.log(data)
               
            } else {
                console.log(response.status)

            }} catch (e) {
                console.log(e);
                navigate('/');
            }
        }
        fetchPets();

    }, [])


    return (
        <div style={{background: `#F5F5F5`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition:"center", minHeight: "100vh", paddingBottom: "4.5rem"}}>
            <LandingHeader />
            <div>
                <Alert variant="secondary" style={{marginTop: "5px", paddingLeft: "3rem"}}>
                    Found *** matching results
                </Alert>
                <div style={{display: "flex", justifyContent: "right", paddingRight: "3rem"}}>
                <Button variant="outline-primary" onClick={handleShow} style={{fontWeight: "500"}}>
                    Show Filters<i className="bi bi-sort-down"></i>
                </Button>

                </div>
                <div style={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", alignItems: "center"}}>
                    {pets.map((pet, index) => <PetCard key={index} {...pet}></PetCard>)}
                </div>

                <Offcanvas show={show} onHide={handleClose} >
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{fontSize: "33px"}}> Dream Pet Access </Offcanvas.Title>
                    </Offcanvas.Header>
                    <hr></hr>
                    <Offcanvas.Body>
                        
                    
                    <Form>
                        <FormGroup className="mb-3">
                            <FloatingLabel label="Category">
                            <Form.Select className="border-secondary">

                            <option>Select All</option>
                            <option>1</option>
                            <option>2</option>

                            </Form.Select>
                               
                            </FloatingLabel>
                                
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FloatingLabel label="Breed">
                            <Form.Select className="border-secondary">

                                <option>Select All</option>
                                <option>1</option>
                                <option>2</option>

                                </Form.Select>
                            </FloatingLabel>
                                
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FloatingLabel label="Age">
                                <Form.Select className="border-secondary">

                                <option>Select All</option>
                                <option>1</option>
                                <option>2</option>

                                </Form.Select>
                                
                            </FloatingLabel>
                                
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FloatingLabel label="Size">
                            <Form.Select className="border-secondary">
                                    <option>Select All</option>
                                    <option>1</option>
                                    <option>2</option>
                                </Form.Select>
                            </FloatingLabel>
                                
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FloatingLabel label="Gender:">
                            <Form.Select className="border-secondary">
                                    <option>Select Both</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </Form.Select>
                            </FloatingLabel>
                                
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FloatingLabel label="Color">
                            <Form.Select className="border-secondary">
                                    <option>Select All</option>
                                    <option>1</option>
                                    <option>2</option>
                                </Form.Select>
                            </FloatingLabel>
                                
                        </FormGroup>
                        <FormGroup className="mb-3">
                        <Button className="w-100 outline-primary">Apply Filter</Button>

                        </FormGroup>
                        
                        
                    </Form>
                    <hr style={{borderWidth: "2px"}}></hr>
                    
                    <Form>
                        <FormGroup className="mb-3 mt-4">
                            <FloatingLabel label="Sort By">
                            <Form.Select className="border-primary">

                            <option>Relavence</option>
                            <option>Name&#8593;(A to Z)</option>
                            <option>Name&#8595;(Z to A)</option>
                            <option>Age&#8595;(1 to 8+)</option>
                            <option>Age&#8595;(8+ to 1)</option>
                            <option>Size&#8595;(light to heavy)</option>
                            <option>Size&#8595;(heavy to light)</option>
                            </Form.Select>
                               
                            </FloatingLabel>
                                
                        </FormGroup>
                        <FormGroup className="mb-3">
                        <Button className="w-100">Start Sorting</Button>

                        </FormGroup>

                    </Form>        
                    </Offcanvas.Body>
                </Offcanvas>

                <div className="text-center border-danger border">Pagination right here</div>
            </div>
            <Footer />
      </div>
    )
}

export default SearchFilter;

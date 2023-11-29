import { useState,  useEffect, useMemo } from "react";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form, FloatingLabel, FormGroup, Alert, Col, Row} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PetCard from "../components/PetCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import CPagination from "../components/CPagination";


// Reference Lecture example: URL parser.
function to_url_params(object) {
    var result = [];
    for (const key in object) {
        if (Array.isArray(object[key])) {
            for (const value of object[key]) {
                result.push(`${key}[]=${value}`);
            }
        }
        else {
            let value = object[key];
            result.push(`${key}=${value}`);
        }
    }
    return result.join('&');
}

function SearchFilter() {
    // TODO: Change this to actual cards, with paginations
    // const [currentActivePage, setcurrentActivePage] = useState(1);
    const itemsPerPage = 5;
    const [petsInfo, setPetsInfo] = useState(null);
    const [sortOption, setSortOption] = useState("");

    // newly added (Not working)
    const [ searchParams, setSearchParams ] = useSearchParams();
    const query = useMemo(() => ({
        page : parseInt(searchParams.get("page") ?? 1),
        size: parseInt(searchParams.get("size") ?? 5),
        // age__gte : searchParams.get("age__gte" ?? 0),
        // age__lte : searchParams.get("age__lte" ?? 9999),
        // weight__gte : searchParams.get("weight__gte" ?? 0),
        // weight__lte : searchParams.get("weight__lte" ?? 9999),
        // sex : searchParams.getAll("sex") ?? ["male", "female"],
        order_by : searchParams.get("order_by") ?? "name",
    }), [searchParams]);
    // (Not working)

    // used for pagination state management
    const setcurrentActivePage = (value) => {
        setSearchParams({...query, page : value})
    }

    // filter side Offcanvas 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // router navigation
    const navigate = useNavigate();

    useEffect(function () {
        const urlParams = to_url_params(query);
        async function fetchPets() {
            try { 
                const response = await fetch(`http://localhost:8000/pets?${urlParams}`, {
                method: 'GET',
            });
            
            if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                setPetsInfo({...data})
                
                console.log(data)
               
            } else {
                console.log(response.status)

            }} catch (e) {
                console.log(e);
                navigate('/');
            }
        }
        fetchPets();

    }, [query]);

    const pagesCount = Math.ceil(petsInfo?.count / query?.size);
    const noResult =petsInfo?.count === 0 || isNaN(pagesCount);


    return (
        // TODO: filter using searchParams. (After backend is done)
        <div style={{background: `#F5F5F5`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition:"center", minHeight: "100vh", paddingBottom: "4.5rem"}}>
            <LandingHeader />
            <div>
                <Alert variant={noResult?"danger":"secondary"} style={{marginTop: "5px", paddingLeft: "3rem"}}>
                    {noResult ? 
                    <><i class="bi bi-exclamation-triangle"></i>"Sorry, no result is found. Try clear the filter and try again."</> :
                    `Found ${petsInfo?.count??0} matching results in ${pagesCount??1} pages`}
                </Alert>
                <div style={{display: "flex", justifyContent: "right", paddingRight: "3rem"}}>
                <Button variant="outline-primary" onClick={handleShow} style={{fontWeight: "500"}}>
                    Show Filters<i className="bi bi-sort-down"></i>
                </Button>

                </div>
                <div style={{width: "90%", margin: "0 auto", minHeight: "60vh"}}>
                <Row className="" xs={1} md={2} lg={3} xl={4} >
                    {petsInfo?.results?.map((pet, index) => <Col  key={index}><PetCard {...pet}></PetCard></Col>)}
                </Row>
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
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
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
                    
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        setSearchParams({...query, order_by: sortOption, page: 1});
                        setShow(false);
                        }}>
                        <FormGroup className="mb-3 mt-4">
                            <FloatingLabel label="Sort By">
                            <Form.Select className="border-primary" onChange={(e) => setSortOption(e.target.value)}>

                            <option value="">Relavence</option>
                            <option value="name">Name&#8593;(A to Z)</option>
                            <option value="-name">Name&#8595;(Z to A)</option>
                            <option value="age">Age&#8595;(1 to 8+)</option>
                            <option value="-age">Age&#8595;(8+ to 1)</option>
                            <option value="weight">Size&#8595;(light to heavy)</option>
                            <option value="-weight">Size&#8595;(heavy to light)</option>
                            </Form.Select>
                               
                            </FloatingLabel>
                                
                        </FormGroup>
                        <FormGroup className="mb-3">
                        <Button className="w-100" type="submit">Start Sorting</Button>

                        </FormGroup>

                    </Form>        
                    </Offcanvas.Body>
                </Offcanvas>

                
            </div>
            {!noResult && <CPagination setcurrentActivePage={setcurrentActivePage} currentActivePage={query?.page} pagesCount={pagesCount}/>}
            <Footer />
      </div>
   
    )
}

export default SearchFilter;

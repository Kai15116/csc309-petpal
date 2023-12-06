import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import { Alert, Container, Accordion, useAccordionButton, Button, ListGroup, Card, Row, Col, AccordionContext, Form, Modal, AccordionCollapse} from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

function CollapseButton({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <ListGroup.Item 
        action 
        onClick={decoratedOnClick}
        // style={{ backgroundColor: isCurrentEventKey ? "#EEEEEE" : "100%" }}
    >
        {children}
    </ListGroup.Item>
  );
}

function ProfileEdit() {
    const { getContextUser, setGetContextUser} = useContext(userContext);
    const user = getContextUser();
    const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();
    const [userInfo, setUserInfo ] = useState(null);
    const navigate = useNavigate();

    // Accounts have these attributes
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [profpic, setProfPic] = useState('');
    const [banner, setBanner] = useState('');
    // Shelter has these attributes
    const [mission, setMission] = useState('');
    const [name, setName] = useState('');

    const [formError, setFormError] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function deleteAccount() {
        if (contextUserType === 'shelter') {
            try { 
                const response = await fetch(`http://localhost:8000/accounts/shelter/${contextUserId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                }
            );
            if (response.status >= 400) {
                navigate('/');
                
            } else if (response.status >= 200 && response.status < 300) {
                return;
            }} catch (e) {
                console.log(e)
                navigate('/');
            }
        } else if (contextUserType === 'seeker') {
            try { 
                const response = await fetch(`http://localhost:8000/accounts/seeker/${contextUserId}`, {
                    method: 'DELETE',
                    headers: {

                        'Authorization': `Bearer ${accessToken}`,
                        
                    }
                }
            );
            if (response.status >= 400) {
                navigate('/');
                
            } else if (response.status >= 200 && response.status < 300) {
                return;
            }} catch (e) {
                console.log(e)
                navigate('/');
            }
        }

        navigate('/');
    }

    useEffect( function () {
        async function fetchUserInfo() {
            if (contextUserType === 'shelter') {
                try {
                    const response = await fetch(`http://localhost:8000/accounts/shelter/${contextUserId}`, {
                        method: 'GET', 
                        headers: {

                            'Authorization': `Bearer ${accessToken}`,
                            
                        }
                    });
                    if (response.status >= 400) {
                        navigate("/");
                    } else if (response.status >= 200 && response.status < 300) {
                        const data = await response.json();
                        setUserInfo({...data});
                        
                        setUsername(data?.username);
                        setName(data?.mission_title);
                        setEmail(data?.email);
                        setPhone(data?.phone_number);
                        setAddress(data?.address);
                        setDescription(data?.description);
                        setWebsite(data?.website);
                        setMission(data?.mission_statement);
                    }
                }
                catch (e) {
                    console.log(e);
                    navigate("/");
                }
            } else if (contextUserType === 'seeker') {
                try {
                    const response = await fetch(`http://localhost:8000/accounts/seeker/${contextUserId}`, {
                        method: 'GET', 
                        headers: {

                            'Authorization': `Bearer ${accessToken}`,
                            
                        }
                    });
                    if (response.status >= 400) {
                        // navigate("/");
                        console.log(contextUserId, userInfo);
                    } else if (response.status >= 200 && response.status < 300) {
                        const data = await response.json();
                        setUserInfo({...data});
                        
                        setUsername(data?.username);
                        setEmail(data?.email);
                        setPhone(data?.phone_number);
                        setAddress(data?.address);
                        setDescription(data?.description);
                        setWebsite(data?.website);
                    }
                }
                catch (e) {
                    console.log(e);
                    navigate("/");
                }
            }
        }

        fetchUserInfo();
    }, []);

    async function fetchUserInfo() {
        if (contextUserType === 'shelter') {
            try {
                const response = await fetch(`http://localhost:8000/accounts/shelter/${contextUserId}`, {
                    method: 'GET', 
                    headers: {

                        'Authorization': `Bearer ${accessToken}`,
                        
                    }
                });
                if (response.status >= 400) {
                    navigate("/");
                } else if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    setUserInfo({...data});
                    
                    setUsername(data?.username);
                    setName(data?.mission_title);
                    setEmail(data?.email);
                    setPhone(data?.phone_number);
                    setAddress(data?.address);
                    setDescription(data?.description);
                    setWebsite(data?.website);
                    setMission(data?.mission_statement);
                }
            }
            catch (e) {
                console.log(e);
                navigate("/");
            }
        } else if (contextUserType === 'seeker') {
            try {
                const response = await fetch(`http://localhost:8000/accounts/seeker/${contextUserId}`, {
                    method: 'GET',
                    headers: {

                        'Authorization': `Bearer ${accessToken}`,
                        
                    }
                });
                if (response.status >= 400) {
                    navigate("/");
                } else if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    setUserInfo({...data});
                    
                    setUsername(data?.username);
                    setEmail(data?.email);
                    setPhone(data?.phone_number);
                    setAddress(data?.address);
                    setDescription(data?.description);
                    setWebsite(data?.website);
                }
            }
            catch (e) {
                console.log(e);
                navigate("/");
            }
        }
    }

    const validateEmail = (value) => {
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailPattern.test(value);
    };

    const validatePhone = (value) => {
        return value.length === 10;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    // const handleContactPatchSubmit = async (inputs, e) => {
    //     e.preventDefault();

    //     if (validateEmail(email) && validatePhone(phone)) {
    //         try {
    //             const response = await fetch(`http://localhost:8000/accounts/shelter/${contextUserId}/`, {
    //                 method: 'PATCH',
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     'Authorization': `Bearer ${accessToken}`,
    //                 },
    //                 body: JSON.stringify({
    //                     email: "hans@gmail.com"
    //                 }),
    //             });

    //             if (response.ok) {
    //                 console.log('Information Updated');
    //                 setFormError(null);
    //             } else {
    //                 const errorData = await response.json();
    //                 console.error('Failed to update information', errorData);
    //                 console.log(contactFormData);

    //                 setFormError(errorData.message || 'Failed to update information');
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             setFormError('An unexpected error occurred');
    //         }
    //     } else {
    //         setFormError('Invalid email or phone number. Please check your inputs.');
    //     }
    // };

    // const handleDescriptionPatchSubmit = (contactInputs) => {
    //     const contactFormData = new FormData();
    //     contactFormData.append("description", contactInputs.email);
    //     contactFormData.append("mission_title", contactInputs.name);
    //     contactFormData.append("mission_statement", contactInputs.statement);
    //     console.log(email);

    //     fetch(`http://localhost:8000/accounts/shelter/${contextUserId}`, {
    //         method: 'PATCH',
    //         body: contactFormData,
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`,
    //         }
    //     })
    //     .then(response => {
    //         response.j();
    //         console.log(response);
    //     })
    //     .then(data => {
    //         console.log("Information Updated", data);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    // }
    
    const handleContactPatchSubmit = (e) => {
        e.preventDefault();

        if (validateEmail(email) && validatePhone(phone)) {
            if (contextUserType === 'shelter') {
                fetch(`http://localhost:8000/accounts/shelter/${contextUserId}/`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        email, 
                        phone_number: phone, 
                        website, 
                        mission_title: name, 
                        address, 
                    }),
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    response.json();
                    console.log(response);
                    fetchUserInfo();
                    setFormError(null);
                    navigate(`/shelterprofile/${contextUserId}`);
                })
                .then(data => {
                    console.log("Contacts Updated", data);
                })
                .catch(error => {
                    console.error(error);
                });
            } else if (contextUserType === 'seeker') {
                fetch(`http://localhost:8000/accounts/seeker/${contextUserId}/`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        email, 
                        phone_number: phone, 
                        address, 
                    }),
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    response.json();
                    console.log(response);
                    fetchUserInfo();
                    setFormError(null);
                    navigate(`/seekerprofile/${contextUserId}`);
                })
                .then(data => {
                    console.log("Contacts Updated", data);
                })
                .catch(error => {
                    console.error(error);
                });
            }
        } else {
            setFormError('Invalid email or phone number. Please check your inputs.');
        }
    }

    const handleDescriptionPatchSubmit = (e) => {
        e.preventDefault();

        if (validateEmail(email) && validatePhone(phone)) {
            if (contextUserType === 'shelter') {
                fetch(`http://localhost:8000/accounts/shelter/${contextUserId}/`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        mission_statement: mission,
                        description,
                    }),
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    response.json();
                    console.log(response);
                    fetchUserInfo();
                    setFormError(null);
                    navigate(`/shelterprofile/${contextUserId}`);
                })
                .then(data => {
                    console.log("Description Updated", data);
                })
                .catch(error => {
                    console.error(error);
                });
            } else if (contextUserType === 'seeker') {
                fetch(`http://localhost:8000/accounts/seeker/${contextUserId}/`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        description,
                    }),
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    response.json();
                    console.log(response);
                    fetchUserInfo();
                    setFormError(null);
                    navigate(`/seekerprofile/${contextUserId}`);
                })
                .then(data => {
                    console.log("Description Updated", data);
                })
                .catch(error => {
                    console.error(error);
                });
            }
        } else {
            setFormError('Invalid inputs.');
        }
    }

    const handlePicturePatchSubmit = (e) => {

    }

    return (
        <div style={{ backgroundColor: "#C8F4FF" }}>
            <LandingHeader />
            <Container className='p-5' fluid style={{ backgroundColor: "#C8F4FF", minHeight: "82vh"}}>
            { (contextUserType === 'shelter') ? (
    <Accordion defaultActiveKey="contact">
        <Row>
            <Col className="mb-4" xs={12} sm={3}>
                <ListGroup>
                    <CollapseButton eventKey="account">
                        Account Info
                    </CollapseButton>
                    <CollapseButton eventKey="contact">
                        Shelter Contact
                    </CollapseButton>
                    <CollapseButton eventKey="descriptions">
                        Shelter Descriptions
                    </CollapseButton>
                    <CollapseButton eventKey="images">
                        Profile Images
                    </CollapseButton>
                </ListGroup>
            </Col>
            <Col xs={12} sm={9}>
                <Card>
                    <h1 className='ms-4 mt-3 mb-3'> Edit Profile Information </h1>
                    <Accordion.Collapse eventKey='account'>
                        <Card.Body>
                            <Form id="accountForm">
                                <Form.Group className='mb-3' >
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        disabled
                                        value={username}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3' >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        disabled
                                        value="*********"
                                    />
                                </Form.Group>
                                <div key={"reverse-checkbox"}>
                                    <Form.Check 
                                        reverse
                                        label="By checking this box, you agree to recieve notifications about new pet listings"
                                        name="group1"
                                        type="checkbox"
                                        id={'reverse-checkbox-1'}
                                    />
                                </div>
                                <div >
                                    <Button className='me-3' variant="danger" onClick={handleShow}>
                                        Delete Account
                                    </Button>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Delete Account</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure you want to delete this account?
                                            You will not be able to get it back.
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="danger" onClick={deleteAccount}>
                                            Delete Forever
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Keep Account
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <Button variant="outline-primary" onClick={ (e) => navigate(`/shelterprofile/${contextUserId}`)} >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey='contact'>
                        <Card.Body>
                            <Form id="contactForm">
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Shelter Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Example Shelter Name"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="e.g. shelter.name@example.com"
                                    />
                                    {!validateEmail(email) && email !== '' && (
                                    <Form.Text className="text-danger">Invalid email address</Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        placeholder="e.g. 1234567890"
                                    />
                                    {!validatePhone(phone) && phone !== '' && (
                                    <Form.Text className="text-danger">Invalid phone number</Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="e.g. Main Street, Toronto ON"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formWebsite">
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control 
                                        type="url"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        placeholder="e.g. example.com"
                                    />
                                </Form.Group>
                                
                                {formError && <Alert variant="danger">{formError}</Alert>}

                                <div >
                                    <Button className='me-3' variant="primary" onClick={(e) => handleContactPatchSubmit(e)}>
                                        Submit
                                    </Button>
                                    <Button variant="outline-primary" onClick={ (e) => navigate(`/shelterprofile/${contextUserId}`)} >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey='descriptions'>
                        <Card.Body>
                            <Form id="descriptionForm">
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Shelter Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="e.g. At our shelter ..."
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formMission">
                                    <Form.Label>Mission Statement</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        value={mission}
                                        onChange={(e) => setMission(e.target.value)}
                                        placeholder="e.g. Our mission is ..."
                                    />
                                </Form.Group>
                                
                                {formError && <Alert variant="danger">{formError}</Alert>}

                                <div >
                                    <Button className='me-3' variant="primary" onClick={(e) => handleDescriptionPatchSubmit(e)}>
                                        Submit
                                    </Button>
                                    <Button variant="outline-primary" onClick={ (e) => navigate(`/shelterprofile/${contextUserId}`)} >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey='images'>
                        <Card.Body>
                        <Form id="pictureForm">
                                <Form.Group className="mb-3" controlId="formBanner">
                                    <Form.Label> Banner Picture </Form.Label>
                                    <Form.Control
                                        type="file"
                                        value={banner}
                                        onChange={(e) => setBanner(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formProfPic">
                                    <Form.Label> Profile Picture </Form.Label>
                                    <Form.Control
                                        type="file"
                                        value={profpic}
                                        onChange={(e) => setProfPic(e.target.value)}
                                    />
                                </Form.Group>
                                
                                {formError && <Alert variant="danger">{formError}</Alert>}

                                <div >
                                    <Button className='me-3' variant="primary" onClick={(e) => handlePicturePatchSubmit(e)}>
                                        Submit
                                    </Button>
                                    <Button variant="outline-primary" onClick={ (e) => navigate(`/shelterprofile/${contextUserId}`)} >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Col>
        </Row>

      {/* <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item> */}
    </Accordion>) : (
    <Accordion defaultActiveKey="contact">
        <Row>
            <Col className="mb-4" xs={12} sm={3}>
                <ListGroup>
                    <CollapseButton eventKey="account">
                        Account Info
                    </CollapseButton>
                    <CollapseButton eventKey="contact">
                        Seeker Contact
                    </CollapseButton>
                    <CollapseButton eventKey="descriptions">
                        Seeker Descriptions
                    </CollapseButton>
                    <CollapseButton eventKey="images">
                        Profile Images
                    </CollapseButton>
                </ListGroup>
            </Col>
            <Col xs={12} sm={9}>
                <Card>
                    <h1 className='ms-4 mt-3 mb-3'> Edit Profile Information </h1>
                    <Accordion.Collapse eventKey='account'>
                        <Card.Body>
                            <Form id="accountForm">
                                <Form.Group className='mb-3' >
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        disabled
                                        value={username}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3' >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        disabled
                                        value="*********"
                                    />
                                </Form.Group>
                                <div >
                                    <Button className='me-3' variant="danger" onClick={handleShow}>
                                        Delete Account
                                    </Button>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Delete Account</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure you want to delete this account?
                                            You will not be able to get it back.
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="danger" onClick={deleteAccount}>
                                            Delete Forever
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Keep Account
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <Button variant="outline-primary" onClick={ (e) => navigate(`/seekerprofile/${contextUserId}`)} >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey='contact'>
                        <Card.Body>
                            <Form id="contactForm">
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="e.g. seeker.name@example.com"
                                    />
                                    {!validateEmail(email) && email !== '' && (
                                    <Form.Text className="text-danger">Invalid email address</Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        placeholder="e.g. 1234567890"
                                    />
                                    {!validatePhone(phone) && phone !== '' && (
                                    <Form.Text className="text-danger">Invalid phone number</Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="e.g. Main Street, Toronto ON"
                                    />
                                </Form.Group>
                                
                                {formError && <Alert variant="danger">{formError}</Alert>}

                                <div >
                                    <Button className='me-3' variant="primary" onClick={(e) => handleContactPatchSubmit(e)}>
                                        Submit
                                    </Button>
                                    <Button variant="outline-primary" onClick={ (e) => navigate(`/seekerprofile/${contextUserId}`)} >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey='descriptions'>
                        <Card.Body>
                            <Form id="descriptionForm">
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Seeker Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        value={description === null ? '' : description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="e.g. I am a ..."
                                    />
                                </Form.Group>
                                
                                {formError && <Alert variant="danger">{formError}</Alert>}

                                <div >
                                    <Button className='me-3' variant="primary" onClick={(e) => handleDescriptionPatchSubmit(e)}>
                                        Submit
                                    </Button>
                                    <Button variant="outline-primary" onClick={ (e) => navigate(`/seekerprofile/${contextUserId}`)} >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey='images'>
                        <Card.Body>
                        <Form id="pictureForm">
                                <Form.Group className="mb-3" controlId="formBanner">
                                    <Form.Label> Banner Picture </Form.Label>
                                    <Form.Control
                                        type="file"
                                        value={banner}
                                        onChange={(e) => setBanner(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formProfPic">
                                    <Form.Label> Profile Picture </Form.Label>
                                    <Form.Control
                                        type="file"
                                        value={profpic}
                                        onChange={(e) => setProfPic(e.target.value)}
                                    />
                                </Form.Group>
                                
                                {formError && <Alert variant="danger">{formError}</Alert>}

                                <div >
                                    <Button className='me-3' variant="primary" onClick={(e) => handlePicturePatchSubmit(e)}>
                                        Submit
                                    </Button>
                                    <Button variant="outline-primary" onClick={ (e) => navigate(`/seekerprofile/${contextUserId}`)} >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Col>
        </Row>

      {/* <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item> */}
    </Accordion>
    )}

            </Container>
            <Footer />
        </div>
    );
}

export default ProfileEdit;








//         <div>
//             <LandingHeader />
// <div className="container mt-4 mb-4" style={{ minHeight: "77vh"}}>
//     <div className="row gx-2">
//         <div className="col mb-4" style={{ maxWidth: "16rem" }}>
//             <div className="list-group">
//                 <button className="btn btn-link list-group-item list-group-item-action" type="radio" data-bs-toggle="collapse" data-bs-target="#collapseShelterContact" aria-expanded="true" aria-controls="collapseShelterContact">
//                     Shelter Contact
//                 </button>
//                 <button className="btn btn-link list-group-item list-group-item-action" type="radio" data-bs-toggle="collapse" data-bs-target="#collapseShelterDescription" aria-expanded="true" aria-controls="collapseShelterDescription">
//                     Shelter Description
//                 </button>
//                 <button className="btn btn-link list-group-item list-group-item-action" type="radio" data-bs-toggle="collapse" data-bs-target="#collapseShelterImages" aria-expanded="true" aria-controls="collapseShelterImages">
//                     Profile Images
//                 </button>
//                 <button className="btn btn-link list-group-item list-group-item-action" type="radio" data-bs-toggle="collapse" data-bs-target="#collapseCenterBlurb" aria-expanded="true" aria-controls="collapseCenterBlurb">
//                     Center Blurb
//                 </button>
//                 <button className="btn btn-link list-group-item list-group-item-action" type="radio" data-bs-toggle="collapse" data-bs-target="#collapseFeaturedPets" aria-expanded="true" aria-controls="collapseFeaturedPets">
//                     Featured Pets
//                 </button>
//             </div>
//         </div>
//         <div className="col-9">
//             <div className="card" id="editInfoAccordion">
//                 <div className="card-body" data-bs-parent="editInfoAccordion">
//                     <h1 className="card-title">Edit Profile Info</h1>

//                     <div className="collapse show" id="collapseShelterContact" data-bs-parent="#editInfoAccordion">
//                         <div className="form-group">
//                             <label for="shelterContactAddress">Shelter Address</label>
//                             <input className="form-control" id="shelterContactAddress" placeholder="123 Main Street, Toronto ON" />
//                         </div>
//                         <div className="form-group mt-4">
//                             <label for="shelterContactWebsite">Shelter Website</label>
//                             <input className="form-control" id="shelterContactWebsite" placeholder="exampleshelter.com" />
//                         </div>
//                         <div className="form-group mt-4">
//                             <label for="shelterContactEmail">Shelter Email</label>
//                             <input type="email" className="form-control" id="shelterContactEmail" placeholder="name@example.com" />
//                         </div>
//                         <div className="form-group mt-4">
//                             <label for="shelterContactPhone">Shelter Phone Number</label>
//                             <input className="form-control" id="shelterContactPhone" placeholder="+1 123-456-7890" />
//                         </div>
//                         {/* <div className="d-flex flex-row-reverse align-items-end mt-4 w-100">
//                             <a href="shelter_profile_view.html" type="submit" className="btn btn-primary ms-4">
//                                 Save
//                             </a>
//                             <a href="shelter_profile_view.html" type="cancel" className="btn btn-default ms-4">
//                                 Cancel
//                             </a>
//                         </div> */}
//                         <div className="d-flex flex-row-reverse align-items-end mt-4 w-100">
//                             <a href="" type="submit" className="btn btn-primary ms-4">
//                                 Save
//                             </a>
//                             <button className="btn btn-default ms-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseShelterContact">
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
                    
//                     <div className="collapse" id="collapseShelterDescription" data-bs-parent="#editInfoAccordion">
//                         <div className="form-group">
//                             <label for="shelterDescriptionName">Shelter Name</label>
//                             <textarea className="form-control" id="shelterDescriptionName" rows="1"></textarea>
//                         </div>
//                         <div className="form-group mt-4">
//                             <label for="shelterDescription">Shelter Description</label>
//                             <textarea className="form-control" id="shelterDescription" rows="3"></textarea>
//                         </div>
//                         <div className="d-flex flex-row-reverse align-items-end mt-4 w-100">
//                             <a href="shelter_profile_view.html" type="submit" className="btn btn-primary ms-4">
//                                 Save
//                             </a>
//                             <a href="shelter_profile_view.html" type="cancel" className="btn btn-default ms-4">
//                                 Cancel
//                             </a>
//                         </div>
//                         <div className="d-flex flex-row-reverse align-items-end mt-4 w-100">
//                             <a href="shelter_profile_view.html" type="submit" className="btn btn-primary ms-4">
//                                 Save
//                             </a>
//                             <button className="btn btn-default ms-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseShelterDescription">
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>

//                     <div className="collapse" id="collapseShelterImages" data-bs-parent="#editInfoAccordion">
//                         <div className="form-group">
//                             <label for="shelterImagesBanner">Banner Picture</label>
//                             <input type="file" className="form-control" id="shelterImagesBanner" />
//                         </div>
//                         <div className="form-group mt-4">
//                             <label for="shelterImagesCircle">Profile Picture</label>
//                             <input type="file" className="form-control" id="shelterImagesCircle" />
//                         </div>
//                         <div className="d-flex flex-row-reverse align-items-end mt-4 w-100">
//                             <a href="shelter_profile_view.html" type="submit" className="btn btn-primary ms-4">
//                                 Save
//                             </a>
//                             <a href="shelter_profile_view.html" type="cancel" className="btn btn-default ms-4">
//                                 Cancel
//                             </a>
//                         </div>
//                         <div className="d-flex flex-row-reverse align-items-end mt-4 w-100">
//                             <a href="shelter_profile_view.html" type="submit" className="btn btn-primary ms-4">
//                                 Save
//                             </a>
//                             <button className="btn btn-default ms-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseShelterImages">
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>

//                     <div className="collapse" id="collapseCenterBlurb" data-bs-parent="#editInfoAccordion">
//                         <div className="form-group">
//                             <label for="shelterCenterBlurbTitle">Center Blurb Title</label>
//                             <textarea className="form-control" id="shelterCenterBlurbTitle" rows="1"></textarea>
//                         </div>
//                         <div className="form-group mt-4">
//                             <label for="shelterCenterBlurbContent">Center Blurb Content</label>
//                             <textarea className="form-control" id="shelterCenterBlurbContent" rows="3"></textarea>
//                         </div>
//                         <div className="d-flex flex-row-reverse align-items-end mt-4 w-100">
//                             <a href="shelter_profile_view.html" type="submit" className="btn btn-primary ms-4">
//                                 Save
//                             </a>
//                             <a href="shelter_profile_view.html" type="cancel" className="btn btn-default ms-4">
//                                 Cancel
//                             </a>
//                         </div>
//                         <div className="d-flex flex-row-reverse align-items-end mt-4 w-100">
//                             <a href="shelter_profile_view.html" type="submit" className="btn btn-primary ms-4">
//                                 Save
//                             </a>
//                             <button className="btn btn-default ms-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCenterBlurb">
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>

//                     <div className="collapse" id="collapseFeaturedPets" data-bs-parent="#editInfoAccordion">
//                         <div className="form-group">
//                             <label for="shelterFeaturedPet1">Select Featured Pet 1</label>
//                             <select className="form-control" id="shelterFeaturedPet1">
//                                 <option>Bean</option>
//                                 <option>Milky</option>
//                                 <option>Lalo</option>
//                                 <option>Mika</option>
//                                 <option>Gungro</option>
//                             </select>
//                         </div>
//                         <div className="form-group">
//                             <label for="shelterFeaturedPet2">Select Featured Pet 2</label>
//                             <select className="form-control" id="shelterFeaturedPet2">
//                                 <option>Milky</option>
//                                 <option>Bean</option>
//                                 <option>Lalo</option>
//                                 <option>Mika</option>
//                                 <option>Gungro</option>
//                             </select>
//                         </div>
//                         <div className="form-group">
//                             <label for="shelterFeaturedPet3">Select Featured Pet 3</label>
//                             <select className="form-control" id="shelterFeaturedPet3">
//                                 <option>Lalo</option>
//                                 <option>Bean</option>
//                                 <option>Milky</option>
//                                 <option>Mika</option>
//                                 <option>Gungro</option>
//                             </select>
//                         </div>
//                         <div className="form-group">
//                             <label for="shelterFeaturedPet4">Select Featured Pet 4</label>
//                             <select className="form-control" id="shelterFeaturedPet4">
//                                 <option>Gungro</option>
//                                 <option>Bean</option>
//                                 <option>Milky</option>
//                                 <option>Lalo</option>
//                                 <option>Mika</option>
//                             </select>
//                         </div>
//                         <div className="d-flex flex-row-reverse align-items-end mt-4 w-100">
//                             <div className="d-flex flex-row-reverse align-items-end mt-4 w-100">
//                                 <a href="shelter_profile_view.html" type="submit" className="btn btn-primary ms-4">
//                                     Save
//                                 </a>
//                                 <a href="shelter_profile_view.html" type="cancel" className="btn btn-default ms-4">
//                                     Cancel
//                                 </a>
//                             </div>
//                             <button type="submit" className="btn btn-primary ms-5">Save</button>
//                             <button className="btn btn-default ms-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFeaturedPets">
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
//             <Footer />
//         </div>
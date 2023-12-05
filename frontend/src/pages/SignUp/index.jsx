
import LandingHeader from '../../components/LandingHeader';
import Footer from '../../components/Footer';
import React, { useState } from 'react';
import { FloatingLabel, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bgSignup from '../../assets/images/pets-image-2.jpg';
import SignupModal from '../../components/SignupModal';

const SignUp = () => {
  const [showModal, setShowModal] = useState(false);
    
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // const [accessToken, setAccessToken] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const updateUsername = (event) => {
    setUsername(event.target.value)
  }

  const updatePassword = (event) => {
    setPassword(event.target.value)
  }

  const updateEmail = (event) => {
    setEmail(event.target.value)
  }

  const updateUserType = (event) => {
    setUserType(event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sign up requires user type
    if (userType !== "seeker" && userType !== "shelter") {
      setFormErrors({userType: ["This field may not be blank."]});
      
    } else {
        const response = await fetch(`http://localhost:8000/accounts/${userType}/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password, email, phone_number: phone, address})
          });
          
          const data = await response.json();
          if (response.status === 500) {
            console.log("Network Error")
            return 
          } else if (response.status === 400) {

              setFormErrors({...data})
              console.log(formErrors);
            return
          } else if (response.status >= 200 && response.status <300) {
              console.log(data)
              setShowModal(true);
          } else {
            alert(response.status)
          }

    }
  }


  return (
      <>
    <div style={{background: `url(${bgSignup})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition:"center", minHeight: "calc(100vh - 4rem)"}}>
      <LandingHeader />
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        
        <Card className="border-4 border-dark-subtle border-start-0 rounded-end shadow" 
          style={{minWidth: "375px", minHeight: "500px", marginTop: "2rem", width: "25%",backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter:"blur(10px)"}}>
          <Form className="bg-tertiary" onSubmit={handleSubmit} style={{padding: "20px"}}>
          <div>
            {/* <img src={titleLogo} width={200} height={50}></img> */}
  
          </div>
          
          <h1 className="text-center" style={{fontFamily: "Georgia", color: "rgb(111, 70, 182)", paddingBottom: "30px" }}>
            {userType? (userType==="seeker"? "Seeker":"Shelter"):"User"} Signup {userType==="shelter"?<i className="bi bi-house-check-fill"></i>:<i className="bi bi-person-circle"></i>}
            </h1>
          
          <Form.Group className="mb-3">
            <FloatingLabel label="account type">
            <Form.Select as="select" isInvalid={formErrors?.userType} onChange={updateUserType}>
              <option value=''>Select account type</option>
              <option value='seeker'>PetSeeker</option>
              <option value='shelter'>PetShelter</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formErrors?.userType}
            </Form.Control.Feedback>
  
            </FloatingLabel>
            
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingUser" label="Username">
              <Form.Control type="text" placeholder="username" isInvalid={formErrors?.username}
              onChange={(e) => updateUsername(e)} value={username}/>
              <Form.Control.Feedback type="invalid">
                {formErrors?.username}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" isInvalid={formErrors?.password}
            onChange={(e) => updatePassword(e)} value={password}/>
            <Form.Control.Feedback type="invalid">
              {formErrors?.password}
            </Form.Control.Feedback>
          </FloatingLabel>
            
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingEmail" label="Email">
            <Form.Control type="text" placeholder="Email" isInvalid={formErrors?.email}
            onChange={(e) => updateEmail(e)} value={email}/>
            <Form.Control.Feedback type="invalid">
              {formErrors?.email}
            </Form.Control.Feedback>
          </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingPhone" label="Phone">
            <Form.Control type="text" placeholder="Phone" maxLength={10} minLength={10} isInvalid={formErrors?.phone}
            onChange={(e) => setPhone(e.target.value)} value={phone}/>
            <Form.Control.Feedback type="invalid">
              {formErrors?.phone}
            </Form.Control.Feedback>
          </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingAddress" label="Address">
            <Form.Control type="text" placeholder="Address" isInvalid={formErrors?.address}
            onChange={(e) => setAddress(e.target.value)} value={address}/>
            <Form.Control.Feedback type="invalid">
              {formErrors?.address}
            </Form.Control.Feedback>
          </FloatingLabel>
          </Form.Group>
          <div style={{display: "flex", justifyContent: "center"}}>
          <Button type="submit" className="center"> Sign up </Button>
  
          </div>
          
          <hr></hr>
          <p><strong>Have an account?</strong> <Link to="/login" style={{fontWeight: "bold"}}>Login</Link> <Link to="/" style={{fontWeight: "bold"}}>cancel</Link></p>
  
          
          
      </Form></Card>
      <SignupModal showModal={showModal} handleCloseModal={handleCloseModal}></SignupModal>

      </div>

    </div>
  <Footer/>
  </>
  );
};

export default SignUp;

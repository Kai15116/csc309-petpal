
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import React, { useState, useContext } from 'react';
import { userContext } from '../context/userContext';
import { FloatingLabel, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bgLogin from '../assets/images/login-signup-images/bglogin.jpg';


// TODO: make sign up work. 

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [formErrors, setFormErrors] = useState({});
  // const [accessToken, setAccessToken] = useState("");
  const {setUser} = useContext(userContext);

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
    setFormErrors({});
    e.preventDefault();
    // Sign up requires user type
    if (userType !== "seeker" && userType !== "shelter") {
      setFormErrors({userType: ["This field may not be blank."]});
      
    } else {
        const response = await fetch("http://localhost:8000/accounts/shelter/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password, email})
          });
          
          const data = await response.json();
          if (response.status === 500) {
            console.log("Network Error")
            return 
          } else if (response.status === 400) {

              setFormErrors({...data})
              console.log(formErrors);
            return
          }
          const user = {
            accessToken: data.access,
            refreshToken: data.refresh,
            user_id: data.user_id,
          }
          console.log(user);
          
          setUser(user);

    }

    
  }


  return (
    <div style={{background: `url(${bgLogin})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition:"bottom", minHeight: "100vh"}}>
      <LandingHeader />
      <div>
        <h2>Sign Up Page</h2>
        <Card className="border-4 border-dark-subtle border-start-0 rounded-end shadow" 
          style={{minWidth: "375px", minHeight: "500px", marginTop: "2rem", width: "25%",backgroundColor: 'rgba(255, 240, 255, 0.6)', backdropFilter:"blur(10px)"}}>
          <Form className="bg-tertiary" onSubmit={handleSubmit} style={{padding: "20px"}}>
          <div>
            {/* <img src={titleLogo} width={200} height={50}></img> */}
  
          </div>
          
          <h1 className="text-center" style={{fontFamily: "Georgia", color: "rgb(111, 113, 182)", paddingBottom: "40px" }}>User Login<i class="bi bi-person-circle"></i></h1>
          
          <Form.Group>
            <FloatingLabel label="account type">
            <Form.Select as="select">
              <option value=''>Select account type</option>
              <option value='seeker'>PetSeeker</option>
              <option value='shelter'>PetShelter</option>
            </Form.Select>
  
            </FloatingLabel>
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Username">
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
          <div style={{display: "flex", justifyContent: "center"}}>
          <Button type="submit" className="center"> Sign in </Button>
  
          </div>
          
          <hr></hr>
          <p><strong>Don't have an account?</strong> <Link to="/signup" style={{fontWeight: "bold"}}>Register Here</Link> </p>
  
          <Link to="/" style={{fontWeight: "bold"}}>Back to Home Page</Link>
          
      </Form></Card>
        <form>
        <label htmlFor="usertype">usertype</label>
        <select id="usertype" onChange={(e) => updateUserType(e)}  value={userType}>
        <option value=''>Select account type</option>
        <option value='seeker'>PetSeeker</option>
        <option value='shelter'>PetShelter</option>
        </select>
        {formErrors&&formErrors?.userType&&<p>{formErrors.userType[0]}</p>}
        <br></br>
        <label htmlFor="username">username</label>
        <input id="username" type="text" onChange={(e) => updateUsername(e)} value={username}></input>
        {formErrors&&formErrors?.username&&<p>{formErrors.username[0]}</p>}
        <br></br>
        <label htmlFor="password">password</label>
        <input id="password" type="password" onChange={(e) => updatePassword(e)} value={password}></input>
        
        {formErrors&&formErrors?.password&&<p>{formErrors.password[0]}</p>}
        <br></br>
        <label htmlFor="email">email</label>
        <input id="email" type="text" onChange={(e) => updateEmail(e)} value={email}></input>
        {formErrors&&formErrors?.email&&<p>{formErrors.email[0]}</p>}
        <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;

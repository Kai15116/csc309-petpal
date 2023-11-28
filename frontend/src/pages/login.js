import React, { useState, useContext } from 'react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import { userContext } from '../context/userContext';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Card} from 'react-bootstrap';
import bgLogin from '../assets/images/login-signup-images/bglogin.jpg';
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    // const [accessToken, setAccessToken] = useState("");
    const {setContextUser} = useContext(userContext);
    const navigate = useNavigate();
  
    const resetFields = () => {
      setUsername("")
      setPassword("")
    }
  
    const updateUsername = (event) => {
      setUsername(event.target.value)
    }
  
    const updatePassword = (event) => {
      setPassword(event.target.value)
    }
  
    const handleSubmit = async (e) => {
      setFormErrors({});
      e.preventDefault();

    try {
        const response = await fetch("http://localhost:8000/accounts/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password})
      });
      
      const data = await response.json();
      if (response.status === 500) {
        console.log("Network Error")
        return 
      } else if (response.status === 400) {
  
          setFormErrors({...data});
          console.log(formErrors);
          resetFields();
        return
      } else if (response.status === 200) {
          const user = {
            accessToken: data.access,
            refreshToken: data.refresh,
            contextUserId: data.user_id,
            contextUserType: data.user_type,
          }
          console.log(user);
          setContextUser(user);
          navigate(`/${user.contextUserType}profile/${user.contextUserId}`);
      } else {
        alert(response.status)
      }
      

      } catch(error) {
        console.log(error)
      }
  
      
    } 
  
    return (
      <div style={{background: `url(${bgLogin})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition:"bottom", minHeight: "100vh"}}>
        <LandingHeader />
        
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Card className="border-4 border-dark-subtle border-start-0 rounded-end shadow" 
          style={{minWidth: "375px", minHeight: "500px", marginTop: "2rem", width: "25%",backgroundColor: 'rgba(255, 240, 255, 0.6)', backdropFilter:"blur(10px)"}}>
          <Form className="bg-tertiary" onSubmit={handleSubmit} style={{padding: "20px"}}>
          <div>
            {/* <img src={titleLogo} width={200} height={50}></img> */}
  
          </div>
          
          <h1 className="text-center" style={{fontFamily: "Georgia", color: "rgb(111, 113, 182)", paddingBottom: "40px" }}>User Login<i class="bi bi-person-circle"></i></h1>
          
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
        
          
          {/* <form>
          <label htmlFor="username">username</label>
          <input id="username" type="text" ></input>
          {formErrors&&formErrors?.username&&<p>{formErrors.username[0]}</p>}
          <br></br>
          <label htmlFor="password">password</label>
          <input id="password" type="password" onChange={(e) => updatePassword(e)} value={password}></input>
          <button type="submit" onClick={handleSubmit}>Submit</button>
          {formErrors&&formErrors?.password&&<p>{formErrors.password[0]}</p>}
          </form> */}
        
        </div>
        <Footer />
      </div>
  
    );
  };
  
  export default Login;
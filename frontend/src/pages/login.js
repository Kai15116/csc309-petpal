import React, { useState, useContext } from 'react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import { userContext } from '../context/userContext';



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  // const [accessToken, setAccessToken] = useState("");
  const {setUser} = useContext(userContext);

  const updateUsername = (event) => {
    setUsername(event.target.value)
  }

  const updatePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (e) => {
    setFormErrors("");
    e.preventDefault();

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

  return (
    <div>
      <LandingHeader />
      <div>
        
        <form>
        <label htmlFor="username">username</label>
        <input id="username" type="text" onChange={(e) => updateUsername(e)} value={username}></input>
        {formErrors&&formErrors?.username&&<p>{formErrors.username[0]}</p>}
        <br></br>
        <label htmlFor="password">password</label>
        <input id="password" type="password" onChange={(e) => updatePassword(e)} value={password}></input>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        {formErrors&&formErrors?.password&&<p>{formErrors.password[0]}</p>}
        </form>
      
      </div>
      <Footer />
    </div>
    
  );
};

export default Login;
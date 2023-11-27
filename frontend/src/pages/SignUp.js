
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import React, { useState, useContext } from 'react';
import { userContext } from '../context/userContext';

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
    <div>
      <LandingHeader />
      <div>
        <h2>Sign Up Page</h2>
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

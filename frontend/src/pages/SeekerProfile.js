import {useContext, useState, useEffect} from "react";
import { userContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
function SeekerProfile() {
    const {getContextUser} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);
    // current user profile's user id.
    const {userId} = useParams(); 
    const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();
    // const [allowAccess, setAllowAccess] = useState(false)
    const navigate = useNavigate();

    useEffect(function() {
        async function fetchUserInfo() {
            try { 
                const response = await fetch(`http://localhost:8000/accounts/seeker/${userId}`, {
                method: 'GET',
                headers: {

                    'Authorization': `Bearer ${accessToken}`,
                    
                }
            });
            if (response.status === 403) {
                navigate('/');
                
                // setAllowAccess(false);
            } else if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                console.log("this is " + data)
                setUserInfo({...data})
                // setAllowAccess(true);
            }} catch (e) {
                console.log(e);
                navigate('/');
            }
            
            
        }
        fetchUserInfo();

    }, [ userId ])
    
    return (
        <div>
            SeekerProfileFake
            <div>
                <h1>This is from user context</h1>
                <h2>{accessToken}</h2>
                <h2>{contextUserId}</h2>
                <h2>{contextUserType}</h2>
            </div>
            <div>
                <h1>This is from the api.</h1>
                <h2>{userInfo?.username}</h2>
                <h2>{userInfo?.email}</h2>
                <h2>{userInfo?.address}</h2>
            </div>
        </div>
    )
}

export default SeekerProfile;

import {useContext, useState, useEffect} from "react";
import { userContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import LandingHeader from "../components/LandingHeader";
function ShelterProfile() {
    const {getContextUser} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);
    // current user profile's user id.
    const {userId} = useParams(); 
    const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();
    // const [allowAccess, setAllowAccess] = useState(false)
    const navigate = useNavigate();

    async function deleteShelter() {
        try { 
            const response = await fetch(`http://localhost:8000/accounts/shelter/${userId}`, {
                method: 'DELETE',
                headers: {

                    'Authorization': `Bearer ${accessToken}`,
                    
                }
            }
        );
        if (response.status >= 400) {
            navigate('/');
            
            // setAllowAccess(false);
        } else if (response.status >= 200 && response.status < 300) {
            return;
            // const data = await response.json();
            // setUserInfo({...data})
            // console.log(userInfo)
            // setAllowAccess(true);
        }} catch (e) {
            console.log(e)
            navigate('/');
        }
        

        navigate('/shelters')
        
        
    }

    useEffect(function() {
        async function fetchUserInfo() {
            try { 
                const response = await fetch(`http://localhost:8000/accounts/shelter/${userId}`, {
                    method: 'GET'
                }
            );
            if (response.status >= 400) {
                navigate('/');
                
                // setAllowAccess(false);
            } else if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                setUserInfo({...data})
                console.log(userInfo)
                // setAllowAccess(true);
            }} catch (e) {
                console.log(e)
                navigate('/');
            }
            
            
        }
        fetchUserInfo();

    }, [ userId ])
    
    return (
        <div>
            ShelterProfileFake
            <LandingHeader></LandingHeader>
            <div>
                <h1>This is from user context</h1>
                <h2>{accessToken}</h2>
                <h2>{contextUserId}</h2>
                <h2>{contextUserType}</h2>
                <input></input>
            </div>
            <div>
                <h1>This is from the api.</h1>
                <h2>{userInfo?.id}</h2>
                <h2>{userInfo?.username}</h2>
                <h2>{userInfo?.email}</h2>
                <h2>{userInfo?.address}</h2>
                <h2>{userInfo?.created_at}</h2>
            </div>
            <div>
                {/* Just testing there might be changes you have to make later. */}
                {userInfo?.id === contextUserId && <Button onClick={deleteShelter}>Delete Shelter</Button>}
            </div>
        </div>
    )
}

export default ShelterProfile;
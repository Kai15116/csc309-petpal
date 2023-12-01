import NotificationCard from "../components/NotificationCard";
import Header from "../components/LandingHeader";
import Footer from "../components/Footer";
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 
import {useContext, useState, useEffect} from "react";
import { userContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";


const cards = [1,2,3,4,5,6,7,8,9]
function NotificationPage() {
    const [toggleDelete, setToggleDelete] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const {getContextUser} = useContext(userContext);
    const [noteInfo, setNoteInfo] = useState([]);
    // current user profile's user id.
    const {userId} = useParams(); 
    const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();
    // const [allowAccess, setAllowAccess] = useState(false)
    const navigate = useNavigate();
    useEffect(function() {
        async function fetchNoteInfo() {
            try { 
                const response = await fetch(`http://localhost:8000/notifications/`, {
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
                // console.log("this is " + data)
                setNoteInfo([...data])
                // setAllowAccess(true);
            }} catch (e) {
                console.log(e);
                navigate('/');
            }
            
            
        }
        fetchNoteInfo();

    }, [ userId ])


    async function fetchNoteInfo2() {
        try { 
            const response = await fetch(`http://localhost:8000/notifications/`, {
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
            // console.log("this is " + data)
            setNoteInfo([...data])
            // setAllowAccess(true);
        }} catch (e) {
            console.log(e);
            navigate('/');
        }
        
        
    }

    // delete Notifications
    const deleteNotification = async (id) => {
        try { 
            const response = await fetch(`http://localhost:8000/notifications/${id}`, {
            method: 'DELETE',
            headers: {

                'Authorization': `Bearer ${accessToken}`,
                
            }
        });
        if (response.status === 403) {
            navigate('/');
            
            // setAllowAccess(false);
        } else if (response.status >= 200 && response.status < 300) {
            fetchNoteInfo2();
            
            return
            // console.log("this is " + data)
            
            // setAllowAccess(true);
        }} catch (e) {
            console.log(e);
            navigate('/');
        }

    }

    async function readNoteInfo(id) {
        try { 
            const response = await fetch(`http://localhost:8000/notifications/${id}`, {
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
            // console.log("this is " + data)
            setNoteInfo([...data])
            // setAllowAccess(true);
        }} catch (e) {
            console.log(e);
            navigate('/');
        }
        
        
    }


    return (
        <div>
            <Header></Header>
            <h1>Notifications<i className="bi bi-bell-fill"></i></h1>
            <Tabs defaultActiveKey="first" className="justify-content-center" onClick={(e) => {e.preventDefault();}}> 
                <Tab eventKey="first" title="Unread" > 
                  <h2>6 unread notifications</h2>
                    <Button onClick={() => {
                        setToggleDelete(!toggleDelete)
                    }}>{toggleDelete?<>Done</>:<>Delete <i className="bi bi-trash-fill"></i></>}</Button>
                    {noteInfo?.map((note, index) => <NotificationCard key={index} note={note} delOption={toggleDelete} deleteNotification={deleteNotification}></NotificationCard>)}
            
                </Tab> 
                <Tab eventKey="second" title="View All"> 
                Hii, I am 2nd tab content 
                </Tab> 
                
                
            </Tabs>
            <Footer></Footer>
            
        </div>
    )
}

export default NotificationPage;

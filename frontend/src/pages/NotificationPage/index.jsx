import NotificationCard from "../../components/NotificationCard";
import Header from "../../components/LandingHeader";
import Footer from "../../components/Footer";
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 
import {useContext, useState, useEffect} from "react";
import { userContext } from "../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { to_url_params } from "../../utils";
import CPagination from "../../components/CPagination";

function NoNotifications({message}) {
    return (
        <div style={{display: "flex", justifyContent: "center", width: "100%", flexDirection: "column", alignItems: "center"}}>
            <i className="bi bi-envelope-slash-fill" style={{fontSize: "300px", color: "grey"}}></i>
            <p>{message}</p>

        </div>

    )
}

function NotificationPage() {
    const [toggleDelete, setToggleDelete] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const {getContextUser} = useContext(userContext);
    const [noteInfo, setNoteInfo] = useState([]);
    const [ query, setQuery ] = useState({page: 1, read: "", size: 6});
    const [totalNotes, setTotalNotes] = useState(1);
    // current user profile's user id.
    const {userId} = useParams(); 
    const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();
    // const [allowAccess, setAllowAccess] = useState(false)
    const navigate = useNavigate();

    const setcurrentActivePage = (value) => {
        setQuery({...query, page : value})
    }

    async function fetchNoteInfo() {
        try { 
            const response = await fetch(`http://localhost:8000/notifications?${to_url_params(query)}`, {
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
            setNoteInfo(data.results)
            setTotalNotes(data.count)
            // setAllowAccess(true);
        }} catch (e) {
            console.log(e);
            navigate('/');
        }
    }



    useEffect(function() {
        if (Number(userId) !== contextUserId) {
            navigate('/');
        }
        fetchNoteInfo();
    }, [userId, query])


    
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
            fetchNoteInfo();
            
            return
            // console.log("this is " + data)
            
            // setAllowAccess(true);
        }} catch (e) {
            console.log(e);
            navigate('/');
        }

    }

    async function readNotification(id) {
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
            fetchNoteInfo();
            
            return
        }} catch (e) {
            console.log(e);
            navigate('/');
        }
    }

    const pagesCount = Math.ceil(totalNotes / query?.size);
    const noResult =totalNotes === 0 || isNaN(pagesCount);

    const handleSelect = (eventKey) => {
        if (eventKey === "1")
            setQuery({...query, read:"", page: 1})
        else if (eventKey ==="2")
            setQuery({...query, read: "False", page: 1})
        else 
            setQuery({...query, read: "True", page: 1})
          
    }


    return (
        <div style={{minHeight: "100vh", background: "#F5F5F5"}} className="notification_layout">
            <Header></Header>
            <div style={{minHeight: "95vh"}}>
            <h1 style={{fontFamily: "Georgia", paddingTop: "3rem", paddingLeft: "3rem"}}>Notifications<i className="bi bi-bell-fill"></i></h1>
            <div style={{display: "flex", justifyContent: "end", paddingRight: "3rem"}}>
            <Button variant={"danger"} onClick={() => {
                        setToggleDelete(!toggleDelete)
                    }}>{toggleDelete?<>Done</>:<>Manage <i className="bi bi-trash-fill"></i></>}</Button>

            </div>
            
            <Tabs defaultActiveKey="1" className="justify-content-center" onSelect={handleSelect}> 
                <Tab eventKey="1" title="View All" name="viewall"> 
                  
                    <div style={{height: "65vh", overflowY: "scroll"}}>
                    {totalNotes === 0 && <NoNotifications message="No notifications yet."></NoNotifications>}
                    {noteInfo?.map((note, index) => <NotificationCard key={index} note={note} delOption={toggleDelete} deleteNotification={deleteNotification} readNotification={readNotification}></NotificationCard>)}
                    </div>
                    
                </Tab> 
                <Tab eventKey="2" title="Unread" name="unread"> 
                
                    <div style={{height: "65vh", overflowY: "scroll"}}>

                    {totalNotes === 0 && <NoNotifications message="You didn't miss anything."></NoNotifications>}
                    {noteInfo?.map((note, index) => <NotificationCard key={index} note={note} delOption={toggleDelete} deleteNotification={deleteNotification} readNotification={readNotification}></NotificationCard>)}
                    </div>
                </Tab> 
                <Tab eventKey="3" title="Read" name="read"> 
                
                    <div style={{height: "65vh", overflowY: "scroll"}}>
                    {totalNotes === 0 && <NoNotifications message="No such notifications yet."></NoNotifications>}
                    {noteInfo?.map((note, index) => <NotificationCard key={index} note={note} delOption={toggleDelete} deleteNotification={deleteNotification} readNotification={readNotification}></NotificationCard>)}
                    </div>
                </Tab> 
                
                
            </Tabs>
            {!noResult && <CPagination setcurrentActivePage={setcurrentActivePage} currentActivePage={query?.page} pagesCount={pagesCount}/>}
            </div>

            <Footer></Footer>
            
        </div>
    )
}

export default NotificationPage;

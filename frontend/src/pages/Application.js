import ApplicationForm from "../components/ApplicationForm";
import "../styles/application.css"
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import seekerImage from "../assets/images/user.png"
import shelterImage from "../assets/example_images/shelter_portrait.jpg"
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {userContext} from "../context/userContext";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Application(props) {
    const { getContextUser, setContextUser} = useContext(userContext);
    const user = getContextUser()
    const [comments, setComments] = useState([]);
    const [application, setApplication] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [messageType, setMessageType] = useState("comment");
    const { applicationId } = useParams();

    async function fetchComments(reset) {

        try {
            let actualpage;
            if (reset)
                actualpage = 1
            else
                actualpage = page
            const response = await fetch(`http://localhost:8000/comments/application/${applicationId}?size=6&page=${actualpage}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                }
            });
            if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                console.log([...comments, ...data.results])
                console.log(!!data.next)
                setHasMore(!!data.next)

                if (reset){
                    setPage( 2)
                    setComments([...data.results])
                } else {
                    setPage(page + 1)
                    setComments([...comments, ...data.results])
                }
            } else if (response.status === 404) {
                alert(404);
            } else {
                console.log(response)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(function () {

        async function fetchApplication() {
            try {
                const response = await fetch(`http://localhost:8000/applications/${applicationId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                    }
                });
                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    console.log(data)
                    setApplication(data)
                } else if (response.status === 404) {
                    alert(404);
                } else {
                    console.log(response)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchApplication();
        fetchComments(false)
    }, []);



    const sendMessage = async (e) => {
        e.preventDefault();
        if (e.target.chatInput.value){
            try {
                const response = await fetch(`http://localhost:8000/comments/application/${applicationId}/`, {
                    method: 'POST',
                    body: JSON.stringify({
                      text: e.target.chatInput.value
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.accessToken}`,
                    }
                });
                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    console.log(data)
                    fetchComments(true)
                } else if (response.status === 404) {
                    alert(404);
                } else {
                    console.log(response)
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (messageType !== "comment") {
            try {
                const response = await fetch(`http://localhost:8000/applications/${applicationId}/`, {
                    method: 'PUT',
                    body: JSON.stringify({
                      status: messageType
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.accessToken}`,
                    }
                });
                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    setApplication({...application, status: messageType})
                    console.log(data)
                } else if (response.status === 404) {
                    alert(404);
                } else {
                    console.log(response)
                }
            } catch (e) {
                console.log(e);
            }
        }

    }

    return (<>
        <LandingHeader/>
        <main className="d-flex flex-column justify-content-center align-items-center background-color">
        <div className="d-flex align-items-start application-page" style={{height: "100%"}} id="application-main-container">
            <ApplicationForm readOnly={true} application={application} key={application?.id}/>

            <div className="chat-container">
                <div className="mb-0">
                    <div className="messages-container overflow-scroll mb-0 d-flex flex-column-reverse" id="messages-container">
                        <InfiniteScroll dataLength={comments.length} hasMore={hasMore} next={() => fetchComments(false)} inverse={true}
                                        scrollableTarget="messages-container">
                        </InfiniteScroll>

                        {application?.status === "accepted" && <div className="system-message accepted-message w-100 justify-content-center align-items-center d-flex flex-column my-3">
                            <div className=" text-success d-flex justify-content-center align-items-center text-center" style={{width: "90%"}}>
                                <p className="fw-bold align-self-center my-auto mx-1">Application was accepted!</p>
                                <svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                                </svg>
                            </div>
                        </div>}
                        {application?.status === "denied" &&  <div className="system-message rejected-message w-100 justify-content-center align-items-center d-flex flex-column my-3">
                            <div className="text-danger d-flex justify-content-center align-items-center text-center" style={{width: "90%"}}>
                                <p className="fw-bold align-self-center my-auto mx-1 ">Application was rejected!.</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                            </div>
                        </div>}
                        {application?.status === "withdrawn" &&  <div className="system-message withdraw-message w-100 justify-content-center align-items-center d-flex flex-column my-3">
                            <div className="text-secondary d-flex justify-content-center align-items-center text-center" style={{width: "90%"}}>
                                <p className="fw-bold align-self-center my-auto mx-1 ">Application was withdrwan!.</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                        </div>}
                        {comments?.map((item, index) => {
                            if (item.user === user.contextUserId){
                                return <div key={index} className="user-message  message-shelter align-self-end rounded bg-dark-subtle p-3 my-3 d-flex flex-row-reverse align-items-center"
                                            style={{height: "auto", "maxWidth": "80%"}}>
                                            <img src={shelterImage} className="rounded-circle border ms-3 me-1 align-self-start"
                                                style={{width: "50px", aspectRatio: "1 / 1"}} alt="Pet shelter icon"></img>
                                            <div className="text-wrap w-100">{item.text}</div>
                                        </div>
                            } else {
                                return <div key={index} className="user-message message-seeker align-self-start rounded bg-body-tertiary p-3 my-3 d-flex align-items-center"
                                            style={{height: "auto", "maxWidth": "80%"}}>
                                            <img src={seekerImage} className="rounded-circle border me-3 ms-1 align-self-start"
                                                 style={{width: "50px", aspectRatio: "1 / 1"}} alt="Pet seeker icon"></img>
                                            <div className="text-wrap w-100">{item.text}</div>
                                        </div>
                            }
                        })}
                    </div>

                </div>

                <div className="sticky-bottom pb-3 chat-form-container">
                    <form method="post" className="bg-body-tertiary p-3 rounded w-100 shadow" id="chat-form" onSubmit={sendMessage}>
                        <div className="form-group mb-2">
                            <div className="d-flex">
                                <label htmlFor="chat-input" className="fw-bold mb-2 align-self-end">Message:</label>
                                <select className="form-select ms-auto mb-2" style={{width: "fit-content"}} id="message-type" defaultValue="comment" onChange={(e) => setMessageType(e.target.value)}>
                                    <option value="comment">Comment</option>
                                    {user?.contextUserType === "seeker" && <option value="withdrawn">Withdraw</option>}
                                    {user?.contextUserType === "shelter" && <option value="accepted">Accept</option>}
                                    {user?.contextUserType === "shelter" && <option value="denied">Reject</option>}
                                </select>
                            </div>
                            <textarea className="form-control" id="chat-input" rows="5" name="chatInput" required={messageType === "comment"}></textarea>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <button className="btn btn-success px-3 mt-1" type="submit">Send Message</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </main>
    <Footer/>
    </>
    );
}
import { Modal, Button, Card, Col, Container, Row, Stack, Form} from "react-bootstrap";
import LandingHeader from "../../components/LandingHeader";
import Footer from "../../components/Footer";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {userContext} from "../../context/userContext";
import InfiniteScroll from 'react-infinite-scroll-component';


function ShelterReviewsCard(props) {
    const commentInformation = [
        {
            name: "Milky Tao",
            content: "I love this shelter!",
        }, 
        {
            name: "Bean Tao",
            content: "This shelter is bad >:(",
        }, 
    ]

    const { getContextUser, setContextUser} = useContext(userContext);
    const user = props.user;
    const [comments, setComments] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [messageType, setMessageType] = useState("comment");
    const { shelterId } = props.objectId;
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // async function fetchComments(reset) {

    //     try {
    //         let actualpage;
    //         (reset) ? (actualpage = 1) : (actualpage = page);
    //         const response = await fetch(`http://localhost:8000/comments/shelter/${shelterId}?size=6&page=${actualpage}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${user.accessToken}`,
    //             }
    //         });
    //         if (response.status >= 200 && response.status < 300) {
    //             const data = await response.json();
    //             console.log([...comments, ...data.results])
    //             console.log(!!data.next)
    //             setHasMore(!!data.next)

    //             if (reset){
    //                 setPage(2)
    //                 setComments([...data.results])
    //             } else {
    //                 setPage(page + 1)
    //                 setComments([...comments, ...data.results])
    //             }
    //         } else {
    //             navigate("/")
    //         }
    //     } catch (e) {
    //         navigate("/")
    //     }
    // }

    // useEffect(function () {
    //     fetchComments(false)
    // }, []);

    // const sendMessage = async (e) => {
    //     e.preventDefault();
    //     if (messageType !== "comment") {
    //         try {
    //             const response = await fetch(`http://localhost:8000/shelters/${contextUserId}/`, {
    //                 method: 'PUT',
    //                 body: JSON.stringify({
    //                   status: messageType
    //                 }),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${user.accessToken}`,
    //                 }
    //             });
    //             const data = await response.json();
    //             if (response.status >= 200 && response.status < 300) {
    //                 setApplication({...application, status: messageType})
    //                 setFormErrors({})
    //                 console.log(data)
    //             } else if (response.status === 400) {
    //                 console.log(data)
    //                 setFormErrors({...data})
    //                 return
    //             } else if (response.status === 404) {
    //                 alert(404);
    //             } else {
    //                 console.log(response)
    //             }
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    //      if (e.target.chatInput.value || messageType === "comment"){
    //         try {
    //             const response = await fetch(`http://localhost:8000/comments/application/${applicationId}/`, {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                   text: e.target.chatInput.value
    //                 }),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${user.accessToken}`,
    //                 }
    //             });
    //             const data = await response.json();
    //             if (response.status >= 200 && response.status < 300) {
    //                 setFormErrors({})
    //                 console.log(data)
    //                 e.target.chatInput.value = ""
    //                 fetchComments(true)
    //             } else if (response.status === 400){
    //                 console.log(data)
    //                 setFormErrors({...data})
    //             } else if (response.status === 404) {
    //                 alert(404);
    //             } else {
    //                 console.log(response)
    //             }
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    // }

    const handleCommentCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/comments/shelter/${shelterId}`, {
                method: 'POST',
                body: JSON.stringify({
                    user,
                    text: 'testing comment feature',
                }),
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${user.accessToken}`,
                }
            });

            const data = await response.json();
            if (response.status >= 200 && response.status < 300) {
                console.log(...data);
            } else if (response.status === 400) {
                setFormErrors({...data});
            } else if (response.status === 404) {
                alert(404);
            } else {
                console.log(response);
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Write a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form> 
                        <Form.Group>
                            <Form.Label> Review Content </Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="5" 
                                name="chatInput"
                                isInvalid={formErrors?.status || formErrors?.text} 
                                controlId="chat-input"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCommentCreate}>
                        Submit
                    </Button>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card.Body>
                <Card.Title className="d-flex flex-row justify-content-between" > 
                    <h3 className="mb-0" >Reviews</h3> 
                    <Button className='me-3' variant="primary" onClick={handleShow}>
                        Write A Review!
                    </Button>
                </Card.Title>
                <Stack gap={1}>
                    { commentInformation.map((comment) => (
                        <Container className="shelter-review-card pt-2" style={{ backgroundColor: "#fffaf0"}}>
                            <Row>
                                <Col>
                                    <p>{comment.name}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>{comment.content}</p>
                                </Col>
                            </Row>
                        </Container>
                    ))}
                </Stack>
            </Card.Body>
        </Card>
    );
}

export default ShelterReviewsCard;
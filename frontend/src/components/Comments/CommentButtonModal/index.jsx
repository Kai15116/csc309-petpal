import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


/**
 * 
 * @param {label, userContext, objectId, for} props 
 * @returns 
 */
function CommentButtonModal(props) {
    const label = props.label;
    const userContext = props.userContext;
    const objectId = props.objectId;
    const commentFor = props.for;
    const replyTo = props.replyTo;
    const isReply = (commentFor === 'reply');

    const [formErrors, setFormErrors] = useState({});
    const [commentText, setCommentText] = useState('');
    const handleCommentChange = (e) => {
        if (isReply) {
            setCommentText(`@${replyTo.username} ${e.target.value}`);
        } else {
            setCommentText(e.target.value);
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShelterCommentCreate = async (e) => {
        e.preventDefault();

        if (isReply) {
            setCommentText(`@${replyTo.username} ${commentText}`);
        }
        console.log(commentFor);
        console.log(replyTo.username);
        console.log(isReply);
        console.log(objectId);
        console.log(commentText);
        console.log(userContext?.contextUserId);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/shelter/${objectId}/`, {
                method: 'POST',
                body: JSON.stringify({
                    text: commentText,
                }),
                headers: {
                    'Authorization': `Bearer ${userContext?.accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            if (response.status >= 200 && response.status < 300) {
                console.log("succeess!!!!");
                setFormErrors({});
                handleClose();
                window.location.reload(false);
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
        <>
            { isReply ? 
                <a href="#" style={{ textDecoration: 'none', fontSize: '12px', color: '#000000'}} onClick={handleShow}>
                    Reply
                </a> :
                <Button variant="primary" onClick={handleShow}>
                    {props.label ? props.label : "Add Comment"}
                </Button>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {props.label} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form> 
                        <Form.Group>
                            <Form.Label> Content </Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="5" 
                                onChange={(e) => handleCommentChange(e)}
                                isInvalid={formErrors?.status || formErrors?.text} 
                                placeholder='Enter content here'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleShelterCommentCreate}>
                        Submit
                    </Button>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CommentButtonModal;
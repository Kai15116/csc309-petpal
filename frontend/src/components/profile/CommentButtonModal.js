import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";


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

    const [formErrors, setFormErrors] = useState({});
    const [commentText, setCommentText] = useState('');
    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShelterCommentCreate = async (e) => {
        e.preventDefault();

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
            <Button variant="primary" onClick={handleShow}>
                {props.label ? props.label : "Add Review"}
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {props.label} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form> 
                        <Form.Group>
                            <Form.Label> Comment Content </Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="5" 
                                onChange={(e) => handleCommentChange(e)}
                                isInvalid={formErrors?.status || formErrors?.text} 
                                placeholder="Enter comment here"
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
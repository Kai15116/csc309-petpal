import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignupModal(props) {
    const {handleCloseModal, showModal} = props;
    const navigate = useNavigate();
    
    return (
        <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>User Registered</Modal.Title>
        </Modal.Header>
        <Modal.Body>Signup successfully. Now you can log in with your new account!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>navigate('/login')}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>

    )
}

export default SignupModal;

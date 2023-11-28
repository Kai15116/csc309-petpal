import { Card, ListGroup, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function PetCard(props) {
    const {name, id, picture_1, breed, age, weight, status } = props;
    const navigate = useNavigate();
    return (
        <Card style={{ width: '18rem', margin: "0.5rem"}} className="text-center">
        <Card.Img variant="top" src={picture_1} style={{height: "12rem", objectFit: "cover"}}/>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            {/* <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            </Card.Text> */}
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>Breed: {breed}</ListGroup.Item>
            <ListGroup.Item>Age: {age}</ListGroup.Item>
            <ListGroup.Item>Size: {weight}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
            <Button onClick={() => navigate(`/details/${id}`)} variant="outline-primary">Learn More</Button>
            
        </Card.Body>
        <Card.Footer className="text-muted">Status: {status}</Card.Footer>
        </Card>
    )
}

export default PetCard;

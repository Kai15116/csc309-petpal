import { Card, ListGroup, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/petCardStyles.css";
import PlaceholderPet from "../../assets/images/placeholderpet.png"

function PetCard(props) {
    const {name, id, picture_1, breed_name, age, weight, status } = props?.pet;
    const navigate = useNavigate();
    return (
        <Card style={{ width: '280px', marginBottom: "0.7rem"}} className="card-c">
        <Card.Img variant="top" src={picture_1} style={{height: "12rem", objectFit: "cover"}}/>
        <Card.Body>
            <Card.Title style={{fontWeight: "bold"}}>{name}</Card.Title>
            <Card.Text>
            Breed: {breed_name}
            <br></br>
            Age: {age}
            <br></br>
            Size: {weight}
            <br></br>
            <Card.Link href={`/details/${id}`}>Learn More</Card.Link>

            
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted text-center">Status: {status}</Card.Footer>
        </Card>
    )
}

export default PetCard;

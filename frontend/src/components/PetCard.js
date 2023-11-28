import { Card, ListGroup} from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function PetCard(props) {
    const {} = props;
    return (
        <Card style={{ width: '18rem', margin: "0.5rem" }}>
        <Card.Img variant="top" src={"#"} />
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        <Card.Body>
            <Card.Link href="/details" variant="primary">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
        </Card>
    )
}

export default PetCard;

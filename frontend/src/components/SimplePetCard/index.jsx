import { Card, Badge} from "react-bootstrap";


function SimplePetCard(props) {
    const {name, id, picture_1, breed, age, weight, status } = props;
    const size = props.size ? props.size : "300px";
    let badgeColor;

    switch (props.status) {
        case "available":
            badgeColor = "success";
            break;
        case "pending":
            badgeColor = "secondary";
            break;
        case "adopted":
            badgeColor = "danger";
            break;
        case "withdrawn":
            badgeColor = "warning";
            break;
    }

    return (
        <Card style={{ width: size}} className="card-c simple-card m-2">
        <Card.Img variant="top" src={picture_1} style={{height: size}}/>
        <Card.Body>
            <div className="d-flex align-items-center">
                <Card.Title style={{fontWeight: "bold"}}>{name}</Card.Title>
                <Badge className="ms-auto" bg={badgeColor}>{status}</Badge>
            </div>
            <Card.Link className="stretched-link" href={`/details/${id}`}></Card.Link>
        </Card.Body>
        </Card>
    )
}

export default SimplePetCard;
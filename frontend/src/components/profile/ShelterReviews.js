import { Card, Col, Container, Row, Stack } from "react-bootstrap";


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

    return (
        <Card>
            <Card.Body>
                <Card.Title> Reviews </Card.Title>
                <Stack gap={1}>
                    { commentInformation.map((comment) => (
                        <Container className="shelter-review-card pt-2" style={{ backgroundColor: "#fffaf0"}}>
                            <Row>
                                <Col className="d-flex justify-content-start">
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
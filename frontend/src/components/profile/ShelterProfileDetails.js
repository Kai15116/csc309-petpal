import { Button, Card } from "react-bootstrap";
import ExampleBanner from "../../assets/example_images/yosemite_banner.jpg";
import "../../styles/profiles.css"

// Props should be userInfo object to display appropriate information
function ShelterProfileDetailsCard(props) {
    const userInfo = props.userInfo;

    return (
        <Card style={{ position: "relative", bottom: "9rem", maxWidth: "30rem"}}>
            <Card.Body >
                <Card.Title> 
                    <h2>{userInfo?.username} </h2>
                </Card.Title>
                <Card.Subtitle className="text-muted" style={{ fontSize: "12px" }}> 
                    {userInfo?.address} 
                </Card.Subtitle>
                <Card.Text className="mt-3"> 
                    {userInfo?.email} Small description of the shelter Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aliquam dignissimos officia, ducimus voluptatem blanditiis in, ullam neque adipisci facere delectus aut nisi porro, nemo nihil quidem autem laudantium? Perspiciatis.
                </Card.Text>
            </Card.Body>
            <div className="mb-2" style={{ display: "flex", justifyContent: "space-evenly"}}>
                <Button variant="primary">
                    View Pets
                </Button>
                <Button variant="terniary">
                    Show Contact
                </Button>
            </div>
        </Card>
    );
}

export default ShelterProfileDetailsCard;
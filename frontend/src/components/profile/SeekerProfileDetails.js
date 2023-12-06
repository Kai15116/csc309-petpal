import { Button, Card, Collapse} from "react-bootstrap";
import ExampleBanner from "../../assets/example_images/yosemite_banner.jpg";
import "../../styles/profiles.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Props should be userInfo and userId object to display appropriate information
function SeekerProfileDetailsCard(props) {
    const userId = props.userId;
    const userInfo = props.userInfo;
    const [contactOpen, setContactOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Card className="mt-3" style={{ maxWidth: "30rem"}}>
            <Card.Body className="pb-3" >
                <Card.Title> 
                    <h3> About {userInfo?.username} {' '}
                    {   // Check if viewer is same as page owner
                        (true) && (
                            <a href="" onClick={() => { navigate("/shelterprofileedit") }}>
                                <i className="bi bi-pencil-square"></i>
                            </a>
                        )
                    }

                    </h3>
                </Card.Title>
                <Card.Subtitle className="text-muted" style={{ fontSize: "14px" }}> 
                    {userInfo?.address} 
                </Card.Subtitle>
                <Card.Text className="mt-2"> 
                    {/* {userInfo?.description} */}
                    Since you have no small description of the shelter Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Natus aliquam dignissimos officia, ducimus voluptatem blanditiis in, ullam neque adipisci 
                    facere delectus aut nisi porro, nemo nihil quidem autem laudantium? Perspiciatis.
                </Card.Text>
                <div className="mb-2">
                    <Button 
                        variant="outline-primary" 
                        onClick={() => setContactOpen(!contactOpen)}
                        aria-controls="shelter-contact-collapse" 
                        aria-expanded={contactOpen}
                    >
                        Show Contact
                    </Button>
                </div>
                <Collapse in={contactOpen}>
                    <div className="" >
                        <Card className="m-0 p-0" id="shelter-contact-collapse">
                            <Card.Body>
                                { (userInfo?.email) && (<p>Email: {userInfo?.email}</p>)}
                                { (userInfo?.phone_number) && (<p>Phone: {userInfo?.phone_number}</p>)}
                                { (userInfo?.website) && (<p>Site: {userInfo?.website}</p>)}
                            </Card.Body>
                        </Card>
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
}

export default SeekerProfileDetailsCard;
import { Button, Card, Collapse, Image } from "react-bootstrap";
import ExampleBanner from "../../../assets/example_images/yosemite_banner.jpg";
import ExampleMilky from "../../../assets/example_images/milky3.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Props should be userInfo and contextUserId object to display appropriate information
function SeekerProfileDetailsCard(props) {
    const contextUserId = props.contextUserId;
    const userInfo = props.userInfo;
    const [contactOpen, setContactOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Card className="d-flex column" >
            <Card.Img variant="top" src={ExampleBanner} alt="Example Banner"/>
            {/* <Image 
                src={ExampleMilky}
                style={{ 
                    position: "absolute",
                    left: "calc(50% - 8vh)",
                    top: "10%",
                    width: "calc(16vh)",
                    height: "16vh",
                    borderRadius: "50%",
                    backgroundSize: "cover",
                    border: '3px solid #FFFFFF'
                }}
            /> */}
            <Card.Body className="pb-3" >
                <Card.Title className="mt-2" > 
                    <h3> About {userInfo?.username} {' '}
                    {   // Check if viewer is same as page owner
                        (contextUserId === userInfo?.id) && ( 
                            <a href="" onClick={() => { navigate("/profileedit") }}>
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
                            <Card.Body className="pb-0" >
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
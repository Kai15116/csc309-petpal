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
            <Card.Img variant="top" src={userInfo?.banner ? userInfo?.banner : ExampleBanner} alt="Example Banner"/>
            <Image 
                className="m-0 p-0"
                style={{
                    position: 'absolute',
                    top: '5rem',
                    left: 'calc(50% - 4rem)',
                    backgroundColor: 'yellow',
                    borderRadius: '4rem',
                    border: '3px solid white',
                    minWidth: '8rem',
                    maxWidth: '8rem',
                    minHeight: '8rem',
                    maxHeight: '8rem',
                }}
                src={userInfo?.profile_picture ? userInfo?.profile_picture : ExampleMilky}
                alt='Profile Picture'
            />
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
            <Card.Body className="pb-3 mt-5" >
                <Card.Title className="mt-2 d-flex flex-row justify-content-center align-items-center" > 
                    <h3> About {userInfo?.username} {' '} </h3>
                    {   // Check if viewer is same as page owner
                        (contextUserId === userInfo?.id) ? ( 
                            <a className="ms-2 mb-2" href="" onClick={() => { navigate("/profileedit") }}>
                                <i className="bi bi-pencil-square" ></i>
                            </a>
                        ) : (
                            <a> </a>
                        )
                    }

                </Card.Title>
                <Card.Subtitle className="text-muted" style={{ fontSize: "14px" }}> 
                    {userInfo?.address} 
                </Card.Subtitle>
                <Card.Text className="mt-2"> 
                    {/* {userInfo?.description} */}
                    Since you have no small description of your profile, here is a placeholder description to show what it is 
                    like to have a description. You can modify this description however you like.
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
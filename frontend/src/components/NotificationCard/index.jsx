import { Card, Row, Col } from "react-bootstrap";
import {Image, Button} from "react-bootstrap";
import PlaceHolder from "../../assets/images/placeholderprofile.png"
import { useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { formatTimeGap } from "../../utils";
import { userContext } from '../../context/userContext';
import {useContext} from "react";
import "./style.css";

const formatNotificationType = (note_type) => {
    switch (note_type) {
        // Application
        case "status_update":
            return {note_category:"Application", msg:"Application status updated! Please checkout the existing applications. ", contentType: "application", color: "danger"}
        case "application_creation":
            // 
            return {note_category:"Application", msg:"There is a new application created for you!", contentType: "application", color: "danger"}
        case "new_review":
            // 
            return {note_category:"Review", msg:"You just received a new review from our seeker. Please take a look.", contentType: "pet", color: "info"}
        case "new_message":
            // conversation //
            return {note_category:"Message", msg:"Note: New message received! Please checkout here.", contentType: "pet", color: "success", }
        case "new_pet_listing":
            // Details/id
            return {note_category:"Pet", msg:"New pet added! Click to view detail.", contentType: "pet", color: "primary"}
        default:
            // landing/profile
            return {note_category:"Notification", msg:"Seems like there is a new notification.", contentType: "pet", color:"secondary"}
    }
}



function NotificationCard(props) {
    const {created_at, notification_type, read, id, object_id, comment_object_id} = props.note;
    const {note_category, msg, contentType, color} = formatNotificationType(notification_type);
    const navigate = useNavigate();
    const { getContextUser } = useContext(userContext)
    const user = getContextUser()

    const handleClick = async (id) => {
        // url + object_id
        
        props.readNotification(id)

        switch (notification_type) {
            case "status_update":
                navigate(`/application/${object_id}`)
                return
            case "application_creation":
                navigate(`/application/${object_id}`)
                return
            case "new_review":
                navigate(`/shelterprofile/${comment_object_id}`)
                return
            case "new_message":
                navigate(`/application/${comment_object_id}`)
                return
            case "new_pet_listing":
                navigate(`/details/${object_id}`)
                return
            default:
                return
        }
    }

	
	return (
		<Card className="w-100 notification-card" style={{ lineHeight: "1", marginBottom: "0rem"}} onClick={() => handleClick(id)}>
			<Card.Body>
                    <div style={{display: "grid", gridTemplateColumns: "1fr 80px auto"}}>
                    {/* <div style={{paddingLeft: "1rem" }}>
						<Image src={PlaceHolder} width={70} height={70} style={{borderRadius:"100%"}}></Image>
					</div> */}
					<div >
                        <ul style={{listStyle: "none"}}>
                            <li>
                            <Badge bg={color}>{note_category}</Badge>
                            </li>
                            <li>
                            <Card.Text style={{fontWeight: "400"}}>{msg}</Card.Text>
                            </li>
                            <li>
                            <Card.Text style={{color: "grey"}}>{formatTimeGap(new Date(created_at))}</Card.Text>
                            </li>
                        
                        </ul>                
					</div>	
                    <div style={{display:"flex", alignItems: "center"}}>
                        <Button hidden={!props.delOption} variant="secondary" style={{verticalAlign:"center"}} onClick={(event)=> {event.stopPropagation();props.deleteNotification(id);}}><i className="bi bi-x-lg"></i></Button></div>
                    <div style={{display: "flex", flexDirection: "column", gap: "2rem", paddingTop:"10px", paddingRight: "1rem"}}>
                        
                        {<div style={{width: "10px", height:"10px", borderRadius: "50%",background: `${read? "transparent": "blue"}`}}></div>}
                    </div>
                    
				</div>
                
			</Card.Body>
		</Card>
	)
}

export default NotificationCard;
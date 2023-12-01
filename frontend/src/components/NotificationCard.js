import { Card, Row, Col } from "react-bootstrap";
import {Image, Button} from "react-bootstrap";
import PlaceHolder from "./../assets/images/placeholderprofile.png"
import { useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { formatTimeGap } from "../utils";

const formatNotificationType = (note_type) => {
    switch (note_type) {
        case "status_update":
            return {note_category:"Application", msg:"Application status updated! Please checkout the existing applications. ", contentType: "application", color: "danger"}
        case "application_creation":
            return {note_category:"Application", msg:"There is a new application created for you!", contentType: "application", color: "danger"}
        case "new_review":
            // TODO: make it to proper id
            return {note_category:"Review", msg:"You just received a new review from our seeker. Please take a look.", contentType: "pet", color: "info"}
        case "new_message":
            // TODO: make it to proper id
            return {note_category:"New message for your application!", msg:"", contentType: "pet"}
        case "new_pet_listing":
            return {note_category:"Pet", msg:"New pet added!", contentType: "pet", color: "primary"}
        default:
            return {note_category:"New notification!", msg:"", contentType: "pet"}
    }
  }

function NotificationCard(props) {
    const {created_at, notification_type, read, id} = props.note;
    const {note_category, msg, contentType, color} = formatNotificationType(notification_type);

	
	return (
		<Card className="w-100 " style={{ paddingLeft: "3rem", lineHeight: "1", marginBottom: "0rem"}}>
			<Card.Body>
			
                  
                    <div style={{display: "grid", gridTemplateColumns: "80px 1fr 80px auto"}}>
                    <div style={{paddingLeft: "1rem" }}>
						<Image src={PlaceHolder} width={70} height={70} style={{borderRadius:"100%"}}></Image>
					</div>
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
                        <Button hidden={!props.delOption} variant="secondary" style={{verticalAlign:"center"}} onClick={()=> {props.deleteNotification(id)}}><i className="bi bi-x-lg"></i></Button></div>
                    <div style={{display: "flex", flexDirection: "column", gap: "2rem", paddingTop:"10px", paddingRight: "1rem"}}>
                        
                        {!read&&<div style={{width: "10px", height:"10px", borderRadius: "50%",background: "blue"}}></div>}
                    </div>
                    
				</div>
                
			</Card.Body>
		</Card>
	)
}

export default NotificationCard;
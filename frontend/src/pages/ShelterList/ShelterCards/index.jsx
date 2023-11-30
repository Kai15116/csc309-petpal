import { Card, Row, Col } from "react-bootstrap";
import {Image} from "react-bootstrap";
import PlaceHolder from "../../../assets/images/placeholderprofile.png"
import { useNavigate } from "react-router-dom";
import "./style.css";

function ShelterCard(props) {
	const {username, email, address, id, profile_picture} = props?.shelter;
	const navigate = useNavigate();
	const handleClick = (id) => {
		navigate(`/shelterprofile/${id}`);
	}
	
	return (
		<Card className="w-100 shelter-card" style={{ paddingLeft: "3rem", lineHeight: "1", marginTop: "0.5rem"}} onClick={() => handleClick(id)}>
			<Card.Body>
				<Row xs={1} md={2} lg={3} xl={4}>
					<Col style={{paddingLeft: "2rem"}}>
						<Image src={profile_picture||PlaceHolder} width={50} height={50} style={{borderRadius:"100%"}}></Image>
					</Col>
					
					<Col>
						<Card.Text className="shelter-card_title" style={{paddingTop: "0.8rem", paddingBottom: "0.8rem"}}>{username}</Card.Text>
					</Col>
					<Col>
						<Card.Text style={{paddingTop: "0.8rem", paddingBottom: "0.8rem"}}>contact: {email}</Card.Text>
					</Col>
					<Col>
						<Card.Text style={{paddingTop: "0.8rem", paddingBottom: "0.8rem"}}>location: {address}</Card.Text>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	)
}

export default ShelterCard;



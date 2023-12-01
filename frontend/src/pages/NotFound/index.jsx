import NotFoundImage from "../../assets/images/404page.jpg"
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
function NotFound() {
    return (
        <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Image src={NotFoundImage} width={200} height={200}></Image>
            <h1>404 NotFound</h1>
            <p>Your requested page is not found. Please double check the URL and try again.</p>
            <Link to={"/"}>Back to Landing Page</Link>
        </div>
    )
}

export default NotFound;

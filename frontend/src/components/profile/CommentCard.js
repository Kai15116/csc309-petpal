import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { formatTimeGap } from "../../utils";

/**
 * 
 * @param {comment} props 
 * Where comment is a comment model object
 */
function CommentCard(props) {
    const allowReply = props.allowReply;
    const comment = props.comment;
    const poster = comment.user;
    const content = comment.text;
    const createdDate = formatTimeGap(comment.created_at);

    // useEffect( function () {
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/shelter/${poster}`, {

    //     });
    // });

    return (
        <Card style={{borderColor: '#FAAF75'}} >
            <Card.Header className="pb-0" style={{ backgroundColor: '#FED29A' }}>
                <h6>ID #{comment.id} | Anonymous User {poster} </h6>
            </Card.Header>
            <Card.Body style={{ backgroundColor: '#FFEDD1', borderRadius: '0px 0px 5px 5px' }}>
                {content}
            </Card.Body>    
            <Card.Footer className="py-1 d-flex flex-row align-items-center justify-content-between" style={{ backgroundColor: '#FED29A'}}>
                <p className="m-0" style={{ fontSize: '10px' }} >{createdDate}</p>
                { allowReply ? <a style={{ fontSize: '10px' }}>Reply</a> : <a></a> }
            </Card.Footer>
        </Card>
    );
}

export default CommentCard;

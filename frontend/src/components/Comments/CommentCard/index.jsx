import { useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import { formatTimeGap } from "../../../utils";
import ExampleMilky from "../../../assets/example_images/milky3.jpg";
import CommentButtonModal from "../CommentButtonModal";

/**
 * 
 * @param {comment} props 
 * Where comment is a comment model object
 */
function CommentCard(props) {
    const viewer = props.viewer;
    const viewerId = viewer.contextUserId;
    const ownerId = props.ownerId;
    const allowReply = props.allowReply;
    const comment = props.comment;
    const poster = comment.user;
    const content = comment.text;
    const createdDate = formatTimeGap(comment.created_at);
    var commentColor = '#FAAF75';
    var sideColor = '#FED29A';

    if (poster === viewerId) {
        commentColor = "#000000";
    }
    if (comment.object_id == ownerId) {
        sideColor = '#A0A29A';
    }

    return (
        <Card style={{borderColor: commentColor}} >
            <Card.Header className="ps-2 d-flex flex-row align-items-center " style={{ backgroundColor: sideColor }}>
                <Image
                    src={comment?.profile_picture ? comment.profile_picture : ExampleMilky}
                    style={{
                        backgroundColor: "#FAAF75", 
                        minWidth: "3rem", 
                        maxWidth: "3rem",
                        minHeight: "3rem", 
                        maxHeight: '3rem',
                        borderRadius: '1.5rem',
                    }} 
                />
                <h6 className="mt-2 ms-4" > 
                    {comment.username} 
                </h6>
            </Card.Header>
            <Card.Body style={{ backgroundColor: '#FFEDD1'}}>
                {content}
            </Card.Body>    
            <Card.Footer className="py-1 d-flex flex-row align-items-center justify-content-between" style={{ backgroundColor: sideColor}}>
                <p className="m-0" style={{ fontSize: '12px' }} >{createdDate}</p>
                { allowReply ? 
                    <CommentButtonModal
                        label={`Reply to ${comment.username}`}
                        userContext={viewer}
                        objectId={comment.object_id}
                        for="reply"
                        replyTo={comment}
                    /> : 
                    <a></a> 
                }
            </Card.Footer>
        </Card>
    );
}

export default CommentCard;

import { Modal, Button, Card, Col, Container, Row, Stack, Form} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {userContext} from "../../context/userContext";
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentButtonModal from "./CommentButtonModal";
import CommentCard from "./CommentCard";


// Pass in objectId, userContext, and what the comment is for
function ShelterReviewsCard(props) {
    const commentInformation = [
        {
            name: "Milky Tao",
            content: "I love this shelter!",
        }, 
        {
            name: "Bean Tao",
            content: "This shelter is bad >:(",
        }, 
    ]

    const user = props.userContext;
    const shelterId = props.objectId;

    const [comments, setComments] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const navigate = useNavigate();

    async function fetchComments(reset) {
        try {
            let actualpage;
            (reset) ? (actualpage = 1) : (actualpage = page);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/shelter/${shelterId}?size=4&page=${actualpage}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`,
                }
            });
            if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                console.log([...comments, ...data.results])
                console.log(!!data.next)
                setHasMore(!!data.next)

                if (reset){
                    setPage(2)
                    setComments([...data.results])
                } else {
                    setPage(page + 1)
                    setComments([...comments, ...data.results])
                }
            } else {
                console.log(response);
            }
        } catch (e) {
            navigate("/")
        }
    }

    useEffect( function () {
        fetchComments(false);
    }, []);

    return (
        <Card >
            <Card.Title className="pt-3 px-4 d-flex flex-row justify-content-between" > 
                <h3 className="mb-0 mt-1" >Reviews</h3> 
                <CommentButtonModal 
                    label="Write Review"
                    userContext={user}
                    objectId={shelterId}
                    for="shelter"
                />
            </Card.Title>
            <Card.Body className="mb-2 review-container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <InfiniteScroll 
                    dataLength={comments.length} 
                    hasMore={hasMore} 
                    next={fetchComments(false)} 
                    inverse={true}
                    loader={<p className="mt-3 mb-0" style={{ textAlign: "center" }}>Loading...</p>}
                    scrollableTarget="review-container"
                    endMessage={
                        <p className="mt-3 mb-0" style={{ textAlign: "center" }}>
                            No more comments
                        </p>
                    }
                >
                    <Stack gap={3}>
                        { comments.map((comment) => (
                            <CommentCard 
                                key={comment.id}
                                comment={comment}
                                allowReply={true}
                            /> 
                        ))}
                    </Stack>
                </InfiniteScroll>
            </Card.Body>
            <Card.Footer>
                Rate this shelter!
            </Card.Footer>
        </Card>
    );
}

export default ShelterReviewsCard;
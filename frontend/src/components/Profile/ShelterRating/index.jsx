import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Card } from 'react-bootstrap';

// userid, shelterid
const ShelterRating = (props) => {
    const [rating, setRating] = useState(0);
    const [rated, setRated] = useState(false);
    const userContext = props.userContext;
    const userId = userContext.contextUserId;
    const shelterId = props.shelterId;

    async function updateRating(selectedRating) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/rating/${shelterId}/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                rating: selectedRating,
            }),
            headers: {
                'Authorization': `Bearer ${userContext?.accessToken}`,
                'Content-Type': 'application/json',
            }
        });
    }

    async function createRating(selectedRating) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/rating/`, {
            method: 'POST',
            body: JSON.stringify({
                user: userId,
                shelter: shelterId,
                rating: selectedRating,
            }),
            headers: {
                'Authorization': `Bearer ${userContext?.accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        if (response.status >= 200 && response.status < 300) {
            console.log("Rating Succeeded");
            console.log({...data});
            console.log('Rating: ', rating);
            setRated(true);
        } else if (response.status >= 400) {
            console.log({...data});
            updateRating(selectedRating)
            setRated(false);
        } else if (response.status === 404) {
            alert(404);
        } else {
            console.log(response);
        }
    }

    async function retrieveRating() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/rating/${shelterId}/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userContext?.accessToken}`,
            }
        });

        const data = await response.json();
        if (response.status >= 200 && response.status < 300) {
            console.log("Rating Fetch Succeeded");
            console.log({...data});
            console.log('Rating: ', data.rating);
            setRating(data.rating);
        } else if (response.status >= 400) {
            console.log({...data});
        } else if (response.status === 404) {
            alert(404);
        } else {
            console.log(response);
        }
    }

    useEffect( function () {
        retrieveRating();
    }, []);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        createRating(selectedRating);
    };

    return (
        <>
            <div className='d-flex flex-row justify-content-between' >
                <Card.Text className="mb-2">Rate Shelter:</Card.Text>
                <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        key={star}
                        icon={star <= rating ? solidStar : regularStar}
                        className="star-icon"
                        onClick={() => handleStarClick(star)}
                    />
                    ))}
                </div>
                <Card.Text className="">{`${rating}/5`}</Card.Text>
            </div>
            {rated && <p>Thank you for the rating!</p>} 
        </>
    );
};

export default ShelterRating;

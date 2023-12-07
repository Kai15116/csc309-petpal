import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Card } from 'react-bootstrap';

const ShelterRating = () => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        console.log(rating);
    };

    return (
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
    );
};

export default ShelterRating;

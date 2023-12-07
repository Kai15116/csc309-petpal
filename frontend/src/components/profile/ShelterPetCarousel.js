import { Carousel, Card, Container} from "react-bootstrap";
import ExampleBean from "../../assets/example_images/bean1.jpg";
import ExampleMilky from "../../assets/example_images/milky4.jpg";
import { useState, useEffect } from "react";
import { formatTimeGap } from "../../utils";
import { useNavigate } from "react-router-dom";

function ShelterPetCarouselCard(props) {
    const shelterId = props.shelterId;
    const petInformation = [
        {
            id: 1, 
            name: "Bean", 
            breed: "Cat", 
            picture_1: ExampleBean,
            notes: "Loves to play with toys, especially ones that look like fish!",
            last_modified: "Today",
        },
        { 
            id: 2, 
            name: "Buddy", 
            breed: "Dog", 
            picture_1: ExampleMilky,
            notes: "Has a big heart, almost as big as his appetite.",
            last_modified: "Today",
        },
        // Add more pet information as needed
    ];
    const [pets, setPets] = useState(petInformation);
    const navigate = useNavigate();
    
    useEffect(function () {
        async function fetchPets() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/pets?owner=${shelterId}&size=10&page=1`, {
                    method: 'GET',
                });

                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    console.log(data)
                    setPets([...data.results])
                } else if (response.status === 404) {
                    alert(404);
                } else {
                    console.log(response.status)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchPets();
    }, []);



    return (
        <Carousel className="mb-3" indicators={false}>
            {pets.map((pet) => (
                <Carousel.Item key={pet.id}>
                    <Card 
                        style={{ minWidth: "20rem", maxWidth: "40rem"}}
                    >
                        <Card.Img 
                            variant="top" 
                            src={pet.picture_1} 
                            alt={pet.name}
                            style={{
                                objectFit: 'cover',
                                maxHeight: '70vh',
                                maxWidth: '40rem',
                            }}
                        />
                        <Card.Body >
                            <Card.Title>{pet.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{pet.breed_name}</Card.Subtitle>
                            <Card.Text>
                                <b>Notes: </b> 
                                <p className="mb-0" >{pet.notes}</p>
                                <Card.Link href={`/details/${pet.id}`} className="stretched-link">Learn More</Card.Link>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            {formatTimeGap(pet.last_modified)}
                        </Card.Footer>
                    </Card>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ShelterPetCarouselCard;

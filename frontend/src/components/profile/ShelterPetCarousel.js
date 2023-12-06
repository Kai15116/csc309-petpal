import { Carousel, Card, Container} from "react-bootstrap";
import ExampleBean from "../../assets/example_images/bean1.jpg";

function ShelterPetCarouselCard() {
  const petInformation = [
    {
         id: 1, 
         name: "Bean", 
         breed: "Cat", 
         image: ExampleBean,
         description: "Loves to play with toys, especially ones that look like fish!",
         date: "Today",
    },
    { 
        id: 2, 
        name: "Buddy", 
        breed: "Dog", 
        image: "buddy.jpg",
        description: "Has a big heart, almost as big as his appetite.",
        date: "Today",
    },
    // Add more pet information as needed
  ];

  return (
    <Carousel className="mb-3" indicators={false} >
        {petInformation.map((pet) => (
            <Carousel.Item key={pet.id}>
                <Card style={{ minWidth: "20rem", maxWidth: "40rem"}}>
                    <Card.Img variant="top" src={ExampleBean} alt={pet.name}/>
                    <Card.Body>
                        <Card.Title>{pet.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{pet.breed}</Card.Subtitle>
                        <Card.Text>{pet.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        Updated Today
                    </Card.Footer>
                </Card>
            </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default ShelterPetCarouselCard;

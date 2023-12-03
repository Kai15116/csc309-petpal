import { Carousel, Card } from "react-bootstrap";
import ExampleBean from "../../assets/example_images/bean1.jpg";

function ShelterPetCarousel() {
  const petInformation = [
    {
         id: 1, 
         name: "Bean", 
         breed: "Cat", 
         image: ExampleBean,
         description: "Loves to play with toys, especially ones that look like fish!"
    },
    { 
        id: 2, 
        name: "Buddy", 
        breed: "Dog", 
        image: "buddy.jpg",
        description: "Has a big heart, almost as big as his appetite.",
    },
    // Add more pet information as needed
  ];

  return (
    <Card style={{ width: "40rem",}}>
      <Carousel>
        {petInformation.map((pet) => (
            <Carousel.Item key={pet.id}>
            <Card.Img variant="top" src={ExampleBean} alt={pet.name} />
            <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{pet.breed}</Card.Subtitle>
                <Card.Text>{pet.description}</Card.Text>
            </Card.Body>
            </Carousel.Item>
        ))}
      </Carousel>
    </Card>
  );
}

export default ShelterPetCarousel;

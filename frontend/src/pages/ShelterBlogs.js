import React, { useState } from 'react';
import { Carousel, Pagination } from 'react-bootstrap';
import ProfileHeader from '../components/ProfileHeader';
import Footer from '../components/Footer';
import shelterPortrait from '../assets/example_images/shelter_portrait.jpg';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';

const ShelterBlogs = () => {
  const [sheltersData, setSheltersData] = useState([
    {
      name: 'Shelter A',
      profilePic: shelterPortrait,
      blogContent: 'Lorem ipsum dolor sit amet consectetur adipiscing elit mus ornare metus...',
      images: [image1, image2, image3],
      likes: 0, 
    },
    {
      name: 'Shelter B',
      profilePic: shelterPortrait,
      blogContent: 'Lorem ipsum dolor sit amet consectetur adipiscing elit mus ornare metus...',
      images: [image1, image2, image3],
      likes: 0,
    },
    {
      name: 'Shelter C',
      profilePic: shelterPortrait,
      blogContent: 'Lorem ipsum dolor sit amet consectetur adipiscing elit mus ornare metus...',
      images: [image1, image2, image3],
      likes: 0,
    },
    {
      name: 'Shelter D',
      profilePic: shelterPortrait,
      blogContent: 'Lorem ipsum dolor sit amet consectetur adipiscing elit mus ornare metus...',
      images: [image1, image2, image3],
      likes: 0,
    },
  ]);

  const SheltersPerPage = 2; // Number of shelters to display per page
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const LikeButton = ({ likes, onLikeClick }) => (
    <button className="btn btn-outline-primary" onClick={onLikeClick}>
      Like: {likes}
    </button>
  );

  const handleLikeClick = (index) => {
    const updatedSheltersData = [...sheltersData];
    updatedSheltersData[index].likes += 1;
    setSheltersData(updatedSheltersData);
  };

  const startIndex = (activePage - 1) * SheltersPerPage;
  const endIndex = startIndex + SheltersPerPage;

  const sheltersToDisplay = sheltersData.slice(startIndex, endIndex);

  return (
    <div style={{ backgroundColor: '#f2f8fe' }}>
      <ProfileHeader />
      <div className="d-flex">
        {/* left-hand sidebar */}
        <div className="bg-white mt-4 p-4 rounded shadow" style={{ height: 'fit-content' }}>
          <h4>Search By Blog Title:</h4>
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search here..."
              aria-label="Search"
              aria-describedby="search-btn"
              required
            />
            <button className="btn btn-outline-success" type="submit" id="search-btn">
              Search
            </button>
          </div>

          <div className="mt-3">
            {/* filter options dropdown */}
            <h4>Filter by:</h4>
            <select className="form-select">
              <option value="mostLiked">Likes: Most liked</option>
              <option value="newestFirst">Posted: Newest first</option>
              <option value="leastLiked">Likes: Least liked</option>
              <option value="oldestFirst">Post: Oldest first</option>
            </select>
          </div>

          <div style={{ marginTop: '10px' }}>
            <h4>Page:</h4>
            <Pagination>
              {Array.from({ length: Math.ceil(sheltersData.length / SheltersPerPage) }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === activePage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>

        {/* main content area */}
        <div id="lst-container" style={{ margin: '50px', flex: 1 }}>
          <div className="d-flex" style={{ marginBottom: '20px', flex: 1 }}>
            <h1 className="ms-1 mb-0">Shelter Blogs</h1>
            <a className="btn btn-secondary ms-auto align-self-end" href="pet_creation.html">
              Add New Blog
            </a>
          </div>
          <hr />
          {sheltersToDisplay.map((shelter, index) => (
            <div key={index} className="bg-white p-4 rounded shadow mb-4">
              <div className="d-flex align-items-center">
                <h2 className="me-3">{shelter.name}</h2>
                <img
                  src={shelter.profilePic}
                  alt={`${shelter.name} Profile Pic`}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <h3>{`${shelter.name} Blog`}</h3>
                <p>{shelter.blogContent}</p>

                {/* image Carousel */}
                <Carousel>
                  {shelter.images.map((image, imageIndex) => (
                    <Carousel.Item key={imageIndex}>
                      <img className="d-block w-100" src={image} alt={`${shelter.name} ${imageIndex + 1}`} />
                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
                <div className="like-button-container">
                  <LikeButton likes={shelter.likes} onLikeClick={() => handleLikeClick(index)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShelterBlogs;

import React, { useState, useEffect, useContext } from 'react';
import { Carousel, Pagination } from 'react-bootstrap';
import ProfileHeader from '../components/ProfileHeader';
import Footer from '../components/Footer';
import shelterPortrait from '../assets/example_images/shelter_portrait.jpg';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import noImage from "../assets/images/image-not-found-scaled.png"
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import BlogImagesCarousel from '../components/BlogImagesCarousel';

const ShelterBlogs = () => {
  const {getContextUser} = useContext(userContext);
  const navigate = useNavigate();
  const { blogId, shelterId } = useParams();
  const [blogInfo, setBlogInfo] = useState(null);
  const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();

  const [allShelters, setAllShelters] = useState([{}]);
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
    // {
    //   name: 'Shelter D',
    //   profilePic: shelterPortrait,
    //   blogContent: 'Lorem ipsum dolor sit amet consectetur adipiscing elit mus ornare metus...',
    //   images: [image1, image2, image3],
    //   likes: 0,
    // },
  ]);

  // selected images for liking mechanisim
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  const SheltersPerPage = 2; // Number of shelters to display per page
  const [activePage, setActivePage] = useState(1);

  // get all blogs
  useEffect(function() {
    async function fetchUserInfo() {
        try {
            const response = await fetch(`http://localhost:8000/blogs/`, {
            method: 'GET',
        });
        if (response.status === 403) {
            navigate('/');


            // setAllowAccess(false);
        } else if (response.status >= 200 && response.status < 300) {
            const data = await response.json();
            setAllShelters(convertObjectToArray({...data}))
            // console.log("allShelters", processImages({...data}))
            console.log("allShelters", convertObjectToArray({...data}))
            console.log("sheltersData", sheltersData)

            // setAllowAccess(true);
        }} catch (e) {
            console.log(e);
            navigate('/');
        }
    }
    fetchUserInfo();

}, [])

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const LikeButton = ({ likes, onLikeClick }) => (
    <button className="btn btn-outline-primary" onClick={onLikeClick}>
      Like: {likes}
    </button>
  );

  const extractFileName = (url) => {
    if (!url)
        return noImage
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  // increment like count of blog at index shelterIndex
  const handleLikeClick = async (shelterIndex) => {
    const blogId = allShelters[shelterIndex].id
    const currLikes = allShelters[shelterIndex].likes;

    const formData = new FormData();
    formData.append('title', allShelters[shelterIndex].title);
    formData.append('content', allShelters[shelterIndex].content);
    // append like count + 1
    formData.append('likes', currLikes + 1);

    // convert images
    const blob1 = await fetch(allShelters[shelterIndex].picture_1).then((r) => r.blob());
    const file1 = new File([blob1], extractFileName(allShelters[shelterIndex].picture_1), { type: "image/jpeg" });

    const blob2 = await fetch(allShelters[shelterIndex].picture_2).then((r) => r.blob());
    const file2 = new File([blob2], extractFileName(allShelters[shelterIndex].picture_2), { type: "image/jpeg" });

    const blob3 = await fetch(allShelters[shelterIndex].picture_3).then((r) => r.blob());
    const file3 = new File([blob3], extractFileName(allShelters[shelterIndex].picture_3), { type: "image/jpeg" });

    formData.append('picture_1', file1);
    formData.append('picture_2', file2);
    formData.append('picture_3', file3);
  
    // make a PUT request to update the blog
    fetch(`http://localhost:8000/blogs/${blogId}/`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log('Edit successful:', data);

        // increment the likes locally
        const updatedLikes = currLikes + 1;

        // create a copy of the allShelters array
        const updatedShelters = [...allShelters];
        
        // update the likes in the copy
        updatedShelters[shelterIndex] = {
          ...allShelters[shelterIndex],
          likes: updatedLikes,
        };

        setAllShelters(updatedShelters);
      })
      .catch(error => {
        console.error('Error editing pet:', error);
      });
  };

  function convertObjectToArray(inputObject) {
    const resultArray = [];
  
    Object.keys(inputObject).forEach((key) => {
      resultArray[parseInt(key, 10)] = inputObject[key];
    });
  
    return resultArray.filter(Boolean); 
  }

  const startIndex = (activePage - 1) * SheltersPerPage;
  const endIndex = startIndex + SheltersPerPage;
  const sheltersToDisplay = allShelters.slice(startIndex, endIndex);

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
                <h2 className="me-3">{shelter.title}</h2>
                <img
                  src={shelter.profilePic}
                  alt={`${shelter.title} Profile Pic`}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <p>{shelter.content}</p>

                {/* image carousel component */}
                <BlogImagesCarousel shelter={shelter} />
              
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

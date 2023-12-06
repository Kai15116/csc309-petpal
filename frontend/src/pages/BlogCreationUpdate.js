import React, { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import image1 from "../assets/images/image1.jpg"
import image2 from "../assets/images/image2.jpg"
import image3 from "../assets/images/image3.jpg"
import noImage from '../assets/images/no_image_icon.png'; 
import '../styles/blog_creation_and_update.css'; 
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';

const BlogCreationUpdate = () => {
  const {getContextUser} = useContext(userContext);
  const navigate = useNavigate();
  const { blogId, shelterId } = useParams();
  const [blogInfo, setBlogInfo] = useState(null);
  const {accessToken, refreshToken, contextUserId, contextUserType} = getContextUser();

  const [title, setTitle] = useState('');
  const [shelterName, setShelterName] = useState('');
  const [blogContent, setBlogContent] = useState('');
  // const [uploadedImages, setUploadedImages] = useState([noImage, noImage, noImage]);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleImageChange1 = (e) => {
    setSelectedImage1(e.target.files[0]);
    // clear any previous error message when a new image is selected
    setImageError1('');
  };

  const handleImageChange2 = (e) => {
    setSelectedImage2(e.target.files[0]);
    setImageError2('');
  };

  const handleImageChange3 = (e) => {
    setSelectedImage3(e.target.files[0]);
    setImageError3('');
  };

  const extractFileName = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  // title and content must be entred 
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  // image upload error states
  const [imageError1, setImageError1] = useState('');
  const [imageError2, setImageError2] = useState('');
  const [imageError3, setImageError3] = useState('');

  // success message
  const [successMessage, setSuccessMessage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);

    if (event.target.value !== '') {
      setTitleError('');
    }
  };

  const handleBlogContent = (newContent) => {
    setBlogContent(newContent);

    if (newContent.trim() !== '') {
      setContentError('');
    }
  };
  
  const validateForm = () => {
    let formIsValid = true;

    // validate title and content
    if (title.trim() === '') {
      setTitleError('Title is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    if (blogContent.trim() === '') {
      setContentError('Blog content is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    // validate images
    if (!selectedImage1) {
      setImageError1('Image 1 is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    if (!selectedImage2) {
      setImageError2('Image 2 is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    if (!selectedImage3) {
      setImageError3('Image 3 is required.');
      setSuccessMessage('');
      formIsValid = false;
    }

    return formIsValid;
  };

  useEffect(function() {
    async function fetchUserInfo() {
        try {
            const response = await fetch(`http://localhost:8000/blogs/${blogId}`, {
            method: 'GET',
        });
        if (response.status === 403) {
            navigate('/');


            // setAllowAccess(false);
        } else if (response.status >= 200 && response.status < 300) {
            const data = await response.json();
            console.log("Mydata", data);

            setBlogInfo({...data})
           
            // set each value based on the data received
            setTitle(data.title || '');
            setBlogContent(data.content || '');

            const blob1 = await fetch(data.picture_1).then((r) => r.blob());
            const file1 = new File([blob1], extractFileName(data.picture_1), { type: "image/jpeg" });
            setSelectedImage1(file1);

            const blob2 = await fetch(data.picture_2).then((r) => r.blob());
            const file2 = new File([blob2], extractFileName(data.picture_2), { type: "image/jpeg" });
            setSelectedImage2(file2);

            const blob3 = await fetch(data.picture_3).then((r) => r.blob());
            const file3 = new File([blob3], extractFileName(data.picture_3), { type: "image/jpeg" });
            setSelectedImage3(file3);
           
            if (blogId) {
              setEditMode(true);
            }

            // setAllowAccess(true);
        }} catch (e) {
            console.log(e);
            navigate('/');
        }
    }
    fetchUserInfo();


}, [ blogId ])

  const createBlog = () => {  
    // append fields
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', blogContent);
    // init like count to 0
    formData.append('likes', 0);
    
    formData.append('picture_1', selectedImage1);
    formData.append('picture_2', selectedImage2);
    formData.append('picture_3', selectedImage3);
  
    // Make a POST request to your server with the FormData
    fetch(`http://localhost:8000/blogs/`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log('Upload successful:', data);
      })
      .catch(error => {
        console.error('Error creating blog:', error);
      });
  };

  const editBlog = () => {
    // append fields
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', blogContent);
    
    formData.append('picture_1', selectedImage1);
    formData.append('picture_2', selectedImage2);
    formData.append('picture_3', selectedImage3);
  
    // make a PUT request to update the blog
    fetch(`http://localhost:8000/blogs/${blogId}/`, {
      method: 'PUT', // TODO: put and patch is not allowed
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log('Edit successful:', data);
      })
      .catch(error => {
        console.error('Error editing blog:', error);
      });
  };

  // handle button click 
  const handleButtonClick = () => {
    // form needs to be valid before changes
    if (validateForm()) {
      if (editMode) {
        // edit the blog
        editBlog();
        setSuccessMessage('Blog edited successfully!');
      } else {
        // create a new blog
        createBlog();
        setSuccessMessage('Blog created successfully!');
      }
    }
  };

  return (
    <div className="wrapper">
      <LandingHeader />
      <main class="page-content">  
        <div>
          {editMode ? (
            <h3>Edit Shelter Blog</h3>
          ) : (
            <h3>Post a Blog for your Pet Shelter!</h3>
          )}
        </div>
            <div class="background-details">
                <div class="bg-white mt-4 p-4 rounded shadow">
                    <div class="container">
                      <div class="blog-details" style={{ overflow: 'hidden', wordWrap: 'break-word', maxWidth: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}>
                            <h4>1. Blog Content</h4>
                            <div style={{ minWidth: "100%" }}>
                              <div className="form-group">
                                <label
                                  htmlFor="blogTitle"
                                  className="form-label"
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Title
                                </label>
                                <input
                                  type="text"
                                  id="blogTitle"
                                  className={`form-control ${titleError ? 'is-invalid' : ''}`}
                                  value={title}
                                  onChange={handleTitleChange}
                                />
                                {titleError && (
                                  <div className="invalid-feedback">{titleError}</div>
                                )}
                              </div>
                              <div className="form-group">
                                <label htmlFor="blogContent" className="form-label" 
                                style={{ 
                                display: 'flex',
                                justifyContent: 'flex-start',
                                fontWeight: 'bold'}}>
                                  Body
                                </label>
                                <MDEditor height={200} value={blogContent} onChange={handleBlogContent} style={{width: "100%"}}/>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>    
                </div>
                <div class="bg-white mt-4 p-4 rounded shadow">
                  <div class="container">
                    <div class="blog-details">
                      <h4>2. Media</h4>
                        <h6>Include photos with different angles and environments</h6>
                        <div className="row">
                          <div className="col-4">
                            <label htmlFor="image1" className="image-label">
                              <input
                                type="file"
                                className="image-input"
                                id="image1"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange1}
                              />
                              <div className="image-container">
                                <img
                                  src={selectedImage1 ? URL.createObjectURL(selectedImage1) : noImage}
                                  alt="1"
                                  className="img-fluid image-preview"
                                />
                              </div>
                            </label>
                          </div>
                          <div className="col-4">
                            <label htmlFor="image2" className="image-label">
                              <input
                                type="file"
                                className="image-input"
                                id="image2"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange2}
                              />
                              <div className="image-container">
                                <img
                                  src={selectedImage2 ? URL.createObjectURL(selectedImage2) : noImage}
                                  alt="2"
                                  className="img-fluid image-preview"
                                />
                              </div>
                            </label>
                          </div>
                          <div className="col-4">
                            <label htmlFor="image3" className="image-label">
                              <input
                                type="file"
                                className="image-input"
                                id="image3"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange3}
                              />
                              <div className="image-container">
                                <img
                                  src={selectedImage3 ? URL.createObjectURL(selectedImage3) : noImage}
                                  alt="3"
                                  className="img-fluid image-preview"
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="confirm-button"> 
                    <button
                      className="btn btn-primary btn-lg btn-xl post-button"
                      onClick={()=>{handleButtonClick()}}
                    >
                      {editMode ? "Edit Blog" : "Post Blog"}
                    </button>

                    {contentError && (
                      <div className="alert alert-danger mt-4" role="alert">
                        {contentError}
                      </div>
                    )}

                    {imageError1 && (
                      <div className="alert alert-danger mt-4" role="alert">
                        {imageError1}
                      </div>
                    )}

                    {imageError2 && (
                      <div className="alert alert-danger mt-4" role="alert">
                        {imageError2}
                      </div>
                    )}

                    {imageError3 && (
                      <div className="alert alert-danger mt-4" role="alert">
                        {imageError3}
                      </div>
                    )}
                    {successMessage && (
                      <div className="alert alert-success mt-4" role="alert">
                        {successMessage}
                      </div>
                    )} 
                  <div>
                </div>
            </div> 
            <div class="d-flex pet-creation-graphic" id="post-pet">
              <div
                className="ms-5 p-2 my-auto"
                style={{
                  backgroundImage: "linear-gradient(rgb(0, 0, 0, 0.4), rgb(0, 0, 0, 0.4))",
                  width: "60%",
                }}
              >
                <h1 className="mb-2" style={{ color: "#87CEEB" }}>
                  Post your blog, create exposure for your shelter!
                </h1>
                <p className="text-light">
                By showcasing your blog on our platform, you can play a pivotal role in connecting 
                animals in search of loving homes with compassionate individuals seeking new companions. 
                Share your blog today and contribute to the heartwarming journey of matching pets with 
                caring owners, providing a brighter future for animals who may have faced challenges or 
                abandonment. Join us in fostering compassion and companionship through the exposure your 
                blog can bring to potential pet seekers.
                </p>
              </div>;
            </div>   
      </main>
      <Footer />
    </div>
  );
};

export default BlogCreationUpdate;

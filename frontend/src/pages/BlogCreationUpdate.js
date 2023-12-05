import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import image1 from "../assets/images/image1.jpg"
import image2 from "../assets/images/image2.jpg"
import image3 from "../assets/images/image3.jpg"
import noImage from '../assets/images/no_image_icon.png'; 
import '../styles/blog_creation_and_update.css'; 
import MDEditor, { selectWord } from "@uiw/react-md-editor";

const BlogCreationUpdate = () => {
  const [title, setTitle] = useState('');
  const [shelterName, setShelterName] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [uploadedImages, setUploadedImages] = useState([noImage, noImage, noImage]);
  const [editMode, setEditMode] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setBlogContent(event.target.value);
  };

  const handleImageSelect = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const newPreviews = [...uploadedImages];
        newPreviews[index] = e.target.result;
        setUploadedImages(newPreviews);
      };
      reader.readAsDataURL(file);
    } else {
      // reset to the default image
      const newPreviews = [...uploadedImages];
      newPreviews[index] = 'images/no_image_icon.png';
      setUploadedImages(newPreviews);
    }
  };

  // handle button click 
  const handleButtonClick = () => {
    if (editMode) {
      // edit a blog
      // navigate("edit_pets.html");
      return;
    } else {
      // create a new blog
      // createPet();
    }
  };


  return (
    <div className="wrapper">
      <LandingHeader />
      <main class="page-content">  
        <div>
          {editMode ? (
            <h3>Edit Shelter Blog: {shelterName}</h3>
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
                            <div style={{minWidth:"100%"}}>
                              <div className="form-group">
                                <label htmlFor="blogTitle" className="form-label"
                                style={{ 
                                display: 'flex',
                                justifyContent: 'flex-start',
                                fontWeight: 'bold'}}>
                                  Title
                                </label>
                                <input
                                  type="text"
                                  id="blogTitle"
                                  className="form-control"
                                  value={title}
                                  onChange={handleTitleChange}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="blogContent" className="form-label" 
                                style={{ 
                                display: 'flex',
                                justifyContent: 'flex-start',
                                fontWeight: 'bold'}}>
                                  Body
                                </label>
                                <MDEditor height={200} value={blogContent} onChange={setBlogContent} style={{width: "100%"}}/>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>    
                </div>
                <div className="bg-white mt-4 p-4 rounded shadow">
                  <div className="container">
                    <div className="blog-details" style={{ overflow: 'hidden', wordWrap: 'break-word', maxWidth: '100%', display: 'flex', justifyContent: 'flex-start'}}>
                      <h4>2. Content Preview</h4>
                      <h1>{title}</h1>
                        <div 
                          style={{ 
                            overflow: 'hidden', wordBreak: 'break-word', maxWidth: '100%', display: 'flex', justifyContent: 'flex-start', textAlign: 'left', flexWrap: 'wrap'
                          }}
                        >
                          <ReactMarkdown >{blogContent}</ReactMarkdown>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="bg-white mt-4 p-4 rounded shadow">
                  <div class="container">
                    <div class="blog-details" style={{ overflow: 'hidden', wordWrap: 'break-word', maxWidth: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}>
                      <h4>3. Thumbnails</h4>
                        <h6>Include photos with different angles and environments</h6>
                        <div className="row">
                          {[1, 2, 3].map((index) => (
                            <div className="col-4" key={index}>
                              <label htmlFor={`image${index}`} className="image-label">
                                <input
                                  type="file"
                                  className="image-input"
                                  id={`image${index}`}
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={(e) => handleImageSelect(index - 1, e.target.files[0])}
                                />
                                <img
                                  src={uploadedImages[index - 1]}
                                  alt={`${index}`}
                                  className="img-fluid image-preview"
                                />
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                    <div class="confirm-button"> 
                      <a
                        className="btn btn-primary btn-lg btn-xl post-button"
                        href={editMode ? "edit_pets.html" : "my_pets.html"}
                        role="button"
                        onClick={handleButtonClick}
                      >
                        {editMode ? "Edit Blog" : "Post Blog"}
                      </a>   
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

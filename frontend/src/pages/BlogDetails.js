/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import '../styles/details_and_adoption.css';
import image1 from "../assets/images/image1.jpg"
import image2 from "../assets/images/image2.jpg"
import image3 from "../assets/images/image3.jpg"
import noImage from "../assets/images/image-not-found-scaled.png"
import ShelterCard from '../components/ShelterCard';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import BlogImagesCarousel from '../components/BlogImagesCarousel';


const BlogDetails = () => {
  const navigate = useNavigate();
  const {blogId} = useParams();
  const [blogInfo, setBlogInfo] = useState(null);
  const [title, setTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  // const [selectedImage1, setSelectedImage1] = useState(null);
  // const [selectedImage2, setSelectedImage2] = useState(null);
  // const [selectedImage3, setSelectedImage3] = useState(null);
  
  // get the blog
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
            setBlogInfo({...data})
            console.log("blogInfo", {...data})

            setTitle(data.title);
            setBlogContent(data.content);

            // setAllowAccess(true);
        }} catch (e) {
            console.log(e);
            navigate('/');
        }
    }
    fetchUserInfo();

  }, [ blogId ])

  return (
    <div className="wrapper">
      <LandingHeader />
      <main class="page-content">
      {blogInfo && <BlogImagesCarousel blog={blogInfo} />}
      <div class="background-details">
          <div class="container" id="pet-details-container">
              <div class="pet-details">
                  <h1>{title}</h1>
                  <div class="d-flex pet_details_and_shelter">
                      <div class="col-lg-6" style={{"marginRight": "20px"}}>
                        {blogContent}
                      </div>
                  </div>
                  <Link to={`/blogs/`} role="button">
                    <button class="btn btn-primary btn-lg apply-button" >Blogs</button>
                  </Link>
                  </div>
                </div>
            </div>
        </main>
      <Footer />
    </div>
  );
};

export default BlogDetails;
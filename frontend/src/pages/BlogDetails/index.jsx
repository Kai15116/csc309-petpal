/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import LandingHeader from '../../components/LandingHeader';
import Footer from '../../components/Footer';
import './style.css';
import image1 from "../../assets/images/image1.jpg"
import image2 from "../../assets/images/image2.jpg"
import image3 from "../../assets/images/image3.jpg"
import noImage from "../../assets/images/image-not-found-scaled.png"
import ShelterCard from '../../components/ShelterCard/index';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import BlogImagesCarousel from '../../components/BlogImagesCarousel';
import Markdown from 'react-markdown';


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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/blogs/${blogId}`, {
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
      <main>
      {blogInfo && <BlogImagesCarousel blog={blogInfo} />}
      <div class="background-details">
          <div class="container" id="pet-details-container">
                <div className="pet-details">
                  <h1>{title}</h1>
                  <div style={{textAlign: "left !important"}}>
                      <Markdown>{blogContent}</Markdown>
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

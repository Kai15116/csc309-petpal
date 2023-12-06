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

const BlogImagesCarousel = ({ blog }) => {
    const [imageUrls, setImageUrls] = useState([noImage, noImage, noImage]);

    const extractFileName = (url) => {
        if (!url)
            return noImage
        const parts = url.split('/');
        return parts[parts.length - 1];
      };

    async function fetchAndReturnFile(data) {
        const blob = await fetch(data).then((response) => response.blob());
        const fileName = extractFileName(data);
        return new File([blob], fileName, { type: "image/jpeg" });
      }
  
    useEffect(() => {
      const fetchImages = async () => {
        const urls = await Promise.all([
          fetchAndReturnFile(blog.picture_1),
          fetchAndReturnFile(blog.picture_2),
          fetchAndReturnFile(blog.picture_3)
        ]);
  
        const sanitizedUrls = urls.map(url => (url ? URL.createObjectURL(url) : noImage));
  
        setImageUrls(sanitizedUrls);
      };
  
      fetchImages();
    }, [blog]);
  
    return (
      <Carousel id="kcarousel" style={{ height: "40vh" }}>
        <Carousel.Item id="kcarousel" >
          <img src={imageUrls[0]} alt="1" className="d-block" />
        </Carousel.Item>
        <Carousel.Item id="kcarousel" >
          <img src={imageUrls[1]} alt="2" className="d-block" />
        </Carousel.Item>
        <Carousel.Item id="kcarousel" >
          <img src={imageUrls[2]} alt="3" className="d-block" />
        </Carousel.Item>
      </Carousel>
    );
  };
  
  export default BlogImagesCarousel;
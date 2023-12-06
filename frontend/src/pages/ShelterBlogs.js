import React, {useState, useEffect, useContext, useMemo} from 'react';
import { Carousel, Pagination } from 'react-bootstrap';
import {Link, useSearchParams} from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import noImage from "../assets/images/image-not-found-scaled.png"
import '../styles/blog_shelters.css'; 
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import BlogImagesCarousel from '../components/BlogImagesCarousel';
import CPagination from "../components/CPagination";


function to_url_params(object) {
    var result = [];
    for (const key in object) {
        if (Array.isArray(object[key])) {
            for (const value of object[key]) {
                result.push(`${key}[]=${value}`);
            }
        }
        else {
            let value = object[key];
            if (value !== "") {
            result.push(`${key}=${value}`);
            }
        }
    }
    return result.join('&');
}


const ShelterBlogs = () => {
  const {getContextUser} = useContext(userContext);
  const user = getContextUser()
  const navigate = useNavigate();
  const {accessToken} = getContextUser();

  const [allBlogs, setAllBlogs] = useState([{}]);

  const blogsPerPage = 2; // Number of shelters to display per page

  const [ searchParams, setSearchParams ] = useSearchParams();
  const query = useMemo(() => ({
      page : parseInt(searchParams.get("page") ?? 1),
      size: parseInt(searchParams.get("size") ?? blogsPerPage),
      order_by : searchParams.get("order_by") ?? "likes",
      owner : searchParams.get("owner") ?? "",
      title : searchParams.get("title") ?? "",
  }), [searchParams]);
  const pagesCount = Math.ceil(allBlogs?.count / query?.size);
  const noResult = allBlogs?.count === 0 || isNaN(pagesCount);
  const [shelters, setShelters] = useState([]);

  async function fetchBlogs() {
      const urlParams = to_url_params(query);
      try {
          const response = await fetch(`http://localhost:8000/blogs?${urlParams}`, {
          method: 'GET',
      });
      if (response.status === 403) {
          navigate('/');


          // setAllowAccess(false);
      } else if (response.status >= 200 && response.status < 300) {
          const data = await response.json();
          setAllBlogs({...data})
          console.log("allBlogs", data)

      }} catch (e) {
          console.log(e);
          navigate('/');
      }
  }
  useEffect(() => {
    async function fetchShelters() {
        try {
            const response = await fetch(`http://localhost:8000/accounts/shelter`);

            if (response.status >= 200 && response.status < 302) {
                const data = await response.json();
                setShelters([...data])
                console.log(data)
            } else if (response.status === 404) {
                alert(404);
            }
            else {
                console.log(response.status)
            }
        } catch (e) {
                console.log(e);
                navigate('/');
            }
    }
    fetchShelters();
  }, []);

  // get all blogs
  useEffect(function() {
    fetchBlogs();

  }, [query])

  const handlePageChange = (page) => {
    setSearchParams({...query, page: page});
  };

  const LikeButton = ({ likes, onLikeClick }) => (
    <button className="btn btn-outline-primary" onClick={onLikeClick}>
      Like: {likes}
    </button>
  );

  // increment like count of blog at index shelterIndex
  const handleLikeClick = async (blog, blogIdx) => {
    const formData = new FormData();
    formData.append('likes', blog.likes + 1);
    // make a PUT request to update the blog
    fetch(`http://localhost:8000/blogs/${blog.id}/`, {
      method: 'PATCH',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then(response => response.json())
      .then(data => {
        // create a copy of the allBlogs array
        const updatedBlogs = [...allBlogs?.results];

        // update the likes in the copy
        updatedBlogs[blogIdx].likes += 1
        setAllBlogs({...allBlogs, results: updatedBlogs})
      })
      .catch(error => {
        console.error('Error editing pet:', error);
      });
  };

  const handleAddClick = () => {
    if (user.contextUserType === "shelter") {
      navigate(`/blogCreateUpdate`)
    }
  };

  const handleEditClick = (blog) => {
    if (user.contextUserId === blog.owner) {
      navigate(`/blogCreateUpdate/${blog.id}`)
    }
  };

  const handleOwnerChange = (event) => {
    setSearchParams({...query, owner: event.target.value})
  };

  const handleFilterChange = (event) => {
    setSearchParams({...query, order_by: event.target.value})
  };

  return (
    <div style={{ backgroundColor: '#f2f8fe'}}>
      <LandingHeader />
      <div className="d-flex" style={{minHeight: "calc(100vh - 9rem)"}}>
        {/* left-hand sidebar */}
        <div className="bg-white mt-4 p-4 ms-3 rounded shadow" style={{ height: 'fit-content' }}>
          <h4>Search By Blog Title:</h4>
          <div className="input-group"
            style={{padding: "10px"}}
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search here..."
              aria-label="Search"
              aria-describedby="search-btn"
              required
              value={query?.title}
              onChange={(e) => setSearchParams({...query, title: e.target.value})}
            />
            <button className="btn btn-outline-success" type="submit" id="search-btn">
              Search
            </button>
          </div>

          <div className="mb-3">
            <h4>Sort by:</h4>
            <div className="input-group" style={{padding: "10px"}}>
              <select className="form-select" onChange={handleFilterChange} value={query?.likes}>
                <option value="-likes">Likes: Most liked</option>
                <option value="-last_modified">Last Edited: Newest first</option>
                <option value="likes">Likes: Least liked</option>
                <option value="last_modified">Last Edited: Oldest first</option>
              </select>
            </div>

            <h4>Filter by Owner:</h4>
            <div className="input-group" style={{padding: "10px"}}>
              <select className="form-select" onChange={handleOwnerChange} value={query?.owner}>
                <option value="">Select All</option>
                {user?.contextUserType === "shelter" &&
                    <option key={user.contextUserId} value={user.contextUserId}>My blogs</option>
                }
                {shelters?.map((shelter, index) => (
                  <option key={shelter.id} value={shelter.id}>{shelter.username}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <h4>Page:</h4>
            <Pagination>
              {Array.from({ length: Math.ceil(allBlogs?.count / blogsPerPage) }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={query?.page === index + 1}
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
            {/* disable for non shelter users */}
            <button
              className="btn btn-secondary ms-auto align-self-end"
              onClick={() => handleAddClick()}
              disabled={user.contextUserType !== "shelter"}
            >
              Add New Blog
            </button>
          </div>
          <hr />
          {allBlogs?.results?.map((blog, index) => (
            <div key={index} className="blog-card bg-white p-4 rounded shadow mb-4">
              <div className="blog-card d-flex align-items-center">
                <div>
                  <h2 className="me-3">{blog.title}</h2>
                  <h5 className="me-3">Owner: {blog.owner}</h5>
                </div>
                <div className="ms-auto">
                  <Link to={`/blogDetails/${blog.id}`}>
                    <div className="confirm-button">
                      <button className="btn btn-primary btn-lg btn-xl post-button">
                        Show More
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
              <div>
                {/* image carousel component */}
                <BlogImagesCarousel blog={blog} />

                <div className="d-flex align-items-center">
                  <div 
                    className="like-button-container"
                    style={{padding: "20px"}}
                  >
                    <LikeButton likes={blog.likes} onLikeClick={() => handleLikeClick(blog, index)} />
                  </div>
                  <div 
                    className="ms-auto"
                    style={{padding: "20px"}}
                  >
                    {/* users who are not owner of tweet can't edit it */}
                    <button
                      className="btn btn-secondary ms-auto align-self-end"
                      onClick={() => handleEditClick(blog)}
                      disabled={user.userContextId !== blog.ownerId}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {noResult && <h3 className="text-secondary">No results found...</h3>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShelterBlogs;
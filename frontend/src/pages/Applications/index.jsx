import React, {useContext, useEffect, useMemo, useState} from 'react';
import LandingHeader from "../../components/LandingHeader";
import Footer from "../../components/Footer";
import {userContext} from "../../context/userContext";
import ShelterCard from "../../components/ShelterCard/index";
import {useNavigate, useSearchParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import CPagination from "../../components/CPagination";
import "./style.css"

// Reference Lecture example: URL parser.
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
            // }
        }
    }
    return result.join('&');
}

const Applications = () => {
    const { getContextUser, setContextUser} = useContext(userContext);
    const user = getContextUser()

    const [myApplications, setMyApplications] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [ searchParams, setSearchParams ] = useSearchParams();
    const query = useMemo(() => ({
        page : parseInt(searchParams.get("page") ?? 1),
        size: parseInt(searchParams.get("size") ?? 8),
        order_by : searchParams.get("order_by") ?? "created_at",
        status : searchParams.get("status") ?? "",
    }), [searchParams]);
    const pagesCount = Math.ceil(myApplications?.count / query?.size);
    const noResult = myApplications?.count === 0 || isNaN(pagesCount);

    // used for pagination state management
    const setcurrentActivePage = (value) => {
        setSearchParams({...query, page : value})
    }

    useEffect(function () {
        async function fetchApplications() {
            const urlParams = to_url_params(query);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/applications?${urlParams}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                    }
                });

                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    console.log(data)
                    setMyApplications({...data})
                } else {
                    navigate("/")
                }
            } catch (e) {
                navigate("/")
            }
        }

        async function fetchUserInfo() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/shelter/${user?.contextUserId}`, {
                    method: 'GET'
                }
            );
            if (response.status >= 400) {
                navigate('/');
            } else if (response.status >= 200 && response.status < 300) {
                const data = await response.json();
                setUserInfo({...data})
                console.log(data)
            }} catch (e) {
                console.log(e)
                navigate('/');
            }
        }
        if (user.contextUserType === "shelter")
            fetchUserInfo();
        fetchApplications();
    }, [query]);

    return (
        <div className="bg-body-tertiary my-0 ">
        <LandingHeader/>
        <div className="container-fluid d-flex flex-column justify-content-center py-5" >
        <div className="d-flex mx-auto" id="my-pets-main-container">
          {user.contextUserType === "shelter" &&
          <div className="d-flex flex-column justify-content-center" id="profile-container">
            <ShelterCard name={userInfo?.username} profileLink={`shelterprofile/${user?.contextUserId}`} stars={userInfo?.avg_rating}
                         reviewCount={userInfo?.review_count}
                         joinDate={new Date(Date.parse(userInfo?.created_at))}
                         profilePicUrl={userInfo?.profile_picture} bannerPicUrl={userInfo?.banner}>
            </ShelterCard>
            <ul className="list-group flex-column mt-5" style={{width: "100%"}}>
              <li className="list-group-item">
                <a className="nav-link" href="/mypets">My Pets</a>
              </li>
              <li className="list-group-item active">
                <a className="nav-link" href="/applications">Applications</a>
              </li>
            </ul>
          </div>
          }

          <div className="d-flex flex-column" id="lst-container" style={{minWidth: "40vw"}}>
            <div className="d-flex">
              <h1 className="ms-1 mb-0">Applications</h1>
                <Form.Select className="ms-auto mt-auto" style={{width: "fit-content"}}
                 onChange={(e) => setSearchParams({...query, status: e.target.value, page: 1})}
                defaultValue={query["status"]}>
                  <option value="">Filter by: All</option>
                  <option value="pending">Filter by: Pending</option>
                  <option value="accepted">Filter by: Accepted</option>
                  <option value="denied">Filter by: Denied</option>
                  <option value="withdrawn">Filter by: Withdrawn</option>
                </Form.Select>
                <Form.Select className="ms-1 mt-auto" style={{width: "fit-content"}}
                onChange={(e) => setSearchParams({...query, order_by: e.target.value, page: 1})}
                defaultValue={query["order_by"]}>
                  <option value="created_at">Order by: Creation&#8593;</option>
                  <option value="last_updated">Order by: Update&#8593;</option>
                  <option value="-created_at">Order by: Creation&#8595;</option>
                  <option value="-last_updated">Order by: Update&#8595;</option>
                </Form.Select>
            </div>
            <hr></hr>
            <ul className="list-group mb-4">
                {myApplications?.results?.map((application, index) => <>
                    <li className="list-group-item" key={index}>
                        <b>{application?.petname}</b>
                        <div className="d-flex">
                            <div className="text-muted">From: {application.name}</div>
                            <div className="px-2"></div>
                            <div className="text-muted ms-auto">{new Date(Date.parse(application.created_at)).toLocaleDateString("en-US", dateOptions)}</div>
                            <a className="stretched-link" href={`/application/${application.id}`}></a>
                        </div>
                    </li>
                </>)}
            </ul>
            {!noResult && <CPagination setcurrentActivePage={setcurrentActivePage} currentActivePage={query?.page} pagesCount={pagesCount}/>}
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    );
};

export default Applications;
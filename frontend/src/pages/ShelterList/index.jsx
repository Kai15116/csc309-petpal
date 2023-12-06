import ShelterCard from "./ShelterCards";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LandingHeader from "../../components/LandingHeader";
import Footer from "../../components/Footer";
import bgSignup from '../../assets/example_images/yosemite_banner.jpg';
import CPagination from "../../components/CPagination";
import { to_url_params } from "../../utils";
// const users = [1, 2, 3, 4, 5, 6, 7]
function ShelterList() {
    const [shelterListInfo, setShelterListInfo] = useState(null);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = useMemo(() => ({
        page : parseInt(searchParams.get("page") ?? 1),
        size: parseInt(searchParams.get("size") ?? 10),
    }), [searchParams]);

    const setcurrentActivePage = (value) => {
        setSearchParams({...query, page : value})
    }


    useEffect(function () {
        const urlParams = to_url_params(query);
        async function fetchShelters() {
            try { 
                const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/shelter?${urlParams}`);
            
                if (response.status >= 200 && response.status < 302) {
                    const data = await response.json();
                    setShelterListInfo({...data})
                    console.log(data)
                    
                    // console.log(shelterList)
                
                } else if (response.status = 404) {
                    alert(404);
                }
                else {
                    console.log(response.status)

                }} catch (e) {
                    console.log(e);
                    navigate('/');
                }
        }
        fetchShelters();

    }, [query]);

    const pagesCount = Math.ceil(shelterListInfo?.count / query?.size);
    const noResult =shelterListInfo?.count === 0 || isNaN(pagesCount);
    
    return (
        <div style={{background: `#F5F5F5`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition:"top"}}>
            <LandingHeader />
            <div style={{marginBottom: "1rem", minHeight: "100vh"}}>
                {/* Generated by https://cssgradient.io */}
            <div style={{background: `url(${bgSignup})`, height: "29vh", width: "100vw", backgroundSize: "contain", backgroundPosition: "bottom"}}>
                <h1 style={{color:"white", paddingLeft:"2rem", paddingTop: "4rem", fontSize: "47px", textShadow: "1px 1px 2px black"}}>Find Pet Shelters</h1>
            </div>
            <div className="border border-3 mt-3" 
                style={{display: "flex", justifyContent: "center", gap: "0rem", flexWrap: "wrap", width: "95%", margin: "0 auto"}}>
                {shelterListInfo?.results?.map((shelter, id) => <ShelterCard key={id} shelter={{...shelter}}></ShelterCard>)}
            </div>

            </div>

            {!noResult && <CPagination setcurrentActivePage={setcurrentActivePage} currentActivePage={query?.page} pagesCount={pagesCount}/>}
            <Footer/>
      </div>
    )
}

export default ShelterList;
import React, { useEffect, useState ,useContext} from "react";
import img from "../../../assets/images/pageuserImg.jpg";
import "../../../styles/pages/User/Home.css";
import axios from 'axios';
import { GlobalContext } from "../MainPageUser/User";
import Account from "./Account";
function Home({OfferDB,OrganizationDB}) {
  
const {content,setContent}=useContext(GlobalContext)
  const [Offer, SetOffer] = useState([]);
  const [Organizations, SetOrganizations] = useState([]);
  const  fetchData = async ()=>{
    const res = await axios.get(`http://127.0.0.1:8080/Admin/veiw/${OfferDB}`)
    SetOffer ( res.data )
    const resOrganizations =await axios.get(`http://127.0.0.1:8080/Admin/veiw/${OrganizationDB}`)
    SetOrganizations(resOrganizations.data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <div id="top">
          <div id="complete">
            Complete your profile for better results <span onClick={()=>setContent(<Account/>)}>Complete</span>
          </div>
        </div>
          <h1>The last 3 offers</h1>
          <div id="mainOffer">
          {Offer.slice(-3).map((e) => (
            <div key={e._id} id="offer">
              <img src={e.url} alt={e.title} />
              <div>{e.title}</div>
              <div>{e.description}</div>
            </div>
          ))}
          </div>
          <div>
          <h1>Organizations Focused on Disability Support</h1>
              <div id="show" >
          {Organizations.slice(-2).map((e,i) => (
          
        <div key={e._id} id="Organizations">
        {i=="0"?(
          <>
          <div id="backImg">
            
          <img src={e.url} alt={e.title} />
          </div>
        <div>
          <h1>{i}</h1>
            <h3>{e.Name}</h3>
          <h4>{e.title}</h4>
          <div>{e.description}</div>
          </div>
          </>
        ):(
        <>
          <div>
          <h1>{i}</h1>
          <h3>{e.Name}</h3>
          <h4>{e.title}</h4>
          <div>{e.description}</div>
          </div>
          <div id="backImg">
          <img src={e.url} alt={e.title} />
            </div>
        </>
         ) }
         </div>
              ))}
          
          </div>


        </div>
      </div>
  );
}

export default Home;

import React, { useEffect, useState,createContext } from "react";
import Nav from '../../../components/Navbar/Navbar';
import Home from "../PagesUser/Home";
import Footer from '../../../components/Footer/Footer';
export const GlobalContext = createContext();

function User(props) {
    const [Content, setContent] = useState("");
    const [type_Disability,setType_Disability]=useState("")
  const [id, setId] = useState(props.id_user);

  useEffect(() => {
    setContent(<Home OfferDB="Offer" OrganizationDB="Organizations" />);
  },[]);

  return (
    <GlobalContext.Provider  value={{Content,setContent,id,setId,type_Disability,setType_Disability}}>
      <Nav  />
      <div id="User">
        {Content}
      </div>
      <Footer />
    </GlobalContext.Provider>
  );
}

export default User;

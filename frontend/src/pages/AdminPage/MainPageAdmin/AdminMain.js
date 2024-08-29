import React, { useEffect, useState } from "react";
import img from '../../../assets/images/Logo.png';
import "../../../styles/pages/Admin/Admin.css";
import { useLocation } from 'react-router-dom';
import Edu from "../PagesAdmin/Edu.js"
import Prosthetics from "../PagesAdmin/Prosthetics.js";
import Suggestions from "../PagesAdmin/Suggestions.js";
import Organizations from "../PagesAdmin/Organizations.js";
import Offer from "../PagesAdmin/Offer.js";

function Admin(props) {
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [pageElements, setPageElements] = useState([]);

  useEffect(() => {
    const div = document.getElementById('leftAdmin');
    const divs = div.getElementsByTagName('div');
    setPageElements(Array.from(divs));
    if (location.pathname === "/Auth") {
      setContent (< Edu database={"Edu"}/> )
    }
  }, [location.pathname]);

  const ChangeContent = (type) => {
    const defaultBackground = ' #0f5d61';
    const activeBackground = '#349ba0';
    switch (type) {
      case 'Edu':
        setContent(<Edu  database={"Edu"} />);
        break;
      case 'Offer':
        setContent(<Offer database={"Offer"} />);
        break;
      case 'Prosthetics':
        setContent(<Prosthetics   database={"Prosthetics"} />);
        break;
      case 'Suggestions':
        setContent(<Suggestions database={"Suggestions"}/>);
        break;
      case 'Organizations':
        setContent(<Organizations database={"Organizations"}/>);
        break;
      default:
        setContent(null);
    }
    pageElements.forEach((element) => {
      element.style.background = type === element.textContent ? activeBackground : defaultBackground;
    });
  };
  

  return (
    <div>
      <div id="mainAdmin">
        <div id="leftAdmin">
      <img src={img} alt="logo" id="imglogo" />
          <div onClick={() => ChangeContent('Edu')}>Edu</div>
          <div onClick={() => ChangeContent('Offer')}>Offer</div>
          <div onClick={() => ChangeContent('Prosthetics')}>Prosthetics</div>
          <div onClick={() => ChangeContent('Organizations')}>Organizations</div>
          <div onClick={() => ChangeContent('Suggestions')}>Suggestions</div>
        </div>
        <div id="content">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Admin;

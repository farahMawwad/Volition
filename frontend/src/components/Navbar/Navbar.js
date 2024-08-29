import React from 'react';
import { useContext } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import '../../styles/components/Nav.css';
import img from '../../assets/images/Logo.png';
import { GlobalContext } from '../../pages/UserPage/MainPageUser/User';
import Home from '../../pages/UserPage/PagesUser/Home';
import Contact from '../../pages/UserPage/PagesUser/Contact';
import Services from '../../pages/UserPage/PagesUser/Services';
import Account from '../../pages/UserPage/PagesUser/Account';
function Nav({Page}) {
  const {setContent}=useContext(GlobalContext)||""
  const location = useLocation();
  const navigate = useNavigate();
  const onClick =(data)=>{
switch (data) {
      case 'Home' :
        case "":
        setContent(<Home OfferDB="Offer" OrganizationDB="Organizations" />);
        break;
      case 'Services':
        setContent(<Services  />);
        break;
      case 'Contact':
        setContent(<Contact database="Contact" />);
        break;
      case 'Account':
        setContent(<Account database="Account
          " />);
        break;
      default:
        setContent(null);
    }
  }
  const isLandingPage = location.pathname === '/';

  const links = isLandingPage ? [
    <div  onClick={()=>navigate('/signin')}>Sign In</div>,
    <div  onClick={()=>navigate('/signup')}>Sign Up</div>
  ] : [

    <div onClick={()=>onClick("Home")} key={1}>Home</div>,
    <div onClick={()=>onClick("Contact")} key={2} >Contact Us</div>,
    <div onClick={()=>onClick("Services")} key={3}>Services</div>,
    <div onClick={()=>onClick("Account")} key={4}>Account</div>
  ];

  return (
    <div id='contaner'>
      <img id='logo' src={img} alt='logo'/>
      <div id='navigate' className={isLandingPage && links.length === 2 ? 'two-links' : ''}>
        {links }
      </div>
    </div>
  );
}

export default Nav;

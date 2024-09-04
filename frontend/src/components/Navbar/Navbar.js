import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/components/Nav.css';
import img from '../../assets/images/Logo.png';
import { GlobalContext } from '../../pages/UserPage/MainPageUser/User';
import Home from '../../pages/UserPage/PagesUser/Home';
import Contact from '../../pages/UserPage/PagesUser/Contact';
import Services from '../../pages/UserPage/PagesUser/Services';
import Account from '../../pages/UserPage/PagesUser/Account';
import Cart from '../../pages/UserPage/PagesUser/Cart';

function Nav({ Page }) {
  const { setContent, id,setCountCart,countCart} = useContext(GlobalContext) || {}; 
  const location = useLocation();
  const navigate = useNavigate();

  const fetchcart = async () => {
    try {
      if (id) {
        const resInfoUser = await axios.get(`http://127.0.0.1:8080/Client/info/${id}`);
        const dataUser = resInfoUser.data.cart;
        setCountCart(dataUser.length);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchcart();
  },[]); 

  const onClick = (data) => {
    switch (data) {
      case 'Home':
      case '':
        setContent(<Home OfferDB="Offer" OrganizationDB="Organizations" />);
        break;
      case 'Services':
        setContent(<Services />);
        break;
      case 'Contact':
        setContent(<Contact database="Contact" />);
        break;
      case 'Account':
        setContent(<Account database="Account" />);
        break;
      case 'Cart':
        setContent(<Cart database="Cart" />);
        break;
      default:
        setContent(null);
    }
  };

  const isLandingPage = location.pathname === '/';

  const links = isLandingPage ? [
    <div key={1} onClick={() => navigate('/signin')}>Sign In</div>,
    <div key={2} onClick={() => navigate('/signup')}>Sign Up</div>
  ] : [
    <div onClick={() => onClick("Home")} key={1}>Home</div>,
    <div onClick={() => onClick("Contact")} key={2}>Contact Us</div>,
    <div onClick={() => onClick("Services")} key={3}>Services</div>,
    <div onClick={() => onClick("Account")} key={4}>Account</div>,
    <div onClick={() => onClick("Cart")} key={5}>
      <div id="cartdiv">
        <i className="fi fi-rr-cart-minus" id="cart" style={{ fontSize: '30px' }}></i>
        <span id="n_cart" style={{backgroundColor :countCart==0?"":" #f12626 "}}>{countCart || 0}</span> 
      </div>
    </div>
  ];

  return (
    <div id='contaner'>
      <img id='logo' src={img} alt='logo' />
      <div id='navigate' className={isLandingPage && links.length === 2 ? 'two-links' : ''}>
        {links}
      </div>
    </div>
  );
}

export default Nav;

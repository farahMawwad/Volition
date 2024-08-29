import React from 'react';
import '../../styles/components/Footer.css';
import img from '../../assets/images/Logo.png';

function Footer() {

  return (
    <footer id='footer'>
    
    <div>
      <img src={img} alt='edu'  id='main_img'  width={190} height={70}></img>
    </div>
    <div id='social'>
      <div>
        <div><i className="fi fi-rr-paper-plane"></i>volition.2002</div>
        <div><i className="fi fi-rr-camera"></i>volition.jo</div>
      </div>
      <div>
        <div><i className="fi fi-rr-phone-call"></i>
        0771548452</div>
        <div><i className="fi fi-rr-envelope"></i>
        volition.gmail.com</div>
      </div>

    </div>
  </footer>
  );
}

export default Footer;

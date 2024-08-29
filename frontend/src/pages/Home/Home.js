import React from 'react';
import Nav from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer';
import '../../styles/pages/Home.css'
import landing_img from '../../assets/images/landing_img.png'
import Sensory   from '../../assets/images/Sensory.jpg'
import Physical from '../../assets/images/Physical.jpg'
import Mental from '../../assets/images/Mental.jpg'
import prosthetics from '../../assets/images/prosthetics.jpg'
import organizations from '../../assets/images/organizations.jpg'
import educational from '../../assets/images/educational.jpg'
import aboutUs from '../../assets/images/about_us.jpg'

function Home() {
  return (
<div id='main'> 
<Nav /> 
<div id='lineOne'>
  <div id='text_lineOne'>
  <h2>Empowering All Abilities</h2>
  <div>People with disabilities encounter unique challenges and <br/>
    deserve equal opportunities and support. Our mission is<br/>
     to promote inclusivity and accessibility in all aspects of life,<br/>
     ensuring everyone can participate fully and equally</div>
  </div>
<div id='imgHome'>
<div id='back_img'>
</div>
  <img src={landing_img} alt='edu'  id='main_img'  width={267} height={154}></img>
</div>
  </div>
<div id='lineTwo'>
  <div><h1>Targeted categories Disabilities</h1></div>
  <div id='categories'>
    <div>
  <img src={Mental} alt='edu'    width={230} height={110}></img>
      <h4>Mental</h4></div>
    <div>
  <img src={Physical} alt='edu'    width={230} height={110}></img>
      <h4>Physical</h4>
    </div>
    <div>
  <img src={Sensory} alt='edu'   width={230} height={110}></img>
      <h4>Sensory  </h4>
      </div>
  </div>
</div>
<div id='lineThree'>
  <div id='services'>
    <h1>Services</h1><br/>
    <div>We offer educational videos</div><br/>
    <div>store specializing in prosthetics</div><br/>
    <div>provide names of organizations concerned with individuals with disabilities</div>
  </div>
  <div id='img_services'>
  <div id='one'><img src={prosthetics} alt='edu'    width={230} height={110}></img></div>
  <div id='two'><img src={organizations} alt='edu'    width={230} height={110}></img></div>
  <div id='three'><img src={educational} alt='edu'    width={230} height={110}></img></div>
  </div>

    </div>

    <div id='lineFour'>
      <h1>About us</h1>
      <div>
<div>
We’re software engineering graduates committed to <br/>
supporting individuals with disabilities. <br/>
We offer educational videos, a prosthetics store,<br/>
 and info on support organizations. <br/>
Our goal is to use technology to enhance <br/>
lives and promote inclusivity.
</div>
<div id='imgHome'>
<div id='back_img'>

</div>
  <img src={aboutUs} alt='edu'  id='main_img'  width={267} height={154}></img>
</div>
      </div>
    </div>


    <Footer /> 
  </div>



  );
}

export default Home;
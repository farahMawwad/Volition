import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import signup from '../../assets/images/signup.jpeg';
import logo from '../../assets/images/Logo.png';
import { useEffect } from 'react';
import '../../styles/pages/SignIn.css';
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [stat, setStat] = useState({
    pass: { isRight: true, label: "" },
    email: { isRight: true, label: "" },
    pass_email: { isRight: true, label: "" },
  });
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/signin') {
      ButtonSign('In');
    } else if (location.pathname === '/signup') {
      ButtonSign('Up');
    }
  }, []);

  const ButtonSign = async (type) => {
    const Signin = document.getElementById('signin_btn');
    const SignUp = document.getElementById('signup_btn');

    if (type === 'In' ) {
      SignUp.style.background = '#B1D6D9';
      Signin.style.background = 'transparent';
      navigate("/signin");
    } else if(type === 'Up') {
      Signin.style.background = '#B1D6D9';
      SignUp.style.background = 'transparent';
      navigate("/signup");
    }
  };
 

  const Buttonlogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:8080/user/login`, { email, pass });
      const data = response.data;

      if (typeof data === "object") {
        localStorage.setItem('token', data.token);
        if (data.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        }
        navigate("/Auth");
      } else {
        handleErrorMessage(data);
      }
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const handleErrorMessage = (message) => {
    const newStat = {
      pass_email: { isRight: true, label: "" },
      pass: { isRight: true, label: "" },
      email: { isRight: true, label: "" },
    };

    switch (message) {
      case "All fields must be filled":
        newStat.email = { isRight: false, label: "The field must be filled" };
        newStat.pass = { isRight: false, label: "The field must be filled" };
        break;
      case "Incorrect email":
        newStat.pass_email = { isRight: false, label: "Incorrect password or email" };
        break;
      case "Incorrect password":
        newStat.pass_email = { isRight: false, label: "Incorrect password or email" };
        break;
      default:
        newStat.email = { isRight: false, label: "An unexpected error occurred" };
        break;
    }

    setStat(newStat);
  };

  return (
    <div id='body_sign'>
  <img src={logo} alt='logo' />
    <div id='container_sign'>

      <form onSubmit={Buttonlogin} id="left">
        <h3>Welcome back</h3>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <label htmlFor="email" >
          {stat.email.label}
        </label>
        <input
          type="password"
          id="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Enter Password"
        />
        <label htmlFor="password" >
          {stat.pass.label}
        </label>
        <div>{stat.pass_email.label}</div>
        <div onClick={Buttonlogin} id="btn_sub">Sign In</div>
      </form>
     <div id='right'>
      <div>
        <img src={signup} alt='signup img' />
        </div>
      <div id='signin_btn'>
        <div id='btn' onClick={() => ButtonSign('Up')}> SIGN UP</div>
      </div>
      <div id='signup_btn'>
        <div id='btn' onClick={() => ButtonSign('In')}> SIGN IN</div>
      </div>
    </div>
    </div>
          </div>
  );
}
export default SignIn;
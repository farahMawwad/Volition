import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import signup from '../../assets/images/signup.jpeg';
import logo from '../../assets/images/Logo.png';
import { useEffect } from 'react';
import '../../styles/pages/SignUp.css';


function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [stat, setStat] = useState({
    pass: { isRight: true, label: "" },
    confirmPass: { isRight: true, label: "" },
    email: { isRight: true, label: "" },
    
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
 
  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8080/user/signup', { email, pass, passConfirm, name});
      const data = response.data;
      if (typeof data === "object") {
        navigate("/signin");
      } else {
        handleErrorMessage(data);
      }
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  const handleErrorMessage = (message) => {
    const newStat = { pass: { isRight: true, label: "" }, confirmPass: { isRight: true, label: "" }, email: { isRight: true, label: "" } };
    switch (message) {
      case "All fields must be filled":
        newStat.confirmPass = { isRight: false, label: "all fields must be filled" };
        break;
      case "Email not valid":
        newStat.email = { isRight: false, label: "Email not valid" };
        break;
      case "Email already in use":
        newStat.email = { isRight: false, label: "Email already in use" };
        break;
      case "Password not strong enough":
        newStat.pass = { isRight: false, label: "Password not strong enough" };
        break;
      case "Passwordconfirm is not match":
        newStat.confirmPass = { isRight: false, label: "Password confirm is not match" };
      break;
      default :navigate('/signin')
      break;
 
    }

    setStat(newStat);
  };


  return (
    <div id='body_sign'>
      <img src={logo} alt='logo' />
    <div id='container_sign'>
    <form onSubmit={Submit} id='left'>
      <h2>Create an account</h2>
      <div >
      <input
        type='text'
        placeholder='Enter your name'
        onChange={(e) => setName(e.target.value)}
        />
        </div>
      <div >
      <label htmlFor='email'>{stat.email.label}</label>
      <input
        id='email'
        type='email'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        </div>
      <div >
        <label htmlFor='pass'>{stat.pass.label}</label>
      <input
        id='pass'
        type='password'
        placeholder='Password'
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        />
        </div>
      <div >
      <input 
        id='confirmpass'
        type='password'
        placeholder='Confirm Password'
        value={passConfirm}
        onChange={(e) => setPassConfirm(e.target.value)}
        />
        <label htmlFor='confirmpass'>{stat.confirmPass.label}</label>
        </div>
      <div id='btn_sub' onClick={Submit}>Sign up</div>
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

export default SignUp;

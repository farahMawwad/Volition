import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../MainPageUser/User";
import axios from "axios";
import "../../../styles/pages/User/Account.css";
function Contact(props) {
  const { id } = useContext(GlobalContext);
  const [info, setInfo] = useState({
    Name: "",
    Email: "",
    Suggestion:""
  });


  const fetchDataUser = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/Client/info/${id}`);
      setInfo({
        ...info,
        Name: res.data.username,
        Email: res.data.userEmail,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, [id]);
  const saveEdit = async () => {
    try {
      await axios.post(`http://127.0.0.1:8080/Client/SuggestionAdd`, info);

      alert("Submit successful");
      fetchDataUser(); 
    } catch (error) {
      console.error("Error Submit user data:", error);
      alert("Error Submit data");
    }
  };

  return (
    <div>
      <div id="mainDiv">
        <div id="inputInfo">
          <div>
            <label htmlFor="username">Your Name:</label>
            <input
              id="username"
              type="text"
              value={info.Name}
              onChange={(e) => setInfo({ ...info, "Name": e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="Email">Your Email :</label>
            <input
              id="Email"
              type="text"
              value={info.Email}
              onChange={(e) => setInfo({ ...info, Email: e.target.value })}
            />
          </div>
        </div>
          <div>
            <label htmlFor="Suggestions">Suggestions :</label>
            <textarea

              id="Suggestions"
              onChange={(e) => setInfo({ ...info, Suggestion: e.target.value })}
            />
             
           
          </div>
       
        <div id="btnSave" onClick={saveEdit}>
          Submit
        </div>
      </div>
    </div>
  );
}

export default Contact;

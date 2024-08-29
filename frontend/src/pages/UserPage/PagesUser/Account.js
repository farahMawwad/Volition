import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../MainPageUser/User";
import axios from "axios";
import "../../../styles/pages/User/Account.css";
function Account(props) {
  const { id,setType_Disability} = useContext(GlobalContext);
  const [info, setInfo] = useState({
    username: "",
    birthDay: "",
    typeDisability: "",
    img: ""
  });
  const [file, setFile] = useState(null);

  const fetchDataUser = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/Client/info/${id}`);
setType_Disability( res.data.typeDisability)
      setInfo({
        username: res.data.username,
        birthDay: res.data.birthDay,
        typeDisability: res.data.typeDisability,
        img: res.data.img
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setInfo({ ...info, img: URL.createObjectURL(file) });
  };

  const saveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('username', info.username);
      formData.append('birthDay', info.birthDay);
      formData.append('typeDisability', info.typeDisability);
      if (file) {
        formData.append('image', file);
      }

      await axios.patch(`http://127.0.0.1:8080/Client/infoEdit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Save successful");
      fetchDataUser(); 
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Error saving data");
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
              value={info.username}
              onChange={(e) => setInfo({ ...info, username: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="birthDay">Birth Day:</label>
            <input
              id="birthDay"
              type="date"
              value={info.birthDay}
              onChange={(e) => setInfo({ ...info, birthDay: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="typeDisability">Type Disability:</label>
            <select
              id="typeDisability"
              value={info.typeDisability}
              onChange={(e) => setInfo({ ...info, typeDisability: e.target.value })}
            >
              <option value="Physical">Physical</option>
              <option value="Sensory">Sensory</option>
              <option value="Mental">Mental</option>
            </select>
          </div>
        </div>
        <div id="imgDiv">
          {info.img && <img src={`http://127.0.0.1:8080${info.img}`} alt="User" />}
          <input
            type="file"
            id="imguser"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="imguser" id="imginput">upload your img </label>
        </div>
        <div id="btnSave" onClick={saveEdit}>
          Save
        </div>
      </div>
    </div>
  );
}

export default Account;

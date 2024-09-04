import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../MainPageUser/User";
import axios from "axios";
import "../../../styles/pages/User/Account.css";
function Cart(props) {
  const { id } = useContext(GlobalContext);
  const [info, setInfo] = useState([])

  const fetchDataUser = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8080/Client/info/${id}`);
      setInfo(res.data.cart)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, []);
 

  return (
    <div>
    <div>
    {(info?.length === 0) ? (
  <div style={{ color: "#f12626", fontSize: "18px", fontWeight: "bold", textAlign: "center", marginTop: "20px" }}>
    No Product Available
  </div>
) : (
  info?.map((e) => (
    <div key={e._id} id="cartI">
        <img src={e.url} width={200}
        height={200}/>
      <h3>{e.title}</h3>
      <p>{e.description}</p>
      <p>count : &nbsp; {e.count}  &nbsp; &nbsp; &nbsp; cost : &nbsp;  &nbsp;{e.cost*e.count}</p>
      
    </div>
  ))
)}
    </div>
    </div>
  );
}

export default Cart;

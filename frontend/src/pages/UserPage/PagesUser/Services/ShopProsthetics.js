import React, { useEffect, useState  } from "react";
import axios from "axios";

function ShopProsthetics({ProstheticsDB}) {
  const [arrayShow, setArrayShow] = useState([]);
  const fetchData = async () => {
    try {

      const res = await axios.get(`http://127.0.0.1:8080/Admin/veiw/${ProstheticsDB}`)
      const data = res.data;

        const Transfemoral = data.filter(e => e.prosthetics === "Transfemoral");
        const Transhumeral = data.filter(e => e.prosthetics === "Transhumeral");
        const Transradial = data.filter(e => e.prosthetics === "Transradial");
        const Transtibial = data.filter(e => e.prosthetics === "Transtibial");

        setArrayShow([
          ["Transfemoral", Transfemoral],
          ["Transhumeral", Transhumeral],
          ["Transradial", Transradial],
          ["Transtibial", Transtibial],
        ]);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div>
      {arrayShow.map(([groupName, items], index) => (
        <div key={index} id="categorize">
          <hr />
          <div>{groupName}</div>
          <hr />
          <div id="prostheticsControl" >
          {items.map(item => (
              <div id="prosthetics" key={item._id}>
                <img  id="prostheticsImg"src={item.url}/>
                <h3>{item.title}</h3>
                <div>{item.description}</div>
                <h4>$ {item.cost}</h4>
              </div>
          ))}
        </div>
          </div>
      ))}
    </div>
  );
}

export default ShopProsthetics;

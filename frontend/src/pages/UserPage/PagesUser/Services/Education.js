import React, { useEffect, useState ,useContext } from "react";
import { GlobalContext } from "../../MainPageUser/User";
import axios from "axios";

function Education({EduDB}) {
  const [arrayShow, setArrayShow] = useState([]);
  const {type_Disability} = useContext(GlobalContext);
  const fetchData = async () => {
    try {

      const res = await axios.get(`http://127.0.0.1:8080/Admin/veiw/${EduDB}`)
      const data = res.data;

      if (type_Disability === "") {
        const sensory = data.filter(e => e.target_group === "Sensory");
        const mental = data.filter(e => e.target_group === "Mental");
        const physical = data.filter(e => e.target_group === "Physical");

        setArrayShow([
          ["Sensory", sensory],
          ["Mental", mental],
          ["Physical", physical]
        ]);
      } else {
        const filteredData = data.filter(e => e.target_group === type_Disability);
        setArrayShow([[type_Disability, filteredData]]);
      }
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
          <div id="coursesControl" >
          {items.map(item => (
              <div id="courses" key={item._id}>
                <iframe src={item.url} title={item.title} width="100%" height="auto" />
                <h3>{item.title}</h3>
                <div>{item.description}</div>
              </div>
          ))}
        </div>
          </div>
      ))}
    </div>
  );
}

export default Education;

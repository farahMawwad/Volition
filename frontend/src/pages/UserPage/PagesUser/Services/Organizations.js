import React, { useEffect, useState  } from "react";
import axios from "axios";

function Organizations({OrganizationsDB}) {
  const [arrayShow, setArrayShow] = useState([]);
  const fetchData = async () => {
    try {

      const res = await axios.get(`http://127.0.0.1:8080/Admin/veiw/${OrganizationsDB}`)
    setArrayShow( res.data)

    
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div>
        <div  id="categorize">
          <hr />
          <div>Organizations</div>
          <hr />
          <div id="OrganizationsControl" >
      {arrayShow.map(( item, index) => (
              <div id="Organization" key={item._id}>
                <img  id="prostheticsImg"src={item.url}/>
                <h3>{item.title}</h3>
                <div>{item.description}</div>
              </div>
          ))}
        </div>
          </div>
   
    </div>
  );
}

export default Organizations;

import React from 'react';
import axios from 'axios';
import { useEffect ,useState} from 'react';

function Suggestions(database) {
 const [Array,setArray]=useState([])
 const fetch = async()=>{
        const res = await axios.get(`http://127.0.0.1:8080/Admin/veiw/${database.database}`);
        setArray(res.data)
        
 } 
  useEffect(()=>{
fetch()

  },[])
  return (
    <div id='Suggestions'>
    <div id="Suggestion_title"></div>
      {Array.length=="1"?(  <h2>There is {Array.length} suggestion</h2>):(<div>There are  {Array.length}suggestion</div>)}
  <div id="Suggestion">
    {Array.map((e) => (
      <div id='sug'>
       
          <div><h3>Name :</h3>{e.Name}</div>
     
       
          <div><h3>Email :</h3>   {e.Email}</div>
       
        
          <div><h3>Suggestion :</h3> {e.Suggestion}</div>
      
      </div>
    ))}
  </div>
  </div>
  );
}

export default Suggestions;
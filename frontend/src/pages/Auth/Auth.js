import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin from "../AdminPage/MainPageAdmin/AdminMain";
import User from "../UserPage/MainPageUser/User";
function Auth() {
  const [state, setstate] = useState();
  const [role, setrole] = useState();
  const [contain, setcontain] = useState(false); 

  useEffect(() => {
    axios.post('http://127.0.0.1:8080/user/test')
      .then((res) => {
        if (res.data.authData != null) {
          console.log(res.data)
          setcontain(true);
          setrole(res.data.authData.role)
          setstate(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {contain?state.authData.role =="1"? <User id_user={state.authData._id} />:state.authData.role=="0"? <Admin id_user={state.authData._id}/>:"":""}
    </div>
  );
}

export default Auth;
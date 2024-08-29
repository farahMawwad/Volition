
import React, { useEffect, useState } from "react";
import "../../../styles/pages/User/Services.css"
import Education from "./Services/Education";
import Organizations from "./Services/Organizations";
import ShopProsthetics from "./Services/ShopProsthetics";
export const GlobalContent = React.createContext();
function Services() {

  const [Content,setContent]=useState()
useEffect(()=>{
setContent(<Education EduDB="Edu" />)
},[])
return (
<GlobalContent.Provider value={{Content,setContent}}>
<div>
   <div id="type">
    <div onClick={()=>setContent(<Education EduDB="Edu" />)} >Education</div>
   <div onClick={()=>setContent(<ShopProsthetics   ProstheticsDB="Prosthetics" />)}>Shop Prosthetics</div>
  <div onClick={()=>setContent(<Organizations  OrganizationsDB="Organizations" />)}>Organizations</div>
</div>
</div>
{Content}
</GlobalContent.Provider>
);
}

export default Services;
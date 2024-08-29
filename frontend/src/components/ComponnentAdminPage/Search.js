import React, { useEffect,useState } from 'react';
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
function Search ({ database }) {
    console.log(database.database)
    const [search, setSearch] = useState(''); 
    const [courseArray, setCourseArray] = useState([]);
    const [allCourse, setAllCourse] = useState([]);
    const [idItem,setIdItem] =useState()
    const DivEdit = document.getElementById("edit");
    const leftAdmin = document.getElementById("leftAdmin");
    const Edu = document.getElementById("Edu");
    const [infoEdit, setInfoEdit] = useState({
      targetEdit: "",
      prostheticsEdit :"",
      titleEdit: "",
      descriptionEdit: "",
      urlEdit: "",
      percentageEdit:"",
      costEdit:"",
      NameEdit:""
    })
    const VeiwCourse = async (type) => {
        setIdItem(type)
      try {
        const response = await axios.get(`http://127.0.0.1:8080/Admin/veiwItem/${database.database}/${type}`);
        setInfoEdit({
          targetEdit: response.data.target_group,
          titleEdit: response.data.title,
          descriptionEdit: response.data.description,
          urlEdit: response.data.url,
          percentageEdit:response.data.percentage,
          costEdit:response.data.cost,
          NameEdit:response.data.Name
        });
      console.log(infoEdit)
        if (DivEdit.style.display === 'inline') {
          DivEdit.style.display = 'none';
          leftAdmin.style.filter = 'blur(0px)';
          Edu.style.filter = 'blur(0px)';
        } else {
          DivEdit.style.display = 'inline';
          leftAdmin.style.filter = 'blur(40px)';
          Edu.style.filter = 'blur(40px)';
        }
      
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
  

  
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/Admin/veiw/${database.database}`);
            setCourseArray(response.data);
            setAllCourse(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []); 
    const ButtonEdit = async() => {
      console.log("farah")
       await axios.patch(`http://127.0.0.1:8080/Admin/editItem/${database.database}/${idItem}`,infoEdit);
       alert("edit done successfully")
       fetchCourses()
        DivEdit.style.display= 'none';
        leftAdmin.style.filter = 'blur(0px)';
        Edu.style.filter = 'blur(0px)';
  }
  const Delete = async(id) => {
    const response = await axios.delete(`http://127.0.0.1:8080/Admin/deleteItem/${database.database}/${id}`);
fetchCourses()
    alert("delete done successfully")
  }

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) { 
            if (search === '') {
                setCourseArray(allCourse);
            } else {
                const filteredCourses = allCourse.filter((item) =>
                    item.title.toLowerCase().startsWith(search.toLowerCase())
                );
                console.log(filteredCourses);
                setCourseArray(filteredCourses);
            }
        }
    };

    return (
        <div >
          <div id="edit">
          <form>

    {database.database =="Prosthetics"?(
        <div>
        <label htmlFor="Prosthetics">Prosthetics :</label>
        <select id="Prosthetics" 
         value={infoEdit.prostheticsEdit}
         onChange={(e) => setInfoEdit({
             ...infoEdit,
             "prostheticsEdit": e.target.value
         })}
        >
          <option value="Transradial"> Transradial</option>
          <option value="Transhumeral">Transhumeral</option>
          <option value="Transtibial"> Transtibial </option>
          <option value="Transfemoral"> Transfemoral </option>
        </select>
                </div>
    ):database.database =="Organizations"?(  <div>
      <label htmlFor="Organization">Name Organization :</label>
      <input
        id="Organizations"
        value={infoEdit.NameEdit}
        onChange={(e) =>
          setInfoEdit({
            ...infoEdit,
            "NameEdit": e.target.value,
          })
        }
      >
      </input>
    </div>):(            <div>
      <label htmlFor="target">Target Groups :</label>
      <select
        id="target"
        value={infoEdit.targetEdit}
        onChange={(e) =>
          setInfoEdit({
            ...infoEdit,
            "targetEdit": e.target.value,
          })
        }
      >
        <option value="Mental">Mental</option>
        <option value="Sensory">Sensory</option>
        <option value="Physical">Physical</option>
      </select>
    </div>)}
            <div>
              <label htmlFor="title">Title :</label>
              <input
                type="text"
                id="title"
                value={infoEdit.titleEdit}
                onChange={(e) =>
                  setInfoEdit({
                    ...infoEdit,
                    "titleEdit": e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="description">Description :</label>
              <textarea
                id="description"
                value={infoEdit.descriptionEdit}
                onChange={(e) =>
                  setInfoEdit({
                    ...infoEdit,
                    "descriptionEdit": e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div>
              <label htmlFor="url">Url :</label>
              <input
                id="url"
                type="url"
                value={infoEdit.urlEdit}
                onChange={(e) =>
                  setInfoEdit({
                    ...infoEdit,
                    "urlEdit": e.target.value,
                  })
                }
              />
            </div>
            {database.database =="Offer"?(   <div>
      <label htmlFor="percentage">Percentage: </label>
      <input
        id="percentage"
        type="number"
        value={infoEdit.percentageEdit}
        onChange={(e)=> {
          if (/^\d{0,2}$/.test( e.target.value)) { 
          setInfoEdit({
            ...infoEdit,
            "percentageEdit": e.target.value
        })
  
            }
          }}
        maxLength={2} 
      />
      <span>%</span>
    </div>):""}
{database.database=="Prosthetics" ?(                  
    <div>
<label htmlForm="cost">Cost :</label>
<input id="cost" type="number"
 value={infoEdit.costEdit}
 onChange={(e) => setInfoEdit({
     ...infoEdit,
     "costEdit": e.target.value
 })}

></input>
        </div>):""}






            <div id="buttonAdd" onClick={ButtonEdit}>
              Edit
            </div>
          </form>
        </div>
            <input
                type='search'
                placeholder='Search Title'
                id='search'
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={handleKeyUp}
                />
                {
            courseArray.length > 0 ? (
                courseArray.slice(-5).map((item) => (
                    <div id='course' key={item._id}>
                     {database.database =="Prosthetics" ?(<div>{item.prosthetics}</div>):
                     database.database =="Organizations"?(<div>{item.Name}</div>):(<div>{item.target_group}</div>)}   
                        <div>{item.title}</div>
                        <FontAwesomeIcon icon={faPenToSquare} className="icon" onClick={() => VeiwCourse(item._id)}
                         style={{ color: '#0f5d61' }}
                        />
                       <FontAwesomeIcon icon={faTrash} className='icon'  onClick={()=>Delete(item._id) }
                        style={{ color: '#0f5d61' }} />
                    </div>
                ))
            ) : (
                <p>No courses available</p>
            )}
        </div>
    );
}

export default Search;

import React, { useState, useRef } from 'react';
import Search from '../../../components/ComponnentAdminPage/Search';
import axios from 'axios';
import "../../../styles/pages/Admin/PagesAdmin/Edu.css"
function Edu(database ) {
    const [searchKey, setSearchKey] = useState(0); 
    const [info, setInfo] = useState({
      target:"",
      title:"",
      description:"",
      url:"",
    });
  
    const ButtonAdd = async () => {
        alert('Course added successfully');
        try {
            await axios.post(`http://127.0.0.1:8080/Admin/add/${database.database}`, { info });
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div id='main'>
            <div id='Edu'>
                <form>
                    <div>
                        <label htmlFor="target">Target Groups:</label>
                        <select
                            id="target"
                            value={info.target}
                            onChange={(e) => setInfo({
                                ...info,
                                target: e.target.value
                            })}
                        >
                            <option value="Physical">Physical</option>
                            <option value="Sensory">Sensory</option>
                            <option value="Mental">Mental</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={info.title}
                            onChange={(e) => setInfo({
                                ...info,
                                title: e.target.value
                            })}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={info.description}
                            onChange={(e) => setInfo({
                                ...info,
                                description: e.target.value
                            })}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="url">URL:</label>
                        <input
                            id="url"
                            type="url"
                            value={info.url}
                            onChange={(e) => setInfo({
                                ...info,
                                url: e.target.value
                            })}
                        />
                    </div>
                    <div id='buttonAdd' onClick={ButtonAdd}>Add</div>
                </form>
            </div>
            <Search database={database}  />
        </div>
    );
}

export default Edu;

import React, { useState, useRef } from 'react';
import Search from '../../../components/ComponnentAdminPage/Search';
import axios from 'axios';
import "../../../styles/pages/Admin/PagesAdmin/Edu.css"
function Organizations(database ) {
    const [searchKey, setSearchKey] = useState(0); 
    const [info, setInfo] = useState({
      Name:"",
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
                        <label htmlFor="Name">Name Organizations:</label>
                        <input 
                        type='text'
                            id="Name"
                            value={info.Name}
                            onChange={(e) => setInfo({
                                ...info,
                                Name: e.target.value
                            })}
                        >
                        </input>
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

export default Organizations;

import React, { useState } from 'react';
import Search from '../../../components/ComponnentAdminPage/Search';
import axios from 'axios';

function Prosthetics(database ) {
    const [info, setInfo] = useState({
        prosthetics:"",
      title:"",
      description:"",
      url:"",
      cost:""
    });
  
    const ButtonAdd = async () => {
        alert('Course added successfully');
        try {
                console.log(info)
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
<label htmlFor="Prosthetics">Prosthetics :</label>
<select id="Prosthetics" 
 value={info.prosthetics}
 onChange={(e) => setInfo({
     ...info,
     "prosthetics": e.target.value
 })}
>
  <option value="Transradial"> Transradial</option>
  <option value="Transhumeral">Transhumeral</option>
  <option value="Transtibial"> Transtibial </option>
  <option value="Transfemoral"> Transfemoral </option>
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
                                "title": e.target.value
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
                                "description": e.target.value
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
                                "url": e.target.value
                            })}
                        />
                    </div>
                    <div>
<label htmlForm="cost">Cost :</label>
<input id="cost" type="number"
 value={info.cost}
 onChange={(e) => setInfo({
     ...info,
     "cost": e.target.value
 })}

></input>
        </div>
                    <div id='buttonAdd' onClick={ButtonAdd}>Add</div>
                </form>
            </div>
            <Search database={database}  />
        </div>
    );
}

export default Prosthetics;

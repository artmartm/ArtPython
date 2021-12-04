import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const AddCountry= () => {

    let history = useHistory();

    const [name, setName] = useState('')
    const [language, setLanguage] = useState('')
    const [populations, setPopulations] = useState('')
    const [area, setArea] = useState('')
    

    const Add = async () => {
        let formField = new FormData()
        formField.append('name',name)
        formField.append('populations',populations)
        formField.append('area',area)
        formField.append('language',language)

        await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/api/countries/',
          data: formField
        }).then(response=>{
          console.log(response.data);
          history.push('/')
        })
    }
   
    return (
        <div className="container">
            <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">add a country</h2>
        
        <div className="form-group">
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="put the populations"
              name="populations"
              value={populations}
              onChange={(e) => setPopulations(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="put the area"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="put the language"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
 
          <button className="btn btn-primary btn-block" onClick={Add}>add country</button>
       
      </div>
    </div>
        </div>
    );
};

export default AddCountry;
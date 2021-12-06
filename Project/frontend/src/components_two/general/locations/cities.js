import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const AddCity= () => {

    let history = useHistory();

    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [populations, setPopulations] = useState('')
    const [area, setArea] = useState('')
    

    const Add = async () => {
        let formField = new FormData()
        formField.append('name',name)
        formField.append('country',country)
        formField.append('area',area)
        formField.append('populations',populations)

        await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/api/cities/',
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
        <h2 className="text-center mb-4">add a city</h2>
        
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
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
              name="populations"
              value={populations}
              onChange={(e) => setPopulations(e.target.value)}
            />
          </div>
 
          <button className="btn btn-primary btn-block" onClick={Add}>add city</button>
       
      </div>
    </div>
        </div>
    );
};

export default AddCity;
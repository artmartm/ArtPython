import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function AddComment({obj}) {
    //const id = props.object_id;
    let history = useHistory();

    const [name, setName] = useState('')
    const [content_type, setContent_type] = useState('18')
    const [object_id, setObject_id] = useState(obj)
    const [author, setAuthor] = useState('1')



    const Add = async () => {
        let formField = new FormData()
        formField.append('name',name)
        formField.append('content_type',content_type)
        formField.append('object_id',object_id)
        formField.append('author',author)



        await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/api/just/',
          data: formField
        }).then(response=>{
          console.log(response.data);
        })
        
        
    }
   
    return (
        <div className="container">
            <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">add a comments</h2>
        
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
       
          {/*<div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="content_type"
              name="content_type"
              value={content_type}
              onChange={(e) => setContent_type(e.target.value)}
            />
          </div> */}
          {
          /*
          05.12.2021
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="id"
              name="object_id"
              value={object_id}
              onChange={(e) => setObject_id(e.target.value)}
            />
        </div>*/}
          <button className="btn btn-primary btn-block" onClick={Add}>add city</button>
       
      </div>
    </div>
        </div>
    );
};

export default AddComment;
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';



function DeleteNews({id}) {



   const history = useHistory()

    const Delete = async () => {
        let formField = new FormData()

        await axios({
          method: 'delete',
          url:`http://127.0.0.1:8000/api/news/${id}`,
          data: formField,
          headers:{
            'Content-Type':'application/json',
            //'Authorization':'Bearer ' + String(authTokens.access)
        }
        }).then(response=>{
          console.log(response.data);
          history.push('/')
        })
    }
   
    return (
      <div>
          <div className="form-group">
          <button style={{ width:30, height:30, borderRadius:15, background:'red' }} 
          className="btn btn-primary btn-block" onClick={()=>Delete()}>&times;</button>
          </div>
      </div>
    );
};

export default DeleteNews;
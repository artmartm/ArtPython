import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


function Tournamnet() {

    const [tour, setTour] = useState([]) 

   useEffect(()=> {
    getNotes()
    }, [])


let getNotes = async() =>{
    let response = await fetch('http://127.0.0.1:8000/api/tournament/', {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
         //   'Authorization':'Bearer ' + String(authTokens.access)
        }
    })
    let data = await response.json()

    if(response.status === 200){
        setTour(data)
    }}

    return(
        <div>
            <h1>Teams page</h1>
            <hr/>
                {tour.map(item => (
                    <div>
                    <h2 key={item.id}>
                        <h2>{item.name} - {item.sum_points}</h2>
                    </h2>
                    </div>
                    ))}
                </div>)
                }

export default Tournamnet;

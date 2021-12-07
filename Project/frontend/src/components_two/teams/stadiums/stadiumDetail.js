import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function StadiumDetail({ match }) {
    
    const[stadium, setStadium] = useState({});
    const id = match.params.id;

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/stadiums/${id}`,
        }).then(response=>{
            setStadium(response.data)
        })
    },[id])


    return(
        <div>
            <h1>{stadium.name}</h1>
            <h2>{stadium.team}</h2>
        </div>
    )
}

export default StadiumDetail;

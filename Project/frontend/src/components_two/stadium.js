import React, {useState, useEffect} from "react";
import axios from 'axios';


function ListOfStadiums() {
    const[stadiums, setStadiums] = useState([]);
    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/stadiums`,
        }).then(response=>{
            setStadiums(response.data)

        })
    },[])
    return(
        <div style={{ alignItems:'center' }}>
            <h2>list of stadiums</h2>
            {stadiums.length ?
                stadiums.map(e=>(
                    <h3>{e.name}</h3>
                )) : <p>no stadiums yet</p>
            }
        </div>
    )
}

export default ListOfStadiums;

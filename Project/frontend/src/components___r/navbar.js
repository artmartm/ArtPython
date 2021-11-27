import axios from "axios";
import {Link} from "react-router-dom";
import React, { useEffect, useState } from "react";

function Navbar() {
    const cors=require("cors");
    const corsOptions ={
       origin:'*', 
       credentials:true,            //access-control-allow-credentials:true
       optionSuccessStatus:200,
    }
    const [teams, setTeams] = useState([])
    //let cors = require('cors')

    useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/teams/"
        }).then(response => {
            setTeams(response.data)
        })
    },[])
    teams.use(cors(corsOptions)) // Use this after the variable declaration

    return(
      <div className='for_div'>
        <h1>hello</h1>
    </div>
    );
}

export default Navbar;
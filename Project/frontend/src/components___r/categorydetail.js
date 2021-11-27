import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function CategoryDetail({ match }) {

    const [teams, setTeams] = useState([])
    //const [players, setPlayers] = useState([])
    const id = match.params.id

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/api/teams/`
        }).then(response => {
            setTeams(response.data)
        })
    }, [])

    return(
        <div>
            <h1>Team page</h1>
            <hr/>
            <div className="row">
                {teams.map(p => (
                    <div className="col-md-4" key={p.id}>
                        <h3>name of the team is {p.name}</h3>
                        <Link to={{ pathname: `/teams/${p.id}`, fromDashboard:false }}>details</Link>
                        <br/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryDetail;

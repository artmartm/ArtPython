import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import Styles from '../styles';
//import styles from '../Style';

function Leagues({ match }) {

    const [league, setLeague] = useState({});
    const [teams, setTeams] = useState([]);
    
    const id = match.params.id;

    useEffect( () => {
        axios({
            method:"GET",
            url:`http://127.0.0.1:8000/api/league/${id}`,
            mode: "no-cors"
        }).then(response => {
            setLeague(response.data)
            setTeams(response.data.teams)
        })
    },[id])
    const Background = league.team_logo;
    return(
        <div style={{backgroundImage: `url(${Background})`, backgroundSize: 'cover'}}>
            <h1>{league.name}</h1>
            {/* <img src={items.team_logo} width={350}/> */}
            <hr/>
            <h2>Players</h2>
            {teams.map(e=>(
                <div>
                <h3 key={e.id}><Link style={styles.Link} to={ `/teams/${e.id}` }>{e.name}</Link></h3>
                </div>
            ))}
        </div>
    )
}

export default Detail;
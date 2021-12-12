import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function TeamDetail({ match }) {
    
    const[team, setTeam] = useState({});
    const[pl, setPl] = useState([]);
    const id = match.params.id;
    const[showComments, setShowComments] = useState([{
        isOpen:false
    }])
    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/teams/${id}`,
        }).then(response=>{
            setTeam(response.data)
            setPl(response.data.players)

        })
    },[id])


    return(
        <div>
            <h1>{team.name}</h1>
            <h1>id is {team.id}</h1>
            <p>games {team.games}</p>
            <p>amount of points {team.points}</p>
            <p>wins {team.wins}</p>
            <p>defeats {team.defeats}</p>
            <p>wins OT {team.wins_OT}</p>
            <p>defeats OT {team.defeats_ot}</p>
            <h2>{team.team_logo}</h2>
            <div style={{backgroundImage:team.team_logo}}><h1></h1></div>
            {team.team_logo ? <img src={team.team_logo} /> : <p>no photo yet</p>}
            <hr/>
            <h3>list of players</h3>
            <React.Fragment>
            <button onClick={()=>{setShowComments({isOpen:true})}}>show players</button>        
    {showComments.isOpen && 
        <div>       
            {pl.length ? pl.map(e=>(
                <Link key={e.id} to={`/players/${e.id}`} ><h2>{e.name}!!!</h2></Link>
            )) : <p>no players</p>
        }
            <button onClick={()=>{setShowComments({isOpen:false})}}>close</button>
        </div>
    }
        </React.Fragment>

        </div>

    )
}

export default TeamDetail;

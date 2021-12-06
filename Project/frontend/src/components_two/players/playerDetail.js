import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AddComment from "../general/comments/addComment";
import CommentsList from "../general/comments/commentsList";
import content_type from "../general/content_type";
import PlayerMainInfo from "./playerMainInfo";
import PlayerPersonalInfo from "./playerPersonalInfo";

function PlayerDetail({ match }) {
    const[state, setState] = useState([{
        isOpen:false
    }])
    const[player, setPlayer] = useState({});
    const[team,setTeam] = useState([]);
    const id = match.params.id;
    const ct = '18';

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/players/${id}`,
        }).then(response=>{
            setPlayer(response.data)
            setTeam(response.data.team)
        })
    },[id])


    return(
        <div>
            <h1>Player page</h1>
            <h2>{player.name}</h2>
            <Link style={{textDecoration: 'none'}} key={player.team} to={`/teams/${player.team}`} ><h2>team</h2></Link>
            <hr/>
            <h2>list of comments</h2>
            <React.Fragment>
                <button onClick={()=>{setState({isOpen:true})}}>show just</button>        
                    {state.isOpen && 
                        <div>       
                            <CommentsList key={id}  obj={id}/>
                            <button onClick={()=>{setState({isOpen:false})}}>close </button>
                        </div>
                    }
            </React.Fragment>
            <h2>leave a comment</h2>
                <AddComment obj={id}/>
            <br/>
            <PlayerPersonalInfo obj={player.id} />
            <PlayerMainInfo obj={player.id} />
        </div>
    )
}

export default PlayerDetail;

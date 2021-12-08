import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AddComment from "../general/comments/addComment";
import CommentsList from "../general/comments/commentsList";
import PlayerMainInfo from "./playerMainInfo";
import PlayerPersonalInfo from "./playerPersonalInfo";

function PlayerDetail({ match }) {
    const[showComments, setShowComments] = useState([{
        isOpen:false
    }])
    const[showPersonalInfo, setShowPersonalInfo] = useState([{
        isOpen:false
    }])    
    const[showMainInfo, setShowMainInfo] = useState([{
        isOpen:false
    }])

    const[player, setPlayer] = useState({});
    const id = match.params.id;
    const cotent_type = '18';

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/players/${id}`,
        }).then(response=>{
            setPlayer(response.data)
        })
    },[id])

    return(
        <div>
            <h1>{player.name} page</h1>
            <h3>team is {player.team}</h3>
            <h3>position is {player.position}</h3>
            <Link 
                style={{textDecoration: 'none'}} 
                key={player.team} 
                to={`/teams/${player.team}`}>
                <p>to the player's team</p>
            </Link>
            <hr/>
            <React.Fragment>
                <button onClick={()=>{setShowComments({isOpen:true})}}>show comments</button>        
                    {showComments.isOpen && 
                        <div>       
                            <CommentsList key={id}  obj={id}/>
                            <button onClick={()=>{setShowComments({isOpen:false})}}>close</button>
                        </div>
                    }
            </React.Fragment>
                <AddComment obj={id}/>
            <br/>
            <React.Fragment>
                <button onClick={()=>{setShowPersonalInfo({isOpen:true})}}>show personal info</button>        
                    {showPersonalInfo.isOpen && 
                        <div>       
                            <PlayerPersonalInfo obj={player.id} />
                            <button onClick={()=>{setShowPersonalInfo({isOpen:false})}}>close</button>
                        </div>
                    }
            </React.Fragment>
            <React.Fragment>
                <button onClick={()=>{setShowMainInfo({isOpen:true})}}>show personal info</button>        
                    {showMainInfo.isOpen && 
                        <div>       
                            <PlayerMainInfo obj={player.id} />
                            <button onClick={()=>{setShowMainInfo({isOpen:false})}}>close</button>
                        </div>
                    }
            </React.Fragment>
        </div>
    )
}

export default PlayerDetail;

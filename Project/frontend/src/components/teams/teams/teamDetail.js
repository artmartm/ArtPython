import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../general/base/AuthContext";
import AddComment from "../../general/comments/addComment";
import CommentsList from "../../general/comments/commentsList";
import { useDispatch, useSelector } from "react-redux";

function TeamDetail({ match }) {
    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamsReducer.teams)
    const[team, setTeam] = useState({});
    const[pl, setPl] = useState([]);
    const[stadium, setStadium] = useState([]);
    const[matches, setMatches] = useState([]);
    const id = match.params.id;
    const[showComments, setShowComments] = useState([{
        isOpen:false
    }])
    const[showMatches, setShowMatches] = useState([{
        isOpen:false
    }])
    const[showPlayers, setShowPlayers] = useState([{
        isOpen:false
    }])
    let {authTokens, logoutUser} = useContext(AuthContext)
    //const dispatch = useDispatch();
    //const stadiums = useSelector(state => state.stadiumsReducer.stadiums)

    const content_type = '14';
    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/teams/${id}`,
            headers:{
                'Content-Type':'application/json',
          //      'Authorization':'Bearer ' + String(authTokens.access)
            }
        }).then(response=>{
            setTeam(response.data)
            setPl(response.data.players)
            setStadium(response.data.stadium)
            setMatches(response.data.matches)
        })
    },[id])
    const [color,setColor] = useState('yellow')
    return(
        <div style={{ backgroundColor:color }}>
            <h1 onClick={()=>setColor('red')}>{team.name} <img src={team.team_logo} width={50} height={50}/></h1>
            
        <h1>{id}</h1>
            <p>games {team.games}</p>
            <p>amount of points {team.points}</p>
            <p>wins {team.wins}</p>
            <p>defeats {team.defeats}</p>
            <p>wins OT {team.wins_ot}</p>
            <p>defeats OT {team.defeats_ot}</p>
            {stadium.map(e=>(
                <p>stadium is <Link key={e.id} to={`/stadiums/${e.id}`}>{e.name}!!!</Link></p>
            ))}
            <div style={{backgroundImage:team.team_logo}}><h1></h1></div>
            {team.team_logo ? <img src={team.team_logo} width={500} height={500}/> : <p>no photo yet</p>}
            <hr/>
            <div>       
        </div>
            <h3>list of players</h3>
            <React.Fragment>
            <button onClick={()=>{setShowPlayers({isOpen:true})}}>show players</button>        
    {showPlayers.isOpen && 
        <div>       
            {pl.length ? pl.map(e=>(
                <Link key={e.id} to={`/players/${e.id}`} ><h2>{e.name}!!!</h2></Link>
            )) : <p>no players</p>
        }
            <button onClick={()=>{setShowPlayers({isOpen:false})}}>close</button>
        </div>
    }
    <hr/>
        </React.Fragment>
        <h3>list of matches</h3>
            <React.Fragment>
            <button onClick={()=>{setShowMatches({isOpen:true})}}>show matches</button>        
    {showMatches.isOpen && 
        <div>       
            {matches.length ? matches.map(e=>(
                <Link key={e.id} to={`/game/${e.id}`} >{teams[e.home_team-1].name} vs {teams[e.away_team-1].name}<br/></Link>
            )) : <p>no matches</p>
        }
            <button onClick={()=>{setShowMatches({isOpen:false})}}>close</button>
        </div>
    }
    <hr/>
        
        </React.Fragment>
        <br/>
        <React.Fragment>
                <button onClick={()=>{setShowComments({isOpen:true})}}>show comments</button>        
                    {showComments.isOpen && 
                        <div>       
                            <CommentsList key={id}  obj={id} ct={content_type}/>
                            <button onClick={()=>{setShowComments({isOpen:false})}}>close</button>
                        </div>
                    }
            </React.Fragment>
                <AddComment obj={id} ct={content_type}/>
            <br/>
        </div>

    )
}

export default TeamDetail;





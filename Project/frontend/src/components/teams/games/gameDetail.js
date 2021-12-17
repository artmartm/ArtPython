import axios from "axios";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTeams } from "../../../redux_two/actions/asyncActions/asyncAllTeams";
import AddComment from "../../general/comments/addComment";
import CommentComponent from "../../general/comments/commentComponent";
import CommentsList from "../../general/comments/commentsList";

function GameDetail({ match }) {


  
    const teams = useSelector(state => state.teamsReducer.teams)

    
    const [showComments,setShowComments]=useState({isOpen:false})
    const[game, setGame] = useState({});
    //const[pl, setPl] = useState([]);
    const id = match.params.id;
    const content_type='17';
    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/games/${id}`,
        }).then(response=>{
            setGame(response.data)
      //      setPl(response.data.players)

        })
    },[id])


    return(
        <div>
            <h1>{game.name}</h1>
            <Link to={`/teams/${game.home_team}`}>{game.home_team}</Link>
            {teams.map(e=>(
                <div>
                {e.id==game.home_team ?
                <div><Link to={`/teams/${e.id}`}>{e.name}</Link></div>:<></>}
                </div>
            ))}
            <h2>{game.home_team_goals} : {game.away_team_goals}</h2>
            <p>winner is <b>{game.winner}</b></p>
            <React.Fragment>
                <button onClick={()=>{setShowComments({isOpen:true})}}>show comments</button>        
                    {showComments.isOpen && 
                        <div>       
                            <CommentsList key={id}  obj={id} ct={content_type}/>
                            <button onClick={()=>{setShowComments({isOpen:false})}}>close</button>
                        </div>
                    }
            </React.Fragment>
            <CommentComponent obj={id} ct={content_type}/>
        </div>
    )
}

export default GameDetail;

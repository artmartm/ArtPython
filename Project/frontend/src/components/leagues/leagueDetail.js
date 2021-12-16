import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../general/base/AuthContext";
import AddComment from "../general/comments/addComment";
import CommentsList from "../general/comments/commentsList";

function LeagueDetail({ match }) {
    
    let {authTokens, logoutUser} = useContext(AuthContext)


    const[league, setLeague] = useState({});
    const[team, setTeam] = useState([]);
    const[cm, setCm] = useState([]);
    const id = match.params.id;
    const content_type = '13';
    const[showComments, setShowComments] = useState([{
        isOpen:false
    }])
    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/leagues/${id}`,
            mode: 'no-cors'
        }).then(response=>{
            setLeague(response.data)
            setTeam(response.data.teams)
            setCm(response.data.news)
        })
    },[id])


    return(
        <div>
            <h1>hello this is {league.name}</h1> 
            <img src={league.league_logo} width={600} height={500}/>          
            <hr/>
            <h3>teams:</h3>
            {team.map(e=>(
                <Link key={e.id} to={`/teams/${e.id}`} ><h2>{e.name}!</h2></Link>
            ))}
            <hr/>
            {cm.map(e=>(
                <Link key={e.id}><p>{e.name}</p></Link>
            ))}
               <React.Fragment>
                <button onClick={()=>{setShowComments({isOpen:true})}}>show comments</button>        
                    {showComments.isOpen && 
                        <div>       
                            <CommentsList key={id}  obj={id} ct={content_type}/>
                            <button onClick={()=>{setShowComments({isOpen:false})}}>close</button>
                        </div>
                    }
            </React.Fragment>
            {authTokens ?
                <AddComment obj={id} ct={content_type}/>
                :
                <p>can not add comments</p>
            }
            <br/>
        </div>
    )
}

export default LeagueDetail;
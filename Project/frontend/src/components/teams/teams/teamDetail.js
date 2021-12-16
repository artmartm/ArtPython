import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import AddComment from "../../general/comments/addComment";
import { useSelector } from "react-redux";
import ParticularNewsList from "../../general/news/particularNewsList";

import './../../../css/teams/j.css'

//coments
import CommentsList from "../../general/comments/commentsList";
import AllCommentsList from "../../general/comments/allComments";

//import AuthContext from "../../general/base/AuthContext";

function TeamDetail({ match }) {

    const styles = {
        game_img:{
            width:50,
            height:50, 
            borderRadius:'25px'
        },
        main_img:{
            width:500,
            height:500, 
            borderRadius:'250px'
        },
        link:{
            textDecoration: "none"
        },
        player_img:{
            border:'1px solid', 
            borderRadius:'10px',
            width:180,
            height:180
        },
        player_back:{
            position:'center', 
            backgroundRepeat:'no-repeat', 
            backgroundPosition:'center'
        }
    }

    const id = match.params.id;
    const content_type = '14';
//  let {authTokens, logoutUser} = useContext(AuthContext)
    //
    const teams = useSelector(state => state.teamsReducer.teams)
    //
    const[team, setTeam] = useState({});
    const[pl, setPl] = useState([]);
    const[stadium, setStadium] = useState([]);
    const[matches, setMatches] = useState([]);
    //show close
    const[showComments, setShowComments] = useState([{
        isOpen:false
    }])
    const[showNews, setShowNews] = useState([{
        isOpen:false
    }])
    const[showMatches, setShowMatches] = useState([{
        isOpen:false
    }])
    const[showPlayers, setShowPlayers] = useState([{
        isOpen:false
    }])

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
    
    return(
        <div>
            <h1>{team.name} <img src={team.team_logo} width={75} height={75}/></h1>
            <h2>{team.second_name}</h2>
            <h2>id is {team.id}</h2>
            <p>games {team.games}</p>
            <p>amount of points {team.points}</p>
            <p>wins {team.wins}</p>
            <p>defeats {team.defeats}</p>
            <p>wins OT {team.wins_ot}</p>
            <p>defeats OT {team.defeats_ot}</p>
            {stadium.map(e=>(
                <p>stadium is   
                    <Link style={styles.link} key={e.id} to={`/stadiums/${e.id}`}> {e.name}!!!</Link>
                </p>
            ))}
            <div style={{backgroundImage:team.team_logo}}><h1></h1></div>
            {team.team_logo ? <img style={styles.main_img} src={team.team_logo} /> : <p>no photo yet</p>}
            <hr/>

            <h3>list of players</h3>
                <React.Fragment>
                    <button onClick={()=>{setShowPlayers({isOpen:true})}}>show players</button>    
                        {showPlayers.isOpen && 
                            <div>
                                <div style={{ width:250, height:300, align:'center', border:'1px solid', borderRadius:'50px', margin:'auto' }}>       
                                    {pl.length ? pl.map(e=>(
                                        <div style={{backgroundImage: `url(${e.background})` ,position:'center', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
                                            <Link style={styles.link} key={e.id} to={`/players/${e.id}`} >
                                                <h2>{e.name}!!!</h2>
                                            </Link>
                                            <img style={styles.player_img} src={e.image}/>
                                        </div>
                                    )) : <p>no players</p>
                                    }
                                </div>
                                <br/>
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
                                    <Link key={e.id} to={`/game/${e.id}`} >
                                        <div>
                                            {teams[e.home_team-1].name} <img style={styles.game_img} src={teams[e.home_team-1].team_logo}/>
                                                vs 
                                            {teams[e.away_team-1].name} <img style={styles.game_img} src={teams[e.away_team-1].team_logo} />
                                        </div>
                                    </Link>
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
                            <CommentsList key={id}  obj={id} ct={content_type}/> {/* through redux AllCommentsList */}
                            <button onClick={()=>{setShowComments({isOpen:false})}}>close</button>
                        </div>
                    }
            </React.Fragment>
            <br/><br/>
            <React.Fragment>
                <button onClick={()=>{setShowNews({isOpen:true})}}>show news</button>        
                    {showNews.isOpen && 
                        <div>       
                            <ParticularNewsList key={id}  obj={id} ct={content_type}/>
                            <button onClick={()=>{setShowNews({isOpen:false})}}>close</button>
                        </div>
                    }
            </React.Fragment>
                <AddComment obj={id} ct={content_type}/>
            <br/>
        </div>

    )
}

export default TeamDetail;

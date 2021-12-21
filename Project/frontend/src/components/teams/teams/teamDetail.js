import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import AddComment from "../../general/comments/addComment";
import { useSelector } from "react-redux";
import ParticularNewsList from "../../general/news/particularNewsList";
import './../../../css/teams/teamDetail.css'
import './../../../css/teams/j.css'

//coments
import CommentsList from "../../general/comments/commentsList";
import AllCommentsList from "../../general/comments/allComments";
import AuthContext from "../../general/base/AuthContext";
import CommentComponent from "../../general/comments/commentComponent";

//import AuthContext from "../../general/base/AuthContext";

function TeamDetail({ match }) {

    let {authTokens, logoutUser} = useContext(AuthContext)

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
        <div style={{backgroundImage: `url(${team.team_background})`}}> {/*style={{backgroundImage: `url(${team.team_background})`}}}*/}
            <div className='main_div'>
            <section className="logo-container">
                {team.team_logo ? <img className={'main_img'} src={team.team_logo} /> : <p>no photo yet</p>}
                <h1 className='position'>{team.name}</h1>
                

            </section>
                        <h2>id is {team.id}</h2>
            <p>games {team.games}</p>
            <p>amount of points {team.points}</p>
            <p>wins {team.wins}</p>
            <p>defeats {team.defeats}</p>
            <p>wins OT {team.wins_ot}</p>
            <p>defeats OT {team.defeats_ot}</p>
            {stadium.map(e=>(
                <p>stadium is   
                    <Link className={'link'} key={e.id} to={`/stadiums/${e.id}`}> {e.name}!!!</Link>
                </p>
            ))}
            <div style={{backgroundImage:team.team_logo}}><h1></h1></div>
            <hr/>

            <h3>list of players</h3>
                <React.Fragment>
                    {/* <button onClick={()=>{setShowPlayers({isOpen:true})}}>show players</button>    
                        {showPlayers.isOpen && 
                            <div> */}
                               {pl.length ? pl.map(e=>(
                                // <div className='line_block' >       
                                //         <div className='line_block' style={{backgroundImage: `url(${e.background})` ,
                                //         position:'center', backgroundRepeat:'no-repeat', 
                                //         backgroundPosition:'center'}}>
                                //             <Link className={'link'} key={e.id} to={`/players/${e.id}`} >
                                //                 <h2>{e.name}!!!</h2>
                                //             </Link>
                                //             <img className={'player_img'} src={e.image}/>
                                //         </div>
                                    
                                // </div>
                                <div className="player-card" style={{backgroundImage: `url(${team.team_background})`}}>
                                                <img className='player_img' src={e.image}/>
                                                <p>{e.name}</p>
                                                <p>{e.position} &#127954;</p>
                                                {e.captain?<p>C</p>:<></>}
                                 </div> )) : <p>no players</p> }
                                  {/*}  )) : <p>no players</p> }
                                <br/>
                                <button onClick={()=>{setShowPlayers({isOpen:false})}}>close</button>
                            </div>
                        } */}
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
                                            {teams[e.home_team-1].name} <img className={'game_img'} src={teams[e.home_team-1].team_logo}/>
                                                vs 
                                            {teams[e.away_team-1].name} <img className={'game_img'} src={teams[e.away_team-1].team_logo} />
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
                            <CommentsList key={id}  obj={id} ct={content_type}/> {/* through redux AllCommentsList */}
            <br/>
            </div>
        </div>

    )
}

export default TeamDetail;

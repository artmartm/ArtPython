import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
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
import ParticularTeamGame from "../games/particularTeamGame";

//import AuthContext from "../../general/base/AuthContext";

function TeamDetail({ match }) {

    let { authTokens, logoutUser } = useContext(AuthContext)

    const id = match.params.id;
    const content_type = '14';
    //  let {authTokens, logoutUser} = useContext(AuthContext)
    //
    const teams = useSelector(state => state.teamsReducer.teams)
    //
    const [team, setTeam] = useState({});
    const [pl, setPl] = useState([]);
    const [stadium, setStadium] = useState([]);
    const [matches, setMatches] = useState([]);
    //show close
    const [showComments, setShowComments] = useState([{
        isOpen: false
    }])
    const [showNews, setShowNews] = useState([{
        isOpen: false
    }])
    const [showMatches, setShowMatches] = useState([{
        isOpen: false
    }])
    const [showHistory, setShowHistory] = useState([{
        isOpen: false
    }])
    const [showDescription, setShowDescription] = useState([{
        isOpen: false
    }])
    const [show, setShow] = useState(true);

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/teams/${id}`,
            headers: {
                'Content-Type': 'application/json',
                //      'Authorization':'Bearer ' + String(authTokens.access)
            }
        }).then(response => {
            setTeam(response.data)
            setPl(response.data.players)
            setStadium(response.data.stadium)
            setMatches(response.data.matches)
        })
    }, [id])

    return (
        <div>
            {team ?
        <div style={{ backgroundImage: `url(${team.team_background})` }}> {/*style={{backgroundImage: `url(${team.team_background})`}}}*/}
            <div className='main_div'>
                <section className="logo-container">
                    {team.team_logo ? <img className={'main_img'} src={team.team_logo} /> : <p>no photo yet</p>}
                    <div className='position'>
                        <h1 className='text_in_position'>{team.name}</h1><br />
                        <h1 className='text_in_position2'>{team.second_name}</h1>
                    </div>
                </section>
                <div className='info-container'>
                    <div className='info_div'>
                        <h2>Main info</h2>
                        <ol>
                            <li className='for_list'>country is {team.country}</li>
                            <li>games {team.games}</li>
                            <li>points {team.points}</li>
                            <li>wins {team.wins}</li>
                            <li>defeats {team.defeats}</li>
                            <li>wins OT {team.wins_ot}</li>
                            <li>defeats OT {team.defeats_ot}</li>
                            {stadium.map(e => (
                                <li>stadium is
                                    <Link className={'link'} key={e.id} to={`/stadiums/${e.id}`}> {e.name}!!!</Link>
                                </li>
                            ))}
                            <li><Link to={`/tournament`}>to the table</Link></li>
                        </ol>
                    </div>
                    <div className='news-games-container'>
                        <div className='news-container'>
                            <h1 className='inside-news-container'>Team's news</h1>
                            <React.Fragment>
                                <button onClick={() => { setShowNews({ isOpen: true }) }}>show a news</button>
                                {showNews.isOpen &&
                                    <div>
                                        <ParticularNewsList key={id} obj={id} ct={content_type} />
                                        <button onClick={() => { setShowNews({ isOpen: false }) }}>close</button>
                                    </div>
                                }
                            </React.Fragment>
                        </div>
                        <div>
                            <div className='games-container'>
                                <h1 className='inside-game-container'>games</h1>
                                <React.Fragment>
                                    <button onClick={() => { setShowMatches({ isOpen: true });setShow(false)}}>show all matches</button>
                                    {show ? <ParticularTeamGame show={show} team={team.id} /> :<></>}
                                    {showMatches.isOpen &&
                                        <div>
                                            <ParticularTeamGame show={show} team={team.id} />
                                            <button onClick={() => { setShowMatches({ isOpen: false });;setShow(true)}}>close</button>
                                        </div>
                                    }
                                </React.Fragment>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

                <h3>Squad</h3>
                <div>
                    {pl.length ? pl.map(e => (
                        <div className="player-card" style={{ backgroundImage: `url(${team.team_background})` }}>
                            <Link to={{ pathname: `/players/${e.id}/`, fromDashboard: false }}><img className='player_img' src={e.image} /></Link>
                            <p>{e.name} #{e.player_number}</p>
                            {e.position == 'Forward' ?
                                <Link className='link'>
                                    {e.position} &#127954;
                                </Link> :
                                e.position == 'Defender' ?
                                    <Link className='link'>
                                        {e.position} &#128737;
                                    </Link> :
                                    <Link className='link'>
                                        {e.position} &#129349;
                                    </Link>}
                        </div>)) : <p>no players</p>}
                    <br />
                </div>
                <hr />
                <h2>Additional info</h2>
                <div className='additional-info'>
                    <div className='history'>
                        <React.Fragment>
                            <h1 onClick={() => { setShowHistory({ isOpen: true }) }}>show history</h1>
                            {showHistory.isOpen &&
                                <div className='inside-history'>
                                    <div>{team.history}</div>
                                    <button onClick={() => { setShowHistory({ isOpen: false }) }}>close</button>
                                </div>
                            }
                        </React.Fragment>
                    </div>
                    <div className='description'>
                        <React.Fragment>
                            <h1 onClick={() => { setShowDescription({ isOpen: true }) }}>show description</h1>
                            {showDescription.isOpen &&
                                <div className='inside-description'>
                                    <h2>Description</h2>
                                    <div>{team.description}</div>
                                    <button onClick={() => { setShowDescription({ isOpen: false }) }}>close</button>
                                </div>
                            }
                        </React.Fragment>
                    </div>
                </div>
                <hr />
                <React.Fragment>
                    <button onClick={() => { setShowComments({ isOpen: true }) }}>show comments</button>
                    {showComments.isOpen &&
                        <div>
                            <CommentsList key={id} obj={id} ct={content_type} /> {/* through redux AllCommentsList */}
                            <button onClick={() => { setShowComments({ isOpen: false }) }}>close</button>
                        </div>
                    }
                </React.Fragment>
                <CommentComponent key={id} obj={id} ct={content_type} /> {/* through redux AllCommentsList */}
                <br />
            </div>
        </div>:<></>}
        </div>

    )
}

export default TeamDetail;



{/* 

 <React.Fragment>
                                    <button onClick={() => { setShowMatches({ isOpen: true }) }}>show all matches</button>
                                    {showMatches.isOpen &&
                                        <div>
                                            {matches.length ? matches.map(e => (
                                                <Link key={e.id} to={`/game/${e.id}`} >
                                                    <div>
                                                        {teams[e.home_team - 1].name} <img className={'game_img'} src={teams[e.home_team - 1].team_logo} />
                                                        vs
                                                        {teams[e.away_team - 1].name} <img className={'game_img'} src={teams[e.away_team - 1].team_logo} />
                                                    </div>
                                                </Link>
                                            )) : <p>no matches</p>
                                            }
                                            <button onClick={() => { setShowMatches({ isOpen: false }) }}>close</button>
                                        </div>
                                    }
                                </React.Fragment>



*/}
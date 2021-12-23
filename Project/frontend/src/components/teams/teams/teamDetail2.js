import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../general/base/AuthContext";
import AddComment from "../../general/comments/addComment";
import CommentsList from "../../general/comments/commentsList";
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticularTeam } from "../../../redux_two/actions/asyncActions/asyncParticularTeam";

function TeamDetail2({ match }) {

    const id = match.params.id;


    const dispatch = useDispatch();
    const queryTeam = useSelector(state => state.particularTeamReducer.team)


    useEffect(() => {
        dispatch(fetchParticularTeam(1))
    }, [1])
    const team = queryTeam[0];

    const [showComments, setShowComments] = useState([{
        isOpen: false
    }])
    const [showPlayers, setShowPlayers] = useState([{
        isOpen: false
    }])

    const content_type = '14';


    return (
        <div>
            {team.length > 0 ? <p>some teams</p> : <p>no team</p>}
            <h1>{team.name} <img src={team.team_logo} width={50} height={50} /></h1>


            <p>games {team.games}</p>
            <p>amount of points {team.points}</p>
            <p>wins {team.wins}</p>
            <p>defeats {team.defeats}</p>
            <p>wins OT {team.wins_ot}</p>
            <p>defeats OT {team.defeats_ot}</p>
            <div style={{ backgroundImage: team.team_logo }}><h1></h1></div>
            {team.team_logo ? <img src={team.team_logo} width={500} height={500} /> : <p>no photo yet</p>}
            <hr />
            <h3>list of players</h3>
            {/*<React.Fragment>
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
</React.Fragment>*/}
            <br />
            <React.Fragment>
                <button onClick={() => { setShowComments({ isOpen: true }) }}>show comments</button>
                {showComments.isOpen &&
                    <div>
                        <CommentsList key={id} obj={id} ct={content_type} />
                        <button onClick={() => { setShowComments({ isOpen: false }) }}>close</button>
                    </div>
                }
            </React.Fragment>
            <AddComment obj={id} ct={content_type} />
            <br />
        </div>

    )
}

export default TeamDetail2;





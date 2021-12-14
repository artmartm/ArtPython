import {useDispatch, useSelector} from 'react-redux';
import { getAllTeams, makeRed, makeBlue, getParticularTeam } from './actions/actions' 
import React  from "react";
import { fetchTeams } from './actions/asyncActions/asynAllTeams';
import { fetchParticularTeam } from './actions/asyncActions/asyncParticularTeam';
import { Link } from 'react-router-dom';
function MainRedux2() {

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamsReducer.teams)
    const color = useSelector(state=> state.colorReducer.color)
    const team = useSelector(state=> state.particularTeamReducer.team)
   

    return(
        <div>
            <h1>redux</h1>
            {team ? 
            <h2 key={team.id}>!!!{team}!!!</h2>
                :
                <p>no team sel</p>
            }
            <hr/>
            {teams.length>0 ?
            <div >
                {teams.map(teamz => 
                    <div key={teamz.id}>
                    <h1><Link to={{ pathname: `/teams/${teamz.id}/`, fromDashboard: false}}>{teamz.name}</Link></h1>
                    <img src={teamz.team_logo} style={{width:350, height:350}}/>
                    </div>
                    )}
            </div>
            :
            <p>no teams</p>
            }
            <button onClick={()=>dispatch(fetchTeams())}>get all teams</button><br/>
            <button style={{ background:color }}>current color is {color}</button>
        </div>
    )
}

export default MainRedux2;

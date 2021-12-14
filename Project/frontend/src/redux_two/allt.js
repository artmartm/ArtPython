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

    const doRed=()=>{
        dispatch(makeRed())
    }

    const doBlue=()=>{
        dispatch(makeBlue())
    }

    return(
        <div>
            <h1>redux</h1>
            {teams.length>0 ?
            <div >
                {teams.map(team => 
                    <div key={team.id}>
                    <h1><Link to={{ pathname: `/teams/${team.id}/`, fromDashboard: false}}>{team.name}</Link></h1>
                    <img src={team.team_logo} style={{width:350, height:350}}/>
                    </div>
                    )}
            </div>
            :
            <p>no teams</p>
            }
            <button onClick={()=>dispatch(fetchTeams())}>get all teams</button><br/>
            <button onClick={()=>dispatch(getParticularTeam(1))}>some teams</button><br/>
            <button onClick={()=>{doRed()}}>red</button><br/>
            <button onClick={()=>{doBlue()}}>blue</button><br/>
            <button style={{ background:color }}>current color is {color}</button>
        </div>
    )
}

export default MainRedux2;

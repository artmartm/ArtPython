import {useDispatch, useSelector} from 'react-redux';
import { getAllTeams } from './actions/actions' 
import React  from "react";
import { fetchTeams } from './actions/asyncActions/asynAllTeams';
function MainRedux2() {

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamsReducer.teams)


    return(
        <div>
            <h1>redux</h1>
            {teams.length>0 ?
            <div >
                {teams.map(team => 
                    <h1 key={team.id}>{team.name}</h1>)}
            </div>
            :
            <p>no teams</p>
            }
            <button onClick={()=>dispatch(fetchTeams())}>get all teams</button>
        </div>
    )
}

export default MainRedux2;

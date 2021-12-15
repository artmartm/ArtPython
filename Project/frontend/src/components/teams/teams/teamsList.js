import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
const TeamsList=()=> {

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamsReducer.teams)


    return(
        <div>
            <h1>list of teams</h1>
            <hr/>
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
        </div>
    )
}
export default TeamsList;





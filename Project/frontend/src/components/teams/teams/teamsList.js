import {useDispatch, useSelector} from 'react-redux';
import React, { useState } from 'react';
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
                    <h1>{team.name}</h1>
                    <h2>{team.second_name}</h2>
                    <h1><Link to={{ pathname: `/teams/${team.id}/`, fromDashboard: false}}><img src={team.team_logo} style={{width:350, height:350}}/></Link></h1>
                    <hr style={{width:250}}/>
                    {/*<h1><Link to={{ pathname: `/teams2/${team.id}/`, fromDashboard: false}}>{team.name}2</Link></h1>*/}
                    </div>                    
                    )}
            </div>
            : <p>no teams</p>
            }
        </div>
    )
}
export default TeamsList;




{/*                        <React.Fragment>
                        <h2 onClick={()=>{setInfo({isOpen:true})}}>{team.name}</h2>        
                        {info.isOpen &&
                        <div>
                            <h2>{team.second_name}</h2>       
                            <Link to={{ pathname: `/teams/${team.id}/`, fromDashboard: false}}><img src={team.team_logo} style={{width:350, height:350}}/></Link><br/>
                            <button onClick={()=>{setInfo({isOpen:false})}}>close info</button>
                        </div>
                        }
                    </React.Fragment>*/}
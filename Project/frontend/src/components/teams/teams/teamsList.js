import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../../../css/teams/teamList.css'
import Loader from '../../general/loader';
const TeamsList = () => {

    const teams = useSelector(state => state.teamsReducer.teams)

    return (
        <div>
            <h1>list of teams</h1>
            <hr className="for-hr" />
            {teams.length > 0 ?
                <div >
                    {teams.map(team =>
                        <div key={team.id}>
                            <h1>{team.name} </h1>
                            <h1 className='for-h1'>{team.second_name}</h1>
                            <h1>
                                <Link to={{ pathname: `/teams/${team.id}/`, fromDashboard: false }}>
                                    <img className={'team_img'} src={team.team_logo} />
                                </Link>
                            </h1>
                            <hr style={{ width: 250 }} />
                            {/*<h1><Link to={{ pathname: `/teams2/${team.id}/`, fromDashboard: false}}>{team.name}2</Link></h1>*/}
                        </div>
                    )}
                </div>
                : <Loader/>
            }
        </div>
    )
}
export default TeamsList;
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
const LeaguesList=()=> {

    const dispatch = useDispatch();
    const leagues = useSelector(state => state.leaguesReducer.leagues)


    return(
        <div>
            <h1>list of leagues</h1>
            <hr/>
            {leagues.length>0 ?
            <div >
                {leagues.map(league => 
                    <div key={league.id}>
                    <h1><Link to={{ pathname: `/leagues/${league.id}/`, fromDashboard: false}}>{league.name}</Link></h1>
                    </div>
                    )}
            </div>
            :
            <p>no leagues</p>
            }
        </div>
    )
}
export default LeaguesList;





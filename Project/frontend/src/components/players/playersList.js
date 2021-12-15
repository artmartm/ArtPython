import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
const PlayersList=()=> {

    const dispatch = useDispatch();
    const players = useSelector(state => state.playersReducer.players)


    return(
        <div>
            <h1>list of players</h1>
            <hr/>
            {players.length>0 ?
            <div >
                {players.map(player => 
                    <div key={player.id}>
                    <h1><Link to={{ pathname: `/players/${player.id}/`, fromDashboard: false}}>{player.name}</Link></h1>
                    </div>
                    )}
            </div>
            :
            <p>no players</p>
            }
        </div>
    )
}
export default PlayersList;





import {useDispatch, useSelector} from 'react-redux';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../../css/players/playersList.css'


const PlayersList=()=> {

    const[filterPlayers,setFilterPlayers]=useState([])
    const [search, setSearch] = useState(false);
    const dispatch = useDispatch();
    const players = useSelector(state => state.playersReducer.players)

        let GetFilterPlayers = async(position) =>{
            let response = await fetch(`http://127.0.0.1:8000/api/players/?search=${position}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                }
            })
            let data = await response.json()
                setFilterPlayers(data)
                setSearch(true)
            }
        let ThrowSearch=()=>{
            setSearch(false)
        }

    return(
        <div>
            <h1>list of players</h1>
            <hr/>
            {search ? <div>
                {filterPlayers.map
                    (e=>
                        <h1 className='h'>
                            <Link className='link' 
                                to={{ pathname: `/players/${e.id}/`, 
                                    fromDashboard: false}}>{
                                        e.name}
                            </Link>
                        </h1>
                    )}
                <button onClick={()=>{ThrowSearch()}}>throw search</button>
            </div>
            :
            <div>
                <button onClick={()=>GetFilterPlayers(prompt())}>search</button>
                {players.length>0 ?
            <div >
                {players.map(player => 
                    <div key={player.id}>
                    <h1 className='h'><Link className='link' to={{ pathname: `/players/${player.id}/`, fromDashboard: false}}>{player.name}</Link></h1>
                    </div>
                    )}
            </div>
            :
            <p>no players</p>}
            </div>
            }
        </div>
    )
}
export default PlayersList;





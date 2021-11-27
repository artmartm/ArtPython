import React, { useEffect, useState } from "react";
import axios from "axios";
import Model from "./Model";
import './Model.css'


function PostDetail({ match }) {
    const[team, setTeam] = useState([])
    const [player, setPlayer] = useState({})
    const id = match.params.id
    const[state, setState] = useState([{
        isOpen:false
    }])
    useEffect( () => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/api/players/${id}/`
        }).then(response => {
            setPlayer(response.data)
            setTeam(response.data.current_team)
    })
}, [id])

    return (
        
        <div>
            <h1>{player.name}</h1><hr/>
            <React.Fragment>
                <button onClick={()=>setState({isOpen:true})}>player info</button>
                {state.isOpen &&
                <div className='modal'>
                    <div className='modal-body'>
                        <h2>{player.name}'s info</h2>
                        <h3>{player.score}</h3>
                        <h3>{player.weight}</h3>
                        <h3>{player.height}</h3>
                        <h3>{player.country}</h3>
                        <button onClick={()=>setState({isOpen:false})}>close</button>
                    </div>
                </div>}
            </React.Fragment>
        </div>
    )

}

export default PostDetail;


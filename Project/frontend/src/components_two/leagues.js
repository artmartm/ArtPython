import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Model.css';
import {Link} from 'react-router-dom';
function Leagues() {

    const [leagues, setLeagues] = useState([]);
        //const [players, setPlayers] = useState([])
        const[state, setState] = useState([{
            isOpen:false
        }])

    useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/leagues/",
            mode: "no-cors"
        }).then(response => {
            setLeagues(response.data)
        })
    },[])
    return(
        <div>
            <h1>Leagues page</h1>
            <h2>country</h2>
                <hr/>
                <React.Fragment>
                    <button onClick={()=>{setState({isOpen:true})}}>show leagues</button>        
                {state.isOpen && <div>       
                {leagues.map(item => (
                    <div>
                    <h1 key={item.id}>
                        <Link to={{ pathname: `/leagues/${item.id}/`, fromDashboard: false}}>
                            {item.name}<br/>
                        </Link>
                    </h1>
                    </div>
                    
                    ))}
                                    <button onClick={()=>{setState({isOpen:false})}}>close leagues</button>

                </div>
                }
                </React.Fragment>

            </div>
    )
}

export default Leagues;
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
//import '../../Model.css';
import {useDispatch, useSelector} from 'react-redux';

import {Link} from 'react-router-dom';
import TeamLogo from '../teams/teamsLogo';
import AddGame from './addGame';
import AuthContext from '../../general/base/AuthContext';
function Games() {
    
    const styles = {
        im:{
            width:75,
            height:75,
            borderRadius:37,
            margin:25,
            padding:1

        },
        h:{
            margin:20,
        }
    }

    const [games, setGames] = useState([]);
    let {authTokens} = useContext(AuthContext)

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamsReducer.teams)
    
    useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/games/",
            mode: "no-cors"
        }).then(response => {
            setGames(response.data)
        })
    },[])
    return(
        <div>
            <h1>Games page</h1>
            <hr/>      
                {games.map(item => (
                    <div>
                    <p key={item.id}>
                        <Link to={{ pathname: `/game/${item.id}/`, fromDashboard: false}}>
                            <div style={{ display:'inline-block' }}>
                            <h3 style={styles.h}>{teams[item.home_team-1].name} <img src={teams[item.home_team-1].team_logo} style={styles.im} /> 
                            vs  
                            <img src={teams[item.away_team-1].team_logo} style={styles.im} /> 
                              {teams[item.away_team-1].name}
                            </h3>
                              {/*}  <TeamLogo id={item.home_team}/> vs <TeamLogo id={item.away_team}/> */}
                            </div>
                        </Link>
                    </p>
                    <hr/>
                    </div>
                    ))}
                {authTokens ?
                <AddGame/>
                :
                <p>to add a game you need to be <Link to={'/login'}>logged-in</Link></p>}
                </div>)
                }

export default Games;


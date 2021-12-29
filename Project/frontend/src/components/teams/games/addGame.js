import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './../../../css/teams/addGame.css';
import Loader from '../../general/loader';
import { Button } from "@mui/material";


const AddGame = () => {

  let history = useHistory();

  const [loading, setLoading] = useState(true);

  const [home_team, setHome_team] = useState('')
  const [away_team, setAway_team] = useState('')
  const teams = useSelector(state => state.teamsReducer.teams)
  const [team, setTeam] = useState([]);


  const Add = async () => {
    let formField = new FormData()
    formField.append('home_team', home_team)
    formField.append('away_team', away_team)
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/games/',
      data: formField
    }).then(response => {
      console.log(response.data);
      history.push('/tournament')
      setLoading(false)
    }, 2000)
  }


  const Refresh = async () => {
    setHome_team('')
    setAway_team('')
  }

  return (
    <div >
      <h2 >add a game</h2>
      {/* <div className='add-game-container'>  */}
      <div className='add-game-container'>
        <div className='add-game-1'>
          {/*  {loading && <Loader />} */}
          <label >
            <div >{home_team ?
              <img className='image-container-2' src={teams[home_team - 1].team_logo} />
              :
              <select value={home_team} onChange={(e) => setHome_team(e.target.value)}>
                <option>home team</option>
                {teams.map(e => (
                  <option value={e.id}>{e.name}</option>
                )
                )}
              </select>} </div>


          </label>
        </div>
        <div className='add-game-1'>
          <label >
            <div >{away_team ?
              <img src={teams[away_team - 1].team_logo} className='image-container-2' />
              :
              <select value={away_team} onChange={(e) => setAway_team(e.target.value)}>
                <option>away team</option>

                {teams.map(e => (
                  <option value={e.id} >{e.name}</option>
                )
                )}
              </select>} </div>


          </label>
        </div>
      </div>
      <div className='add-game-buttons'>
        <Button
          onClick={Add}>VS</Button>
        <Button
          onClick={Refresh}>refresh</Button>
      </div>
    </div>
  );
};

export default AddGame;


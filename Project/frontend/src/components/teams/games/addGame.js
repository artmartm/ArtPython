import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './../../../css/teams/addGame.css';
import Loader from '../../general/loader';


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


  return (
    <div className="container">
      <div>

      </div>
      <h2 className="text-center mb-4">add a game</h2>
      <div className="form-group">
        {loading && <Loader />}
        <label>
          <div>{home_team ?
            <img className='home_team_ceil' src={teams[home_team - 1].team_logo} />
            :
            <select className='home_team_ceil' value={home_team} onChange={(e) => setHome_team(e.target.value)}>
              {teams.map(e => (
                <option value={e.id}>{e.name}</option>
              )
              )}
            </select>} </div>


        </label>
      </div>
      <div className="form-group">
        <label>
          <div>{away_team ?
            <img src={teams[away_team - 1].team_logo} className='away_team_ceil' />
            :
            <select className='away_team_ceil' value={away_team} onChange={(e) => setAway_team(e.target.value)}>
              {teams.map(e => (
                <option value={e.id}>{e.name}</option>
              )
              )}
            </select>} </div>


        </label>
      </div>
      <button className="vs"
        onClick={Add}>VS</button>
    </div>
  );
};

export default AddGame;


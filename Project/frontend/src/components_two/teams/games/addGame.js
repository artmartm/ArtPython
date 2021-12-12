import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";



const AddGame = () => {

    let history = useHistory();

    const [home_team, setHome_team] = useState('')
    const [away_team, setAway_team] = useState('')
    


    const Add = async () => {
        let formField = new FormData()
        formField.append('home_team',home_team)
        formField.append('away_team',away_team)
        await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/api/games/',
          data: formField
        }).then(response=>{
          console.log(response.data);
          history.push('/')
        })
    }
   
    return (
        <div className="container">
            <div className="container">
              <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">login</h2>
                  <div className="form-group">
                    </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="home team"
                          name="home_team"
                          value={home_team}
                          onChange={(e) => setHome_team(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="away team"
                          name="away_team"
                          value={away_team}
                          onChange={(e) => setAway_team(e.target.value)}
                        />
                      </div>
                 <button className="btn btn-primary btn-block" 
                 onClick={Add}>add a game</button>       
              </div>
            </div>
        </div>
    );
};

export default AddGame;

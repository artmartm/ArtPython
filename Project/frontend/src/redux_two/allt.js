import {useDispatch, useSelector} from 'react-redux';
import { getAllTeams, makeRed, makeBlue, getParticularTeam } from './actions/actions' 
import React, {useEffect}  from "react";
import { fetchTeams } from './actions/asyncActions/asynAllTeams';
import { fetchParticularTeam } from './actions/asyncActions/asyncParticularTeam';
import { Link } from 'react-router-dom';

function MainRedux2() {

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamsReducer.teams)
    const color = useSelector(state=> state.colorReducer.color)
  
    function getSome(number) {
        dispatch(getParticularTeam(number))
    }
 {/*}   const addCust=(name) => {
        const customer ={
            name,
            id: Date.now()
        }
        dispatch(addCustomer(customer))
    }

    const delCust=(customer) => {
 
        dispatch(deleteCustomer(customer))
    } 

    const addT=(team) => {
        dispatch(addTeam(team))
    }
*/}

    return(
        <div>
            <h1>redux</h1>
            <hr/>
            <button onClick={()=>getSome(prompt())}>get some team</button>
            {teams.lenght>0 ?
            teams.map(e=>{
                <p>{e.name}</p>
            })
            :
            <p>no teams</p>
            }
            {/*{teams.length>0 ?
            <div >
                {teams.map(teamz => 
                    <div key={teamz.id}>
                    <h1><Link to={{ pathname: `/teams/${teamz.id}/`, fromDashboard: false}}>{teamz.name}</Link></h1>
                    <img src={teamz.team_logo} style={{width:350, height:350}}/>
                    </div>
                    )}
            </div>
            :
            <p>no teams</p>
            }*/}
            <button style={{ background:color }}>current color is {color}</button>
        </div>
    )
}

export default MainRedux2;

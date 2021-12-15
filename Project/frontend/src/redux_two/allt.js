import {useDispatch, useSelector} from 'react-redux';
import { makeRed, makeBlue, getParticularTeam } from './actions/actions' 
import React, {useEffect}  from "react";
import { Link } from 'react-router-dom';

function MainRedux2() {

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamsReducer.teams)
    const color = useSelector(state=> state.colorReducer.color)
  
    function getSome(number) {
        dispatch(getParticularTeam(number))
    }


    function doRed(){
        dispatch(makeRed())
    }

    function doBlue(){
        dispatch(makeBlue())
    }
    return(
        <div>
            <h1>redux</h1>
            <button onClick={()=>{getSome(0)}}>get</button>
            <hr/>
            {teams ? <p>{teams.name}</p> : <p>no teams</p>}
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
            <button onClick={()=>doRed()}>red</button>
            <button style={{ background:color }}>current color is {color}</button>
            <button onClick={()=>doBlue()}>blue</button>
        </div>
    )
}

export default MainRedux2;

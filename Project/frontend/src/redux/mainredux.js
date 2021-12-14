import Comments from './comments';
import Likes from './likes';
import TeamListRed from './teams';
import Title from './title';
import Color from './color';
import {useDispatch, useSelector} from 'react-redux';
import { addCustomer, addTeam, deleteCustomer } from './redux/action';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
function MainRedux() {

    const dispatch = useDispatch();
    const customers = useSelector(state => state.customerReducer.customers)
    const teams = useSelector(state => state.addTeamReducer.teams)

    const addCust=(name) => {
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



    return(
        <div>
            <h1>redux</h1>
            <Likes />
            <Title />
            <Comments/>
            <TeamListRed id={0}/>
            <Color />
            <button onClick={()=>addCust(prompt())}>add cust</button>

            {customers.length>0 ?
            <div >
                {customers.map(customer => 
                    <h1 onClick={()=>delCust(customer)}>{customer.name}</h1>)}
            </div>
            :
            <p>no clients</p>
            }
            <button onClick={()=>addT(prompt())}>add team</button>
            {teams.length>0 ?
            <h1>a lot of teams</h1>
            :
            <p>no teams yet</p>}
        </div>
    )
}

export default MainRedux;

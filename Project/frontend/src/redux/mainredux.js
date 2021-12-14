import Comments from './comments';
import Likes from './likes';
import Title from './title';
import Color from './color';
import {useDispatch, useSelector} from 'react-redux';
import { addCustomer, addTeam, deleteCustomer } from './redux/action';
import React, {useState, useEffect, useContext} from "react";
import { fetchCustomers } from './asyncAdctions/customers';
function MainRedux() {

    const dispatch = useDispatch();
    const customers = useSelector(state => state.customerReducer.customers)

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

            <button onClick={()=>dispatch(fetchCustomers(prompt()))}>get all clients</button>
        </div>
    )
}

export default MainRedux;

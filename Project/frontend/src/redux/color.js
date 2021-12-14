import React from 'react';
import {connect} from 'react-redux';
import { makeBlue, makeGreen, makeRed } from './redux/action';

function Color(props) {
    return(
        <div>
            <button onClick={()=>props.onRed()}>RED</button>
            <button onClick={()=>props.onBlue()}>BLUE</button>
            <button onClick={()=>props.onGreen()}>GREEN</button>
            <p style={{background:props.color, width:50 }}>{props.color}</p>

        </div>
    )
}

function mapStateToProps(state) {
    const {colorReducer} = state;
    return {
        color: colorReducer.color
    }
}

function matchDispatchToProps(dispatch) {
    return {
        onBlue:()=>{
            return dispatch(makeBlue())
        },
        onGreen:()=>{
            return dispatch(makeGreen())
        },
        onRed:()=>{
            return dispatch(makeRed())
        }
    }
}


export default connect(mapStateToProps, matchDispatchToProps) (Color);
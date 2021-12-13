import React from 'react';
import {connect} from 'react-redux';
import { makeBlue, makeGreen } from './redux/action';

function Color(props) {
    return(
        <div>
            <button onClick={()=>props.onGreen()}>GREEN</button>
            <>{props.color}</>
            <button onClick={()=>props.onBlue()}>blue</button>
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
        }
    }
}


export default connect(mapStateToProps, matchDispatchToProps) (Color);
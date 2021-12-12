import React from 'react';
import {connect} from 'react-redux';
import { decrementLikes, incrementLikes } from './redux/action';

function Likes(props) {
    return(
        <div>
            <button onClick={()=>props.onIncrementLikes()}>like</button>
            <>{props.likes}</>
            <button onClick={()=>props.onDecrementLikes()}>dislike</button>
        </div>
    )
}

function mapStateToProps(state) {
    console.log('mapstate', state)
    const {likeReducer} = state;
    return {
        likes: likeReducer.likes
    }
}

function matchDispatchToProps(dispatch) {
    return {
        onIncrementLikes:()=>{
            return dispatch(incrementLikes())
        },
        onDecrementLikes:()=>{
            return dispatch(decrementLikes())
        }
    }
}


export default connect(mapStateToProps, matchDispatchToProps) (Likes);
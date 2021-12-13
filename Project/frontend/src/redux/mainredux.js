import React from 'react';
import Comments from './comments';
import Likes from './likes';
import TeamListRed from './teams';
import Title from './title';

function MainRedux() {
    return(
        <div>
            <h1>redux</h1>
            <Likes />
            <Title />
            <Comments/>
            <TeamListRed id={0}/>
        </div>
    )
}

export default MainRedux;
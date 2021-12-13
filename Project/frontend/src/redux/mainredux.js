import React from 'react';
import Comments from './comments';
import Likes from './likes';
import TeamListRed from './teams';
import Title from './title';
import Color from './color';

function MainRedux() {
    return(
        <div>
            <h1>redux</h1>
            <Likes />
            <Title />
            <Comments/>
            <TeamListRed id={0}/>
            <Color />
        </div>
    )
}

export default MainRedux;
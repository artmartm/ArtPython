import React from 'react';
import Comments from './comments';
import Likes from './likes';
import Title from './title';

function MainRedux() {
    return(
        <div>
            <h1>redux</h1>
            <Likes />
            <Title />
            <Comments/>
        </div>
    )
}

export default MainRedux;
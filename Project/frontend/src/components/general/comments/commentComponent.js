import React, { useContext, useState } from 'react';
import AuthContext from '../base/AuthContext';
import AddComment from './addComment';
import { Link } from 'react-router-dom';




function CommentComponent({ obj, ct }) {

  let { user, authTokens } = useContext(AuthContext)

  return (
    <div>
      {authTokens ?
        <AddComment obj={obj} ct={ct} />
        :
        <p>to add a comment you need to be <Link to={'/login'}>logged-in</Link></p>}
    </div>
  );
};

export default CommentComponent;
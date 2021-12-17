import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchParticularUser } from "../../../redux_two/actions/asyncActions/asyncParticularUser";
import AuthContext from "../base/AuthContext";


function CommentDetail({ match }) {
    const[state, setState] = useState([{
        isOpen:false
    }])
    let {user,authTokens} = useContext(AuthContext)
    const[comment, setComment] = useState({});
    //const[team,setTeam] = useState([]);
    const id = match.params.id;
    //const ct = '18';
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchParticularUser())
    }, []) 

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/comments/${id}`,
        }).then(response=>{
            setComment(response.data)
        })
    },[id])

    const [name, setName] = useState('')
    const [content_type, setContent_type] = useState(comment.content_type)
    const [object_id, setObject_id] = useState(comment.object_id)
    const [author, setAuthor] = useState(comment.author)

    const Add = async () => {
        let formField = new FormData()
        formField.append('name',name)
        formField.append('content_type',content_type)
        formField.append('object_id',object_id)
        formField.append('author',author)


        await axios({
          method: 'post',
          url:`http://127.0.0.1:8000/api/comments/${id}`,
          data: formField
        }).then(response=>{
          console.log(response.data);
        })
    }

    return(
        <div>
            <h1>{comment.name}</h1>
            <h2>author is {comment.author}</h2>
            <h3>created at {comment.created_at}</h3>
            <div>
            <hr/>    
        <div className="container">
            <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        {true && user ?
        <h2 className="text-center mb-4">add a comments !{user.user_id}!</h2> : <p>asdasdasd</p>}
        <div className="form-group">
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
         
          <button className="btn btn-primary btn-block" onClick={Add}>add comment</button>
       
      </div>
    </div>
        </div>
      </div>
        </div>
    )
}

export default CommentDetail;


{/*
        formField.append('name',name)
        formField.append('name',name)
        formField.append('name',name)
        formField.append('content_type',content_type)
        formField.append('object_id',object_id)
        formField.append('author',author)
*/}
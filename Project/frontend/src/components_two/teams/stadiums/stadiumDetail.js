import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AddComment from "../../general/comments/addComment";
import CommentsList from "../../general/comments/commentsList";
import TeamLogo from "../teams/teamsLogo";

function StadiumDetail({ match }) {
    const[showComments, setShowComments] = useState([{
        isOpen:false
    }])
    const[stadium, setStadium] = useState({});
    const content_type = '16';
    const id = match.params.id;

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/stadiums/${id}`,
        }).then(response=>{
            setStadium(response.data)
        })
    },[id])


    return(
        <div>
            <h1>{stadium.name}</h1>
    
            <Link  style={{textDecoration: 'none'}} 
                key={stadium.team} 
                to={`/teams/${stadium.team}`}>
                <TeamLogo id={stadium.team}/>
            </Link>
            <React.Fragment>
                <button onClick={()=>{setShowComments({isOpen:true})}}>show comments</button>        
                    {showComments.isOpen && 
                        <div>       
                            <CommentsList key={id}  obj={id} ct={content_type}/>
                            <button onClick={()=>{setShowComments({isOpen:false})}}>close</button>
                        </div>
                    }
            </React.Fragment>
                <AddComment obj={id} ct={content_type}/>
            <br/>
        </div>
    )
}

export default StadiumDetail;

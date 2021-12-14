import { rgbToHex } from "@material-ui/core";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AddComment from "../general/comments/addComment";
import CommentsList from "../general/comments/commentsList";
import TeamLogo from "../teams/teams/teamsLogo";
import PlayerMainInfo from "./playerMainInfo";
import PlayerPersonalInfo from "./playerPersonalInfo";

const styles = {
    img:{
        width:150,
        height:150,
        borderRadius:75,
        background:'blue',
        border:'2px',
        padding: '2px'
    },
    div:{
        backgroundColor:'#c76f6f'
    },
    p:{
        backgroundColor:'yellow',
    }
}

function PlayerDetail({ match }) {
    const[showComments, setShowComments] = useState([{
        isOpen:false
    }])
    const[showPersonalInfo, setShowPersonalInfo] = useState([{
        isOpen:false
    }])    
    const[showMainInfo, setShowMainInfo] = useState([{
        isOpen:false
    }])

    const[player, setPlayer] = useState({});
    const id = match.params.id;
    const content_type = '18';

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/players/${id}`,
        }).then(response=>{
            setPlayer(response.data)
        })
    },[id])
    //style={{marginTop:'250px'}}
    return(
        <div className='player_div' style={{backgroundImage: `url(${player.background})`, position:'center', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}> 
            <div >  
            <h1>{player.name} page</h1>
            <img src={player.image} style={styles.img}/>
            <h3>position is {player.position}</h3>
            <h3>current team is <Link 
                style={{textDecoration: 'none'}} 
                key={player.team} 
                to={`/teams/${player.team}`}>
                <p style={{marginBottom:'250px'}}><TeamLogo id={'1'}/></p> {/*{player.team}*/}
            </Link>
            </h3>
            <hr/>
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
            <React.Fragment>
                <button onClick={()=>{setShowPersonalInfo({isOpen:true})}}>show personal info</button>        
                    {showPersonalInfo.isOpen && 
                        <div>       
                            <PlayerPersonalInfo obj={player.id} />
                            <button onClick={()=>{setShowPersonalInfo({isOpen:false})}}>close</button>
                        </div>
                    }
            </React.Fragment>
            <React.Fragment>
                <button onClick={()=>{setShowMainInfo({isOpen:true})}}>show main info</button>        
                    {showMainInfo.isOpen && 
                        <div>       
                            <PlayerMainInfo obj={player.id} />
                            <button onClick={()=>{setShowMainInfo({isOpen:false})}}>close</button>
                        </div>
                    }
            </React.Fragment>
            </div>
        </div>
    )
}

export default PlayerDetail;

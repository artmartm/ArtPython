import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddComment from "../../general/comments/addComment";
import CommentsList from "../../general/comments/commentsList";
import './../../../css/teams/stadium.css';

function StadiumDetail({ match }) {
    const [showComments, setShowComments] = useState([{
        isOpen: false
    }])
    const [mainImage, setMainImage] = useState([{
        isOpen: false
    }])
    const [stadium, setStadium] = useState({});
    const content_type = '16';
    const id = match.params.id;
    const teams = useSelector(state => state.teamsReducer.teams)

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/stadiums/${id}`,
        }).then(response => {
            setStadium(response.data)
        })
    }, [id])

    const a = { opacity: 1 }

    return (
        <div>
            <div>
                {teams.length > 0 && stadium.team ?
                    <div style={{ backgroundImage: `url(${stadium.background})` }}>
                        <div className='main-stadium-div' >
                            <div>
                                <h1 className='name-container'>{stadium.name}</h1>
                                <div>
                                    <div>
                                        <h2 style={{ fontSize: '50pt' }}>home stadium of </h2>
                                        <Link
                                            key={teams[stadium.team - 1].id}
                                            to={`/teams/${teams[stadium.team - 1].id}`}>
                                            <img src={teams[stadium.team - 1].team_logo}
                                                className='stadium_main_img' />
                                        </Link>
                                        <ol>
                                            <li>max capacity is {stadium.max_capacity}</li>
                                            <li>average attendence {stadium.avg_attendence}</li>
                                        </ol>
                                    </div>
                                </div>
                                <React.Fragment>
                                    <button onClick={() => { setMainImage({ isOpen: true }) }}>show main image</button>
                                    {mainImage.isOpen &&
                                        <div>
                                            <br />
                                            <img src={stadium.image} className='nested-stadium-image'/><br />
                                            <button onClick={() => { setMainImage({ isOpen: false }) }}>close</button>
                                        </div>
                                    }
                                </React.Fragment>
                                <hr style={{ width: '100vh' }} />

                                <h2>Additional info</h2>
                                <div className='player-additional-info '>
                                    <div className='history'>
                                        <div className='inside-history'>
                                            <h2>history</h2>
                                            <h3>{stadium.history}</h3>
                                        </div>
                                    </div>
                                    <div className='description'>
                                        <div className='inside-description'>
                                            <h2>description</h2>
                                            <h3>{stadium.description}</h3>
                                        </div>
                                    </div>
                                </div>
                                <Link style={{ textDecoration: 'none' }}
                                    key={stadium.team}
                                    to={`/teams/${stadium.team}`}>
                                </Link>
                                <React.Fragment>
                                    <button onClick={() => { setShowComments({ isOpen: true }) }}>show comments</button>
                                    {showComments.isOpen &&
                                        <div>
                                            <CommentsList key={id} obj={id} ct={content_type} />
                                            <button onClick={() => { setShowComments({ isOpen: false }) }}>close</button>
                                        </div>
                                    }
                                </React.Fragment>
                                <AddComment obj={id} ct={content_type} />
                                <br />
                            </div>
                        </div>
                    </div>
                    : <></>}
            </div>
        </div>
    )
}

export default StadiumDetail;

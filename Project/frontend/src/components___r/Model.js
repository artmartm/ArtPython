import React, { useState, useEffect } from "react";
import axios from "axios";
import './Model.css'
function Model() {
    const[state, setState] = useState([{
        isOpen:false
    }])
    const [player, setPlayer] = useState({})
    //const id = match.params.id

    useEffect( () => {
    axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/players/`
    }).then(response => {
        setPlayer(response.data)
    })
    }, [])

        return(
            <React.Fragment>
                <button onClick={()=>setState({isOpen:true})}>player info</button>
                {state.isOpen &&
                <div className='modal'>
                    <div className='modal-body'>
                        <h1>just a model</h1>
                        <p>model</p>
                        <button onClick={()=>setState({isOpen:false})}>close</button>
                    </div>
                </div>}
            </React.Fragment>
        )
    
}

export default Model;


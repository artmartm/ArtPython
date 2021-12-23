import React from "react";
import PlayersTable from "./playersTable";
import './../teams/tournament/simple.css';


function PlTable(){
    return(
        <div className='mm_cl'>
            <h1>players</h1>
            <PlayersTable />
        </div>
    )
}

export default PlTable;
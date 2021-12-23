import React from "react";
import TablePlayers from "./playersTable";
import { TableGrid } from "./table";
import TableTeams from "./teamTable";
import Another from "./another";
import './simple.css';
import TeamTable from "./teamTable";

function Tournament(){
    return(
        <div className='mm_cl'>
            <h1>tournament table</h1>
            <TeamTable />
{/*             <TablePlayers />
 */}        </div>
    )
}

export default Tournament;
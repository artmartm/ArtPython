import React from "react";
import TablePlayers from "./playersTable";
import { TableGrid } from "./table";
import TableTeams from "./table2";
import Another from "./another";
import './simple.css';
import Table2 from "./table2";

function Tournament(){
    return(
        <div className='mm_cl'>
            <h1>tournament table</h1>
            <Table2 />
{/*             <TablePlayers />
 */}        </div>
    )
}

export default Tournament;
import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './../../../css/players/player-team-tables.css';
import Loader from '../../general/loader';

const TeamTable = () => {
    const [rowData, setRowData] = useState([]);
    const teams = useSelector(state => state.teamsReducer.teams)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/teams/')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);


    const defaultColDef = {
        sortable: true, editable: true, filter: true, floatingFilter: true, flex: 1
    }

    const columnDefs = [
        {
            headerName: "name", field: "name",
        },
        {
            headerName: "logo", field: "id", cellRendererFramework: (params) => <div>
                {params ?
                    <Link key={params}
                        to={`/teams/${params.value}`}>
                        <img src={teams[params.value - 1].team_logo}
                            className="for-tournament-logo" />
                    </Link>
                    : <></>}
            </div>
        },
        { headerName: "games", field: "games" },
        { headerName: "scored", field: "goals_scored" },
        { headerName: "missed", field: "goals_missed" },
        { headerName: "difference", field: "goals_difference", cellClass: (params) => (params.value > 0 ? "positive" : params.value < 0 ? "negative" : "no-games") },
        { headerName: 'points', field: 'points', cellClass: () => ("main-column") },
        { headerName: 'wins', field: 'wins' },
        { headerName: "wins_ot", field: "wins_ot" },
        { headerName: "gefeats", field: "defeats" },
        { headerName: "defeats_ot", field: "defeats_ot" },
        {
            headerName: "wins %", field: "percentage_of_wins", cellRendererFramework: (params) => <div>
                {params.value}%
            </div>
        },
    ]

    const rowSelectionType = 'single'


    return (
        <div className='mm_cl'>
            <h1>tournament table</h1>
            {teams.length>0 ?
            <div className="ag-theme-alpine" style={{ width: 1500, height: 400 }}>
                <AgGridReact
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    enableBrowserTooltips={true}
                    rowSelection={rowSelectionType}
                    pagination={true}
                    paginationAutoPageSize={true}>
                </AgGridReact>
            </div >
            :<Loader/>}
        </div>
    );
};

export default TeamTable;

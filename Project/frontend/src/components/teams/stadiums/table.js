import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './../../../css/players/player-team-tables.css';

const StadiumTable = () => {
    const [rowData, setRowData] = useState([]);
    const teams = useSelector(state => state.teamsReducer.teams)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/stadiums/')
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
        { headerName: "amount of games", field: "games" },
        { headerName: "max_capacity", field: "max_capacity" },
        { headerName: "avg_attendence", field: "avg_attendence" },
        { headerName: "percentage", field: "percentage" },
    ]

    const rowSelectionType = 'single'


    return (
        <div>
            {teams.length > 0 ?
                <div className='mm_cl'>
                    <h1>stadiums</h1>
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
                </div> : <></>}
        </div>
    );
};

export default StadiumTable;

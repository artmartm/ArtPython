import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './../teams/tournament/simple.css';


const PlayersTable = () => {
    const [rowData, setRowData] = useState([]);

    
    const teams = useSelector(state => state.teamsReducer.teams)
    const players = useSelector(state => state.playersReducer.players)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/players/')
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
            headerName: "name", field: "id", cellRendererFramework: (params) => <div>
            {params.value ?
                <div>
                    {players.map(e =>
                    (<div>
                        {e.id == params.value ?
                            <Link className='link'
                                to={`/players/${params.value}`}>
                                <img src={e.image} className='for-player-tournament-logo' />
                            </Link>
                            : <></>}
                    </div>))}
                </div>
                : <></>}
        </div>, cellClass: () => ("main-column")

        },
        {
            headerName: "logo", field: "team", cellRendererFramework: (params) => <div>
                {params.value && teams.length > 0 ?
                    <Link to={`/teams/${params.value}`}>
                        <img src={teams[params.value - 1].team_logo}
                            className="for-tournament-logo" /></Link>
                    : <></>}
            </div>
        },
        { headerName: "Score", field: "score" },
        { headerName: "Shoots", field: "shoots" },
        { headerName: "Position", field: "position" },

        { headerName: "Country", field: "country" },


    ]

    const rowSelectionType = 'single'


    return (
        <div className='mm_cl'>
            <h1>players</h1>
            <div className="ag-theme-alpine" style={{ width: 1500, height: 700 }}>
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
        </div>
    );
};

export default PlayersTable;

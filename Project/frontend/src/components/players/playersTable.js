import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './../teams/tournament/simple.css';


const PlayersTable = () => {
    const [rowData, setRowData] = useState([]);
    //const teams = useSelector(state => state.teamsReducer.teams)
    // const [players, setPlayers] = useState([]);
    const teams = useSelector(state => state.teamsReducer.teams)
    const players = useSelector(state => state.playersReducer.players)

    const styles = {
        mini_img: {
            width: 40,
            height: 40,
            borderRadius: 20
        }
    }

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
            headerName: "id", field: "id",
            cellRendererFramework: (params) =>
                <div>
                    {params.value ?
                        <div>
                            {players.map(e =>
                            (<div>
                                {e.id == params.value ?
                                    <Link className='link'
                                        to={`/players/${params.value}`}>
                                        {e.name}
                                    </Link>
                                    : <></>}
                            </div>))}
                        </div>
                        : <></>}
                </div>,cellClass: () => ("main-column")
        },
        {
            headerName: "name", field: "image", cellRendererFramework: (params) => <div>
                {params.value && teams.length > 0 > 0 ?
                    <img src={params.value} style={{ width: 40 }} />
                    : <></>}
            </div>,cellClass: () => ("more100")
            
        },
        {
            headerName: "logo", field: "team", cellRendererFramework: (params) => <div>
                {params.value && teams.length > 0 ?
                    <Link to={`/teams/${params.value}`}>
                        <img src={teams[params.value - 1].team_logo} style={{ width: 40 }} /></Link>
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

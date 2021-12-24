import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import './simple.css';
import { Link } from 'react-router-dom';
import { height } from 'dom-helpers';
const TeamTable = () => {
    const [rowData, setRowData] = useState([]);
    const teams = useSelector(state => state.teamsReducer.teams)

    const styles = {
        mini_img: {
            width: 40,
            height: 40,
            borderRadius: 20
        }
    }

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
            headerName: "Name", field: "name",
        /* cellRenderer: function(params) {
            return (<Link>{params.value}</Link>)
        } */},
        {
            headerName: "logo", field: "id", cellRendererFramework: (params) => <div>
                {params ?
                    <Link key={params} to={`/teams/${params.value}`}><img src={teams[params.value - 1].team_logo} style={styles.mini_img} className="for-tournament-logo" /></Link>
                    : <></>}
            </div>
        },
        { headerName: "Games", field: "games" },
        { headerName: "scored", field: "goals_scored" },
        { headerName: "missed", field: "goals_missed" },
        { headerName: "difference", field: "goals_difference", cellClass: (params) => (params.value > 0 ? "positive" : params.value < 0 ? "negative" : "no-games") },
        { headerName: 'points', field: 'points', cellClass:()=>("main-column")},
        { headerName: 'wins', field: 'wins'},
        { headerName: "wins_ot", field: "wins_ot" },
        { headerName: "Defeats", field: "defeats" },
        { headerName: "defeats_ot", field: "defeats_ot" },
        { headerName: "percentage_of_wins", field: "percentage_of_wins" },
        { headerName: "team_background", field: "team_background", cellRendererFramework: (params) => <div>
        {params ?
            <Link key={params} to={`/teams/${params.value}`}><img src={params.value} style={styles.mini_img} className="for-tournament-logo" /></Link>
            : <></>}
    </div>},
    ]

    const rowSelectionType = 'single'

    const components = {
        f: (params) => {
            return teams[0].team_logo
        }
    }

    return (
        <div className='mm_cl'>
            <h1>tournament table</h1>
            <div className="ag-theme-alpine" style={{ width: 1500, height: 400 }}>
                <AgGridReact
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    enableBrowserTooltips={true}
                    rowSelection={rowSelectionType}
                    pagination={true}
                    paginationAutoPageSize={true}
                    components={components}>
                </AgGridReact>
            </div >
        </div>
    );
};

export default TeamTable;

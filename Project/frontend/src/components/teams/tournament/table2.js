import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import './simple.css';
import { Link } from 'react-router-dom';
import { height } from 'dom-helpers';
const Table2 = () => {
    const [rowData, setRowData] = useState([]);
    const teams = useSelector(state => state.teamsReducer.teams)

    const styles = {
        mini_img:{
            width:40,
            height:40,
            borderRadius:20
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
        { headerName: "logo", field: "id", cellRendererFramework: (params) => <div>
            {params ?
            <Link key={params} to={`/teams/${params.value}`}><img src={teams[params.value-1].team_logo} style={styles.mini_img} /></Link>
            :<></>}
            </div> },
        { headerName: "Defeats", field: "defeats" },
        { headerName: "Games", field: "games" },
        { headerName: "wins_ot", field: "wins_ot" },
        { headerName: "defeats_ot", field: "defeats_ot" },
        { headerName: "goals_scored", field: "goals_scored" },
        { headerName: "goals_missed", field: "goals_missed" },
        { headerName: "goals_difference", field: "goals_difference" },
        { headerName: "percentage_of_wins", field: "percentage_of_wins" },
        { headerName: 'sum_points', field: 'sum_points', cellClass: (params) => (params.value > 100 ? "more100" : "less100") },
        { headerName: 'wins', field: 'wins', cellClass: (params) => (params.value = "Forward" ? "forwardCl" : "simpleCl") },
    ]

    const rowSelectionType = 'single'

    const components = {
        f: (params) => {
            return teams[0].team_logo
        }
    }

    return (
        <div>
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

export default Table2;

/* import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';

const TableTeams = () => {
    const [rowData, setRowData] = useState([]);
    const teams = useSelector(state => state.teamsReducer.teams)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/teams/')
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
    }, []);
    return (
        <div className="ag-theme-alpine" style={{ height: 400, backgroundColor:'black'}}>
            <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="name" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="sum_points" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="wins" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="defeats" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="goals_scored" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="goals_missed" sortable={true} filter={true}></AgGridColumn>
            </AgGridReact>
        </div>
    );
};

export default TableTeams; */
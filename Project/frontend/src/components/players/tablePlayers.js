import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

const TablePlayers = () => {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/teams/')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);
    return (
        <div className="ag-theme-alpine" style={{ height: 400, backgroundColor: 'black' }}>
            <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="name" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="score" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="team" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="goals_scored" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="goals_missed" sortable={true} filter={true}></AgGridColumn>
            </AgGridReact>
        </div>
    );
};

export default TablePlayers;
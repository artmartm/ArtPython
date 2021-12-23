import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import './simple.css';
const Another = () => {
    const [rowData, setRowData] = useState([]);
    const teams = useSelector(state => state.teamsReducer.teams)


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/players/')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);

    

    const columnDefs = [
        { headerName: "Name", field: "name" },
        { headerName: 'score', field: 'score',cellClass:(params)=>(params.value>100?"more100":"less100") },
        { headerName: 'team', field: 'team',tooltipField:"name"},
        { headerName: 'position', field: 'position',cellClass:(params)=>(params.value="Forward"?"forwardCl":"simpleCl")},
    ]

    const rowSelectionType = 'single'

    return (
        <div className="ag-theme-alpine" style={{ height: 400, backgroundColor: 'black' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                enableBrowserTooltips={true}
                rowSelection={rowSelectionType}>
            </AgGridReact>
        </div>
    );
};

export default Another;
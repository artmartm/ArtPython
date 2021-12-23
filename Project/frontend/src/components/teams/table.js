import React from "react";
import { AgGridReact } from "ag-grid-react";

export const TableGrid = () => {
    const data = [
        { name: 'Art', score: 100 },
        { name: 'kit', score: 99 },
        { name: 'fish', score: 88 },
    ]
    const columns = [
        {
            headerName: 'Name', field: 'name', sortable:true, editable:true, filter:true, checkboxSelection:true
        },
        {
            headerName: 'Score', field: 'score', sortable:true ,editable:true, filter:true
        },
    ]
    const defaultColDef={
        sortable:true, editable:true, filter:true
    }
    return (
        <div
            className="ag-theme-alpine"
            style={{
                height: '250px',
                position: 'row',
                width: '600px',
                margin:'auto',
                padding:'auto'
            }}>
            <AgGridReact rowData={data} columnDefs={columns} />
        </div>
    )
}
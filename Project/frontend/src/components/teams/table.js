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
            headerName: 'Name', field: 'name', checkboxSelection: true
        },
        {
            headerName: 'Score', field: 'score',
        },
    ]
    const defaultColDef = {
        sortable: true, editable: true, filter: true, floatingFilter: true, flex: 1
    }
/*
    const onGridReady = params => {
        gridApi = params.api
    }
 
    const onExportClick = ()=>{
        gridApi.exportDataAsCsv();
    }
 */
    return (
        <div>
            {/* <button onClick={()=>onExportClick}>export</button> */}
            <div
                className="ag-theme-alpine"
                style={{
                    height: '250px',
                    width: '600px',
                    margin: 'auto',
                    padding: 'auto'
                }}>
                <AgGridReact rowData={data} columnDefs={columns}
                    defaultColDef={defaultColDef}
                   /*  onGridReady={onGridReady} */ />
            </div>
        </div>
    )
}
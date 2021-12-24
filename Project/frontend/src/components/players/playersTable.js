import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './../teams/tournament/simple.css';


const PlayersTable = () => {
    const [rowData, setRowData] = useState([]);
    //const teams = useSelector(state => state.teamsReducer.teams)
    const [players, setPlayers] = useState([]);
    const teams = useSelector(state => state.teamsReducer.teams)

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
            headerName: "Name", field: "name", cellRendererFramework: (params) => <div>
                {params.value && teams.length > 0 && players.length > 0 ?
                    <Link className='link' key={params.value-1}  
                    to={`/players/${params.value}`}>
                    {params.value}</Link>
                    : <></>}
            </div>,cellClass:()=>("main-column")
        },
        {
/*             headerName: "Image", field: "image", cellRendererFramework: (params) => <div>
 */             headerName: "Image", field: "id", cellRendererFramework: (params) => <div>
                {params && teams.length > 0 && players.length>0 ?
                    <Link key={params} /* to={`/teams/${params.value}`} */>{/* <img src={players[params.value-1].image} style={styles.mini_img} /> */}</Link>
                    : <></>}
            </div>,cellClass:()=>('red')
        },
        { headerName: "name", field: "name" },
        { headerName: "name", field: "image",  cellRendererFramework: (params) => <div>
        {params.value && teams.length > 0 > 0 ?
            <img src={params.value} style={{ width:40 }}/>
            : <></>}
    </div>},
        { headerName: "id", field: "id" },
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

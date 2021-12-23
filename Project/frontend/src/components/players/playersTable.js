import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const PlayersTable = () => {
    const [rowData, setRowData] = useState([]);
   //const teams = useSelector(state => state.teamsReducer.teams)
   const [teams, setTeams] = useState([]);

    const styles = {
        mini_img:{
            width:40,
            height:40,
            borderRadius:20
        }
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/players/')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/teams/')
            .then(result => result.json())
            .then(teams => setTeams(teams))
    }, []);


    const defaultColDef = {
        sortable: true, editable: true, filter: true, floatingFilter: true, flex: 1
    }
    
    const columnDefs = [
        { headerName: "Name", field: "name" },
        { headerName: "Image", field: "image", cellRendererFramework: (params) => <div>
        {params && teams.length>0 ?
        <Link key={params} /* to={`/teams/${params.value}`} */><img src={params.value} style={styles.mini_img} /></Link>
        :<></>}
        </div> },
         { headerName: "team2", field: "team", cellRendererFramework: (params) => <div>
        {params && teams.length>0 ?
        <Link key={params} /* to={`/teams/${params.value}`} */ style={{backgroundImage: `url(${teams[params.value-1].team_background})` }}>
            {teams[params.value-1].name}</Link>
        :<></>}
        </div> },
        { headerName: "Score", field: "score" },
        { headerName: "Shoots", field: "shoots" },
        { headerName: "Position", field: "position" },
        { headerName: "Team", field: "team", cellRendererFramework: (params) => <div>
        {params && teams.length>0 ?
        <Link key={params} to={`/teams/${params.value}`}><img src={teams[params.value-1].team_logo} style={styles.mini_img} /></Link>
        :<></>}
        </div> }

    ]

    const rowSelectionType = 'single'

    const components = {
        f: (params) => {
            return teams[0].team_logo
        }
    }

    return (
        <div>
            <div className="ag-theme-alpine" style={{ width: 1500, height: 700 }}>
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

export default PlayersTable;

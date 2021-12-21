import React, { Component } from 'react';

//import 'bulma/css/bulma.min';
import './sortable-table.css';


class SortableTable extends Component {
   
    constructor(props) {
      super(props);

      this.state = { data: [] };
      this.onSort = this.onSort.bind(this)
    }
 
    componentDidMount() {
      fetch('https://127.0.0.1:8000/api/tournament')
        .then(function(response) {
          return response.json();
        })
        .then(items => this.setState({ data: items.data }));
    }
 
    onSort(event, sortKey){

      const data = this.state.data;
      data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
      this.setState({data})
    }
 
    render() {
      let newdata = this.state.data;
     
      let { name,sum_points } = this.props;

      return (
        <table className="table is-bordered is-hoverable is-fullwidth has-text-centered">
          <thead>
            <tr>
              <th onClick={e => this.onSort(e, 'id')}>name</th>
              <th onClick={e => this.onSort(e, 'first_name')}>
                  {sum_points}
                  <i className="fas fa-sort"></i>
              </th>
              <th onClick={e => this.onSort(e, 'last_name')}>
                  {name}
                  <i className="fas fa-sort"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {newdata.map(function(user) {
              return (
                <tr key={user.id}>
                  <td>{user.sum_points}</td>
                  <td>{user.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }
 
  export default SortableTable;

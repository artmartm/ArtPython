import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
const StadiumsList = () => {

    const stadiums = useSelector(state => state.stadiumsReducer.stadiums)


    return (
        <div>
            <h1>list of stadiums</h1>
            <hr />
            {stadiums.length > 0 ?
                <div >
                    {stadiums.map(stadium =>
                        <div key={stadium.id}>
                            <h1><Link to={{ pathname: `/stadiums/${stadium.id}/`, fromDashboard: false }}>{stadium.name}</Link></h1>
                        </div>
                    )}
                </div>
                :
                <p>no stadiums</p>
            }
        </div>
    )
}
export default StadiumsList;





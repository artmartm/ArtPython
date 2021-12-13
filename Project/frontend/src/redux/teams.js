import { useDispatch, useSelector} from 'react-redux';
import {connect} from 'react-redux';
import {getTeam} from './redux/action'

function TeamListRed(props) {
    
    return(
        <div>
           {/*} {props.teams.map(e=>{
                return <h1>{e}</h1>
            })}*/}
            <h1>{props.teams[props.id]}</h1>
        </div>
    )
}

function mapStateToProps(state) {
    const {teamReducer} = state;
    return {
        teams: teamReducer.teams
    }
}

export default connect(mapStateToProps)(TeamListRed);

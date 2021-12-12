import { useDispatch, useSelector} from 'react-redux';
//import { likeReducer } from './redux/likesReducer';
//import { inputReducer } from './redux/textReducer';
import {inputText} from './redux/action'
function Title(props) {
    
    const text = useSelector(state=>{
        const {inputReducer} = state;
        return inputReducer.text;
    })

    const dispatch = useDispatch();

    const handleChange=(e)=>{
        dispatch(inputText(e.target.value))
    }
    return(
        <div>
            <input type='text' onChange={handleChange} />
            <p>{text}</p>
        </div>
    )
}

export default Title;
import React, {useState} from "react";

function Add({onCreate}) {
    const [value,setValue] = useState([]);
    function submitHandler(ev) {
        ev.preventDefault()

        if(value.trim()){
            onCreate(value);
            setValue('');
        }
    }

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/leagues/${id}`,
            mode: 'no-cors'
        }).then(response=>{
            setLeague(response.data)
            setTeam(response.data.teams)
            setCm(response.data.cm)
        })
    },[id])
    
    return(
        <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
            <input 
            value={value}
            onChange={event => setValue(event.target.value)}/>
            <button type='submit'>add</button>
        </form>
    )
}


export default Add;
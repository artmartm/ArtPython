import React, {useState} from "react";

function Add({onCreate}) {
    const [value,setValue] = useState('');
    function submitHandler(ev) {
        ev.preventDefault()

        if(value.trim()){
            onCreate(value);
            setValue('');
        }
    }

    

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
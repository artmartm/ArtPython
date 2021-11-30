import React, {useState, useEffect} from "react"
import Add from "./add"

function AddForm() {

    const[team, setTeam] = useState([]);
    
    function addToDo(title) {
        setTodos(todos.concat([{
          title:title,
          id: Date.now(),
          completed: false
        }]))
      }

      return(
          <div>
              <Add onCreate={addToDo}/>
          </div>
      )
}

export default AddForm;
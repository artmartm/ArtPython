import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { fetchParticularUser } from "../../../redux/actions/asyncActions/asyncParticularUser";
import AuthContext from "../base/AuthContext";
import DeleteComment from "./deleteComment";


function UP({ something }) {

    const history = useHistory()


    const [name, setName] = useState(something.name)
    const id = something.id
    const author = something.author
    const content_type = something.content_type
    const object_id = something.object_id



    const UpdateCom = async () => {
        let formField = new FormData()

        formField.append('name', name)
        formField.append('id', id)
        formField.append('content_type', content_type)
        formField.append('object_id', object_id)
        formField.append('author', author)

        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/api/comments/${id}/`,
            data: formField
        }).then(response => {
            console.log(response.data);
            history.push("/");
        })

    }


    return (
        <div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button onClick={UpdateCom} >Update</button>
        </div>
    )
}

export default UP;

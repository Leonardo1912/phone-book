import React, {useState} from 'react';
import "./Modal.scss"
import {useDispatch} from "react-redux";
import {updateContact} from "../../redux/phoneReducer";

const Modal = ({active, setActive, contact, index, field, setField, setIndex, id, setReload, addNumber, editOrAdd}) => {
    const [newContact, setNewContact] = useState({name: contact.name, phoneNumbers: contact.phoneNumbers})
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const update = () => {
        setNewContact(state => {
            index === null ? state.name = field : state.phoneNumbers[index] = field
        })
        setIndex(null)
        dispatch(updateContact(id, newContact))
        setReload(true)
        setError(false)
        setActive(false)
    }
    const cancel = () => {
        contact.phoneNumbers.splice(index, 1)
        setActive(false)
    }
    console.log(contact)

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modalContent" onClick={event => event.stopPropagation()}>
                <input type="text" value={field} onChange={event => setField(event.target.value)}/>
                <div style={error ? {color: "red", display: "block"} : {display: "none"}}>ERROR</div>
                <div>
                    <div>
                        <button
                            onClick={() => field.length === 0 ? setError(true) : update()}>{!editOrAdd ? "ADD" : "EDIT"}</button>
                    </div>
                    <div>
                        <button onClick={() => !editOrAdd? cancel(): setActive(false)}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
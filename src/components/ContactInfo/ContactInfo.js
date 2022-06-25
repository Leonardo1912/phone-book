import React, {useEffect, useState} from 'react';
import "./ContactInfo.scss"
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getContact, updateContact} from "../../redux/phoneReducer";
import Modal from "./Modal";

const ContactInfo = () => {
    const {contact, loading} = useSelector(state => state.phone)
    const [active, setActive] = useState(false)
    const [reload, setReload] = useState(false)
    const [field, setField] = useState('')
    const [index, setIndex] = useState(null)
    const [addNumber, setAddNumber] = useState('')
    const [editOrAdd, setEditOrAdd] = useState(false)
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getContact(id))
        setReload(false)
    }, [reload])
    if (loading) {
        return <div>LOADING...</div>
    }
    return (
        <div className="ContactInfo">
            <div className="name"><span>{contact.name}</span>
                <button onClick={() => {
                    setField(contact.name)
                    setActive(true)
                }}>EDIT
                </button>
            </div>
            <div>
                {contact.phoneNumbers?.map((phone, index) => <div key={Math.random()} className="phone">
                    <span>{phone}</span>
                    <button onClick={() => {
                        setField(phone)
                        setIndex(index)
                        setActive(true)
                        setEditOrAdd(true)
                    }}>EDIT
                    </button>
                    <button onClick={() => {
                        contact.phoneNumbers.splice(index, 1)
                        dispatch(updateContact(id, contact))
                        setReload(true)
                    }}>DELETE
                    </button>
                </div>)}
            </div>
            <div>
                <button onClick={()=>{
                    setField(addNumber)
                    contact.phoneNumbers.push(addNumber)
                    setIndex(contact.phoneNumbers.length - 1)
                    setActive(true)
                    setEditOrAdd(false)
                }}>
                    Add phone
                </button>
            </div>
            <Modal active={active} setActive={setActive} contact={contact} field={field} index={index}
                   setField={setField} setIndex={setIndex} id={id} setReload={setReload} addNumber={addNumber} editOrAdd={editOrAdd}/>
            <Link to={"/"}>Back</Link>
        </div>
    );
};

export default ContactInfo;
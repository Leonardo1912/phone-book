import React, {useEffect, useState} from 'react';
import "./Contacts.scss"
import {useDispatch, useSelector} from "react-redux";
import {getContacts} from "../../redux/phoneReducer";
import {phoneAPI} from "../../api/api";
import Modal from "./Modal";
import {Link} from "react-router-dom";

const Contacts = () => {
    const {contacts, loading, length, quantity} = useSelector(state => state.phone)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [active, setActive] = useState(false)
    const [reload, setReload] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getContacts(quantity, currentPage, search))
        setReload(false)
    }, [currentPage, reload])

    let pages = []
    for (let page = 1; page <= Math.ceil(length / quantity); page++) {
        pages.push(page)
    }


    if (loading) {
        return <div>LOADING...</div>
    }
    return (
        <div className="Contacts">
            <div className="header">
                <div>
                    <input type="text" placeholder="Search" value={search}
                           onChange={event => setSearch(event.target.value)}/>
                    <button onClick={() => dispatch(getContacts(quantity, 1, search))}>Search</button>
                    <button onClick={() => dispatch(getContacts(quantity, currentPage, search, 'desc'))}>Desc</button>
                    <button onClick={() => dispatch(getContacts(quantity, currentPage, search, "asc"))}>Asc</button>
                </div>
                <div>
                    <button onClick={()=>setActive(true)}>ADD</button>
                </div>
            </div>
            <div>{contacts.map(contact =>
                <div key={contact.id} className="contact">
                    <Link to={`/contact/${contact.id}`} className={"contactName"}>{contact.name}</Link>
                    <div className="delete">
                        <button onClick={() => {
                            phoneAPI.deleteContact(contact.id)
                            setReload(true)
                        }}>DELETE
                        </button>
                    </div>
                    <div>{contact.phoneNumbers.map(phone => <div key={phone}>{phone}</div>)}</div>
                </div>)}
            </div>
            <div>
                {pages.map(page => <span key={page} onClick={() => setCurrentPage(page)}
                                         style={{marginRight: '5px', cursor: "pointer"}}>{page}</span>)}
            </div>
            <Modal active={active} setActive={setActive} setReload={setReload}/>
        </div>
    );
};

export default Contacts;
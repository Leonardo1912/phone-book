import React, {useState} from 'react';
import "./Modal.scss"
import {phoneAPI} from "../../api/api";

const Modal = ({active, setActive, setReload}) => {
    const [contact, setContact] = useState({name: '', phoneNumber: ''})
    let phoneNumbers = []
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modalContent" onClick={event => event.stopPropagation()}>
                <div>
                    <input type="text" placeholder="Name" value={contact.name}
                           onChange={event => setContact({...contact, name: event.target.value})}/>
                </div>
                <div>
                    <input type="text" placeholder="Phone number" value={contact.phoneNumber}
                           onChange={event => setContact({...contact, phoneNumber: event.target.value})}/>
                </div>
                <div>
                    <div>
                        <button onClick={() => {
                            phoneNumbers.push(contact.phoneNumber)
                            phoneAPI.addContact({name: contact.name, phoneNumbers})
                            setReload(true)
                            setActive(false)
                        }}>ADD</button>
                    </div>
                    <div>
                        <button onClick={() => {
                            setContact({name: '', phoneNumber: ''})
                            setActive(false)
                        }}>CANCEL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
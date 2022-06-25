import React from 'react';
import "./App.scss"
import {Routes, Route} from 'react-router-dom'
import Contacts from "./components/Contacts/Contacts";
import ContactInfo from "./components/ContactInfo/ContactInfo";
const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Contacts/>}/>
                <Route path={"/contact/:id"} element={<ContactInfo/>}/>
            </Routes>
        </div>
    );
};

export default App;
import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {}
})

export const phoneAPI = {
    getContacts(quantity, page, search, sort) {
        return instance.get(`/users?search=${search}&sort=${sort}&page=${page}&quantity=${quantity}`)
            .then(response => {
                return response.data
            })
    },
    getContact(id) {
        return instance.get(`/userbyid/${id}`)
            .then(response => {
                return response.data
            })
    },
    addContact(contact) {
        return instance.post(`/adduser`, contact)
    },
    updateContact (id, contact) {
        return instance.put(`/updateuser/${id}`,contact).then(response=>{
            console.log("response",response)
        })
    },
    deleteContact(id) {
        return instance.delete(`/deleteuser/${id}`)
    }

}
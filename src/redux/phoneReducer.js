import {phoneAPI} from "../api/api";

const SET_CONTACTS = "SET_CONTACTS"
const SET_CONTACT = "SET_CONTACT"
const SET_LENGTH = "SET_LENGTH"
const LOADING = "LOADING"

let initialState = {
    contacts: [],
    contact: [],
    loading: false,
    length: 0,
    page: 1,
    quantity: 5,

}

const phoneReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTACTS: {
            return {...state, contacts: action.payload}
        }
        case SET_CONTACT: {
            return {...state, contact: action.payload}
        }
        case LOADING: {
            return {...state, loading: action.payload}
        }
        case SET_LENGTH: {
            return {...state, length: action.payload}
        }
        default:
            return state;
    }
}
export const loading = (payload) => ({type: LOADING, payload})
export const setContacts = (payload) => ({type: SET_CONTACTS, payload})
export const setContact = (payload) => ({type: SET_CONTACT, payload})
export const setLength = (payload) => ({type: SET_LENGTH, payload})
export const getContacts = (quantity, currentPage, search, sort) => {
    return async (dispatch) => {
        dispatch(loading(true))
        let data = await phoneAPI.getContacts(quantity, currentPage, search, sort)
        dispatch(setContacts(data.users))
        dispatch(setLength(data.length))
        dispatch(loading(false))

    }
}
export const getContact = (id) => {
    return async (dispatch) => {
        dispatch(loading(true))
        let data = await phoneAPI.getContact(id)
        dispatch(setContact(data))
        dispatch(loading(false))

    }
}

export const updateContact = (id, contact) => {
    return async (dispatch) => {
        let data = await phoneAPI.updateContact(id, contact)
    }
}

export default phoneReducer;
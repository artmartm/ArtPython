import { ADD_CUSTOMER, DELETE_CUSTOMER, ADD_MANY_CUSTOMERS } from "./types"

const initialState = {
    customers: []
}

export const customerReducer=(state=initialState, action) => {
    switch(action.type) {
        case ADD_MANY_CUSTOMERS:
            return {
                ...state, customers: [...state.customers, ...action.payload]
            }
        case ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload]
            }
        case DELETE_CUSTOMER:
            return {
                ...state, customers: state.customers.filter(customer => customer.id != action.payload.id)
            }
        default:
            return state;

    }
}
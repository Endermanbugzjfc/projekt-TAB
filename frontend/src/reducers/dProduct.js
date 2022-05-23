import {ACTION_TYPES} from "../actions/dProduct"

const initialState = {
    list:[]
}

export const dProduct = (state = initialState, action) =>{
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }
    
        default:
            return state;
    }
}
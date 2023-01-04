import * as actionDict from "../ActionDict"

const initialState = {
    states: [],
    preState: {}
}

function stateReducer(state = initialState, action) {

    switch (action.type) {
        case actionDict.GET_STATE:
            return {
                ...state,
                states: action.payload
            }
        case actionDict.ADD_STATE:
            return {
                ...state,
                states: action.payload
            }    
    }

    return state
}

export default stateReducer;
import { GET_SNIPPETS_BEGIN, GET_SNIPPETS_SUCCESS } from "../utils/actions"


const snippet_reducer = (state, action) => {

    if(action.type === GET_SNIPPETS_BEGIN) {
        return {
            ...state,
            loading: true,
        }
    }
    
    if(action.type === GET_SNIPPETS_SUCCESS) {
        return {
            ...state,
            snippets: action.payload,
            loading: false,
        }
    }

    return {...state}
}

export default snippet_reducer;
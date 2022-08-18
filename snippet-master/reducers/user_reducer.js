import { COLLAPSE_SIDEBAR, SHOW_MENU_PANEL, HIDE_MENU_PANEL, SHOW_MODAL, HIDE_MODAL } from "../utils/actions";


function user_reducer(state, action) {
    if(action.type === COLLAPSE_SIDEBAR) {
        return {
            ...state,
            collapsed: !state.collapsed
        }
    }

    if(action.type === SHOW_MENU_PANEL) {
        return {
            ...state,
            showTopPanel: !state.showTopPanel
        }
    }

    if(action.type === HIDE_MENU_PANEL) {
        return {
            ...state,
            showTopPanel: false
        }
    }
    if(action.type === SHOW_MODAL) {
        return {
            ...state,
            modal: true
        }
    }
    if(action.type === HIDE_MODAL) {
        return {
            ...state,
            modal: false
        }
    }

    return {...state}
}

export default user_reducer;
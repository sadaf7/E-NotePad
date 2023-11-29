import { NOTES_CREATE_FAIL, NOTES_CREATE_REQ, NOTES_CREATE_SUCCESS, NOTES_DELETE_FAIL, NOTES_DELETE_REQ, NOTES_DELETE_SUCCESS, NOTES_LIST_FAIL, NOTES_LIST_REQ, NOTES_LIST_SUCCESS, NOTES_UPDATE_FAIL, NOTES_UPDATE_REQ, NOTES_UPDATE_SUCCESS } from "../constants/notesConstant";

export const noteListReducer = (state={ notes:[] },action)=>{
    switch (action.type) {
        case NOTES_LIST_REQ:
            return {loading: true}

        case NOTES_LIST_SUCCESS:
            return {loading: false, notes: action.payload}

        case NOTES_LIST_FAIL:
            return {loading: false, error: action.payload}
           
    
        default:
            return state;
    }
}

export const noteCreateReducer=(state={},action)=>{
    switch (action.type) {
        case NOTES_CREATE_REQ:
            return {loading: true}

        case NOTES_CREATE_SUCCESS:
            return {loading: false, success: true}

        case NOTES_CREATE_FAIL:
            return {loading: false, error: action.payload}
            
        default:
            return state;
    }
}

export const noteUpdateReducer=(state={},action)=>{
    switch (action.type) {
        case NOTES_UPDATE_REQ:
            return {loading: true}

        case NOTES_UPDATE_SUCCESS:
            return {loading: false, success: true}

        case NOTES_UPDATE_FAIL:
            return {loading: false, error: action.payload, success: false}
            
        default:
            return state;
    }
}

export const noteDeleteReducer=(state={},action)=>{
    switch (action.type) {
        case NOTES_DELETE_REQ:
            return {loading: true}

        case NOTES_DELETE_SUCCESS:
            return {loading: false, success: true}

        case NOTES_DELETE_FAIL:
            return {loading: false, error: action.payload, success: false}
            
        default:
            return state;
    }
}


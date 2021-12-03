import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  notes: [],
  filteredNotes:[],
  trashNotes:[],
  listView: false,
};

export const noteReducer = (state=initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LIST_VIEW:
      return { ...state, listView: !state.listView };
    case ActionTypes.SET_NOTES:
      return {...state,notes:payload}
    case ActionTypes.SET_FILTERED_NOTES:
        return {...state,filteredNotes:payload}
    case ActionTypes.ADD_NEW_NOTE:
        return { ...state, notes: [payload, ...state.notes] }
    case ActionTypes.UPDATE_NOTE:
        let copyNotes=[...state.notes]
        for(let i=0; i<copyNotes.length;i++){
          if(copyNotes[i]._id===payload._id){
            copyNotes[i]={...copyNotes[i],...payload}
          }
        } 
        return {...state,notes:copyNotes}
    case ActionTypes.SET_TRASH_NOTES:
      return {...state,trashNotes:payload}
    case ActionTypes.ADD_TRASH_NOTE:
      let copNotes=state.notes.filter(note=> note._id!==payload._id )
      let copyTrashNotes=[...state.trashNotes]
      copyTrashNotes.push(payload);
      return {...state,notes:copNotes,trashNotes:copyTrashNotes}

    case ActionTypes.RESTORE_FROM_TRASH:
      let copTrash=state.trashNotes.filter(note=> note._id!==payload._id )
      let copNote=[...state.notes]
      copNote.push(payload);
      return {...state,notes:copNote,trashNotes:copTrash}
      
    case ActionTypes.DELETE_FROM_TRASH:
      let copsTrash=state.trashNotes.filter(note=> note._id!==payload._id )
      return {...state,trashNotes:copsTrash}

    case ActionTypes.EMPTY_TRASH:
      return {...state,trashNotes:[]}

    default:
      return state;
  }
};
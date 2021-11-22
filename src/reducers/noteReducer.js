import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  notes: [],
  filteredNotes:[]
};

export const noteReducer = (state=initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_NOTES:
      return {...state,notes:payload}
    case ActionTypes.SET_FILTERED_NOTES:
        return {...state,filteredNotes:payload}
    case ActionTypes.ADD_NEW_NOTE:
        return { ...state, notes: [payload, ...state.notes] }
    default:
      return state;
  }
};
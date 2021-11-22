import { ActionTypes } from "../constants/actionTypes";

export const setNotes = (notes) => {
  return {
    type: ActionTypes.SET_NOTES,
    payload: notes,
  };
};

export const setFilteredNotes = (notes) => {
  return {
    type: ActionTypes.SET_FILTERED_NOTES,
    payload: notes,
  };
};

export const addNewNote = (note) => {
    return {
      type: ActionTypes.ADD_NEW_NOTE,
      payload: note,
    };
};
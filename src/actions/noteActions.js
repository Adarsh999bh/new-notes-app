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

export const updateNote = (note) => {
    return {
      type: ActionTypes.UPDATE_NOTE,
      payload: note,
    };
};

export const setTrashNotes = (note) => {
  return {
    type: ActionTypes.SET_TRASH_NOTES,
    payload: note,
  };
};
export const addTrashNotes = (note) => {
  return {
    type: ActionTypes.ADD_TRASH_NOTE,
    payload: note,
  };
};
export const restoreFromTrash = (note) => {
  return {
    type: ActionTypes.RESTORE_FROM_TRASH,
    payload: note,
  };
};
export const deleteFromTrash = (id) => {
  return {
    type: ActionTypes.DELETE_FROM_TRASH,
    payload: id,
  };
};
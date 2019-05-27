import * as types from "../Actions/ReduxActions";
import Immutable from "seamless-immutable";

const INITIAL_STATE = Immutable({
  mostVisitedSites: [],
  Bookmarks: [],
  FilteredBookmarks: [],
  bookmarkFolders: [],
  searchTerm: "",
  selectedFolder: "",
  isDropDownOpen: false
});

export const DashBoardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_MOST_VISITED_SITES:
      return { ...state, mostVisitedSites: action.sites };

    case types.SET_BOOKMARKS:
      return { ...state, Bookmarks: action.Bookmarks };

    case types.SET_FILTERED_BOOKMARKS:
      return { ...state, FilteredBookmarks: action.Bookmarks };

    case types.SET_BOOKMARK_FOLDERS:
      return { ...state, bookmarkFolders: action.Folders };

    case types.SET_SEARCHED_TERM:
      return { ...state, searchTerm: action.SearchedText };

    case types.SET_SELECTED_FOLDER:
      return { ...state, selectedFolder: action.FolderName };

    case types.OPEN_CLOSE_DROPDOWN_OPEN:
      return { ...state, isDropDownOpen: !state.isDropDownOpen };

    default:
      return state;
  }
};

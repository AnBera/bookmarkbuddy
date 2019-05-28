import * as types from "../ReduxActions";

export const setMostVisitedSites = sites => {
  return {
    type: types.SET_MOST_VISITED_SITES,
    sites
  };
};

export const setBookmarks = ({ bookmarks }) => {
  return {
    type: types.SET_BOOKMARKS,
    Bookmarks: bookmarks
  };
};

export const setFilteredBookmarks = ({ bookmarks }) => {
  return {
    type: types.SET_FILTERED_BOOKMARKS,
    Bookmarks: bookmarks
  };
};

export const setBookmarkFolders = folders => {
  return {
    type: types.SET_BOOKMARK_FOLDERS,
    Folders: folders
  };
};

// export const setSearchActive = () => {
//   return {
//     type: types.SET_SEARCH_ACTIVE
//   }
// };

export const setSearchedTerm = searchedText => {
  return {
    type: types.SET_SEARCHED_TERM,
    SearchedText: searchedText
  };
};

export const setSelectedFolder = folderName => {
  return {
    type: types.SET_SELECTED_FOLDER,
    FolderName: folderName
  };
};

export const setIsSearchFolderDropDownOpen = () => {
  return {
    type: types.OPEN_CLOSE_DROPDOWN_OPEN
  };
};

export const setColorsMap = colorsMap => {
  return {
    type: types.SET_COLORS_MAP,
    colorsMap: colorsMap
  };
};

import * as types from "../ReduxActions";
import * as Sagatypes from "../../../saga/Actions/SagaActions";
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

export const setRecentBookmarks = ({ bookmarks }) => {
  return {
    type: types.SET_RECENT_BOOKMARKS,
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

export const generatePreviewImages = urls => {
  return {
    type: Sagatypes.CALL_CONVERT_IMAGES_API,
    urls: urls
  };
};

export const saveUrlsToDB = Objurls => {
  return {
    type: Sagatypes.CALL_SAVE_URLS_API,
    urlObj: Objurls
  };
};

export const updateBookmark = (bookmarks) => {
  return {
    type: types.UPDATE_BOOKMARK,
    UpdatedBookmarks: bookmarks
  };
};

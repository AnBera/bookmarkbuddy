import * as types from '../index';

export const setMostVisitedSites = (sites) => {

  return {
    type: types.SET_MOST_VISITED_SITES,
    sites
  }
};


export const setBookmarks = ({bookmarks}) => {
  return {
    type: types.SET_BOOKMARKS,
    Bookmarks:bookmarks
  }
};


// export const setBookmarkPreviews = (image) => {
//   return {
//     type: types.CALL_PREVIEW_BOOKMARK_API,
//     image
//   }
// };

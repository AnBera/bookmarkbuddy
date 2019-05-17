import * as types from '../Actions/';
import Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable({
   mostVisitedSites:[],
   Bookmarks:[],
   searchedTest:''
});

export const DashBoardReducer=(state = INITIAL_STATE, action)=>{
  switch(action.type) {

    case types.SET_MOST_VISITED_SITES:
      return { ...state, mostVisitedSites:action.sites };

    case types.SET_BOOKMARKS:
      return { ...state, Bookmarks:action.Bookmarks };

    default:
      return state;
  }
}
import React,{ Component} from "react";
import { Grid } from "semantic-ui-react";
import { connect } from 'react-redux';
import {setFilteredBookmarks,setBookmarkFolders,setSearchedTerm,setSelectedFolder,setIsSearchFolderDropDownOpen} from '../../redux/Actions/ActionTypes/DashBoardActions';
import SearchAndFilter from './SearchandFilter';


class SearchComponent extends Component{
    
    componentWillMount=()=>{
        if(this.props.bookmarks.length>0){
           let folders=[];
            this.props.bookmarks.map((name)=>{
            if(!folders.includes(name.category)){
                folders.push(name.category);
            }
            })
            folders.sort();
            folders.unshift("-- Select all --")
          this.props.setBookmarkFolders(folders);
        }  
    }
    // actiavteSearch=()=>{
    //   this.props.setSearchActive();
    // }

    searchBookmark=(searchedText)=>{
      this.props.setSearchedTerm(searchedText);
      let filteredBookmarks=[...this.props.bookmarks];
      if(searchedText !=='')
      { 
        if(this.props.selectedFolder!=="-- Select all --" && this.props.selectedFolder!=='')
        { 
        filteredBookmarks=filteredBookmarks.filter(element => element.category===this.props.selectedFolder && element.title.toLowerCase().includes(searchedText.toLowerCase()))
        }
        else{
          filteredBookmarks=filteredBookmarks.filter(element => element.title.toLowerCase().includes(searchedText.toLowerCase()))
        }
        this.props.setFilteredBookmarks({ bookmarks: filteredBookmarks});
      }
      else{
        this.searchBookmarkWithinFolder(this.props.selectedFolder);
      }      
    }

    searchBookmarkWithinFolder=(selectedFolder)=>{
      this.props.setSelectedFolder(selectedFolder);
      let filteredBookmarks=[...this.props.bookmarks];
      if(selectedFolder!=="-- Select all --")
      filteredBookmarks=filteredBookmarks.filter(element => element.category!=="-- Select all --" && element.category===selectedFolder)
      this.props.setFilteredBookmarks({ bookmarks: filteredBookmarks });
    }

    open_CloseDropdown=()=>{
      this.props.setOpenCloseDropDown();
    }

    render(){
    return(
      // <Grid>
      //  {this.props.bookmarkFolders.length>0 &&  
      <Grid.Column width={16}>
        <SearchAndFilter 
        // actiavteSearch={this.actiavteSearch} 
        optionList={this.props.bookmarkFolders}
        setSearchedText={this.searchBookmark} 
        setSelectedFolder={this.searchBookmarkWithinFolder} 
        open_CloseDropdown={this.open_CloseDropdown}
        // IsSearchActive={this.props.searchActive} 
        SearchedText={this.props.searchTerm} 
        SelectedFolder={this.props.selectedFolder}
        IsDropDownOpen={this.props.isDropDownOpen}
        ></SearchAndFilter>
      </Grid.Column>
      // }
      // </Grid>
    ) 
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setBookmarkFolders:(folders)=>{
        dispatch(setBookmarkFolders(folders))
      },
      // setSearchActive:()=>{
      //   dispatch(setSearchActive())
      // },
      setSearchedTerm:(text)=>{
        dispatch(setSearchedTerm(text))
      },
      setSelectedFolder:(folder)=>{
        dispatch(setSelectedFolder(folder))
      },
      setOpenCloseDropDown:()=>{
        dispatch(setIsSearchFolderDropDownOpen())
      },
      setFilteredBookmarks:(bookmarks=[])=>{
        dispatch(setFilteredBookmarks(bookmarks));
      }
    };
  };
  
  const mapStateToProps = (state) =>( {
      bookmarks:state.DashBoardReducer.Bookmarks,
      // searchActive: state.DashBoardReducer.searchActive,
      searchTerm: state.DashBoardReducer.searchTerm,
      selectedFolder: state.DashBoardReducer.selectedFolder,
      bookmarkFolders:state.DashBoardReducer.bookmarkFolders,
      isDropDownOpen:state.DashBoardReducer.isDropDownOpen,
      FilteredBookmarks:state.DashBoardReducer.FilteredBookmarks
  })
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(SearchComponent);
  
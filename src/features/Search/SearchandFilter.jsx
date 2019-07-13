import React, { Component } from "react";
import Select from "./SelectFolder";
import { Icon } from "semantic-ui-react";
import "./search.css";
import debounce from "lodash.debounce";

const SearchAndFilter=(props) =>{
  //{optionList,setSearchedText,setSelectedFolder,open_CloseDropdown,SearchedText,SelectedFolder,IsDropDownOpen}
  debugger;
  
  
  const open_closeDropdown = () => {
    props.open_CloseDropdown();
  };

  const setSelectedFolderLocal = (folderName) => {
    props.setSelectedFolder(folderName);
  };

  //   function debounce(a,b,c)
  //   {
  //     var d,e;
  //     return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;
  //     return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}
  //   }
  //   setSearchTerm = debounce((e) => {
  //     this.setState({ searchTerm: e.target.value })
  // }, 250)

  const doDebouncedAction =(e)=> debounce(this.onSearch(e), 250);

  const onSearch = e => {
    console.log(e.target.value);
    props.setSearchedText(e.target.value);
  };

  const onClearClick = () => {
    if (this.props.SearchedText !== "") {
      props.setSearchedText("");
    } else {
      // this.actiavteSearch();
    }
  };

    const select =(   
      <Select
        options={props.optionList}
        IsDropDownOpen={props.IsDropDownOpen}
        setSelectedFolder={setSelectedFolderLocal}
        SelectedFolder={props.SelectedFolder}
        open_closeDropdown={open_closeDropdown}
      />
    );

    const input = (
      <input
        className="inputSearch"
        placeholder="Search here"
        onChange={()=>doDebouncedAction}
        value={props.SearchedText}
      />
    );

    const clearIcon = props.IsSearchActive ? (
      <span className="clear" onClick={onClearClick}>
        <Icon name="remove circle" />
      </span>
    ) : null;

    return (
      <div className="search-container">
        <div className="text-wrapper">
          {input}
          {clearIcon}
        </div>
        <div className="filter-wrapper">{select}</div>
      </div>
    );
  }

export default SearchAndFilter;

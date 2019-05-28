import React, { Component } from "react";
import Select from "./SelectFolder";
import { Icon } from "semantic-ui-react";
import "./search.css";

class SearchAndFilter extends Component {
  open_closeDropdown = () => {
    this.props.open_CloseDropdown();
  };

  setSelectedFolder = folderName => {
    this.props.setSelectedFolder(folderName);
  };

  onSearch = e => {
    this.props.setSearchedText(e.target.value);
  };

  onClearClick = () => {
    if (this.props.SearchedText !== "") {
      this.props.setSearchedText("");
    } else {
      // this.actiavteSearch();
    }
  };

  render() {
    const select = (
      <Select
        options={this.props.optionList}
        IsDropDownOpen={this.props.IsDropDownOpen}
        setSelectedFolder={this.setSelectedFolder}
        SelectedFolder={this.props.SelectedFolder}
        open_closeDropdown={this.open_closeDropdown}
      />
    );

    const input = (
      <input
        className="inputSearch"
        placeholder="Search here"
        onChange={this.onSearch}
        value={this.props.SearchedText}
      />
    );

    const clearIcon = this.props.IsSearchActive ? (
      <span className="clear" onClick={this.onClearClick}>
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
}

export default SearchAndFilter;

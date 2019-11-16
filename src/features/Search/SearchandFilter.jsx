import React, { Component } from "react";
import SelectFolder from "./SelectFolder";
import { Icon } from "semantic-ui-react";
import "./search.css";
import {debounce} from "../../app/common/util/Util";

class SearchAndFilter extends Component {
  open_closeDropdown = () => {
    this.props.open_CloseDropdown();
  };

  setSelectedFolder = (searchTerm, folderName) => {
    this.props.setSelectedFolder(searchTerm || "", folderName);
  };

  onSearch = e => {
    this.props.setSearchedText(e.target.value, this.props.SelectedFolder);
  };

  onClearClick = () => {
    if (this.props.SearchedText !== "") {
      this.props.setSearchedText("", this.props.SelectedFolder);
    } else {
      // this.actiavteSearch();
    }
  };

  render() {
    const select = (
      <SelectFolder
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
        placeholder="Search your bookmarks..."
        autofocus="autofocus"
        onChange={e => debounce(this.onSearch(e), 250)}
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

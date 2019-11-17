import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";

class Select extends Component {
  onSelectClick = () => {
    this.props.open_closeDropdown();
  };

  onOptionClick = selectedFolder => {
    this.props.setSelectedFolder(selectedFolder);
  };

  render() {
    return (
      <Dropdown
        placeholder="Select folder"
        value={this.props.SelectedFolder}
        onChange={e => {
          this.onOptionClick(e.target.innerText);
        }}
        search
        selection
        options={this.props.options}
      />
    );
  }
}

export default Select;

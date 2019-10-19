import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import { Dropdown } from 'semantic-ui-react'

class Select extends Component {
  onSelectClick = () => {
    this.props.open_closeDropdown();
  };

  onOptionClick = (searchText, selectedFolder) => {
    this.props.setSelectedFolder(searchText, selectedFolder);
  };

  render() {
    // const optionList = this.props.options.map((option, index) => {
    //   return (
    //     <div
    //       key={index}
    //       className={"option"}
    //       onClick={(e) => this.onOptionClick(e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.value,
    //         option)}
    //     >
    //       {option}
    //     </div>
    //   );
    // });
    // const dropDown = this.props.IsDropDownOpen ? (
    //   <div className="dropDown-items">{optionList}</div>
    // ) : null;

    return (
      <Dropdown placeholder='Select folder'
      onChange={(e) =>{
        console.log(e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.value);
        this.onOptionClick(e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.value,
        e.target.innerText)}} search selection options={this.props.options} />
      // <div className="select-folder" onClick={() => this.onSelectClick()}>
      //   {this.props.SelectedFolder || "Select option"}
      //   <Icon name="caret down" />
      //   {dropDown}
      // </div>
    );
  }
}

export default Select;

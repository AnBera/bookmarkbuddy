import React,{ Component} from "react";
import Select from "./SelectFolder";
import { Icon } from 'semantic-ui-react';
import './search.css';

class SearchAndFilter extends Component {
    
    // actiavteSearch=()=>{
    //   this.props.actiavteSearch();
    // }

    open_closeDropdown=()=>{
    this.props.open_CloseDropdown()
    }

    setSelectedFolder=(folderName)=>{
        this.props.setSelectedFolder(folderName)
    }

    // onSearchClick = () => {
    //     if (!this.props.IsSearchActive) {
    //         this.actiavteSearch();
    //     }        
    // };

    onSearch = (e) => {
        this.props.setSearchedText(e.target.value);
    };

    // onBarClick = () => {
    //     this.actiavteSearch();
    // };
    
    onClearClick = () => {
        if(this.props.SearchedText!=="") {
            this.props.setSearchedText("");   
        } else {
            // this.actiavteSearch();
        }
    };

    render() {    
        const select = 
        // this.props.IsSearchActive ? (
        //     <div onClick={this.onBarClick}>
        //         <Icon name='bars'  />
        //     </div>
        // ) : (
            <Select 
                options={this.props.optionList}
                IsDropDownOpen={this.props.IsDropDownOpen}
                setSelectedFolder={this.setSelectedFolder}
                SelectedFolder={this.props.SelectedFolder}
                open_closeDropdown={this.open_closeDropdown}
            />;
        // );
        
        const input = 
        // this.props.IsSearchActive ? (
            <input 
                className="inputSearch"
                placeholder="Search here"
                onChange={this.onSearch}
                value={this.props.SearchedText}
            />;
        // ) : null;
        
        const clearIcon = this.props.IsSearchActive ? (
            <span className="clear" onClick={this.onClearClick}>
               <Icon name='remove circle'  />
            </span>
        ) : null;
        
        // const searchIcon = (
        //     <span className="searchIcon">
        //         <Icon name='search' />
        //     </span>
        // );
        
        return (
            <div className="search-container">
                <div className="text-wrapper" 
                    onClick={this.onSearchClick}>
                    {/* {searchIcon} */}
                    {input}
                    {clearIcon}
                </div>
                <div className="filter-wrapper" >
                    {select}
                </div>
            </div>
        );
    }
}

export default SearchAndFilter
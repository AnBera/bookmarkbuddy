import React,{ Component} from "react";
import './search.css';
import { Icon } from 'semantic-ui-react';

class Select extends React.Component {
    onSelectClick = () => {
        this.props.open_closeDropdown();
    };
    
    onOptionClick = (value) => { 
        this.props.setSelectedFolder(value);  
    };

    render() {      
        const optionList = this.props.options.map((option,index) => {
           return (
               <div
                   key={index}
                   className={'option'}
                   onClick={() => this.onOptionClick(option)}
               >
                    {option}
               </div>
           ); 
        })
        const dropDown = this.props.IsDropDownOpen ? (
            <div className="dropDown-items">
                {optionList}
            </div>
        ) : null;
        
        return (
            <div className="select-folder" onClick={()=>this.onSelectClick()}>
                {this.props.SelectedFolder || 'Select option'}
                <Icon name="caret down" />
                {dropDown}
            </div>
        );
    }
};

export default Select;

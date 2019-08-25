import React, { useState } from "react";
import TreeNode from "./TreeNode";

const Tree = props => {
  let [bookmarksFolderTree,setbookmarksTree] = useState(props.bookmarkFolderTree[0].children);
  
  const setIsOpen =(node,updatedTree,type)=> {    
    for(let i=0; i<updatedTree.length; i++) {
      switch (type) {
        case "Collaps":
          if(updatedTree[i].id===node.id){
            updatedTree[i].isOpen = !node.isOpen;
            break;
          }
          else{
            setIsOpen(node,updatedTree[i].children,type);
          }
          break;      
          case "Select":
            if(updatedTree[i].id===node.id){
              updatedTree[i].isSelected = !node.isSelected;
              break;
            }
            else{
              updatedTree[i].isSelected=false;
              setIsOpen(node,updatedTree[i].children,type);
            }
          break;
        default:
          break;
      }            
    }
    return updatedTree;
  }

  const onToggle = node => {
    let updatedTree=[...bookmarksFolderTree];
    setbookmarksTree(setIsOpen(node,updatedTree,"Collaps"));
  };

  const onNodeSelect = node => {
    let updatedTree=[...bookmarksFolderTree];
    setbookmarksTree(setIsOpen(node,updatedTree,"Select"));
    props.onSelect(node);
  };
  return (
    <>
      {bookmarksFolderTree.map((item)=>
      {
        return (<TreeNode
          backgroundColor= {props.backgroundColor}
          node={item}
          onToggle={onToggle}
          onNodeSelect={onNodeSelect}
          key={item.id}
        />)
      }
      )}
    </>
  );
};
export default Tree;

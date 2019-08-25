import React, { useState } from "react";
import TreeNode from "./TreeNode";

const Tree = props => {
  let [bookmarksFolderTree,setbookmarksTree] = useState(props.bookmarkFolderTree[0].children);
  
  const setIsOpen =(node,updatedTree)=> {    
    for(let i=0; i<updatedTree.length; i++) {
      if(updatedTree[i].id===node.id){
        updatedTree[i].isOpen = !node.isOpen;
        break;
      }
      else{
        setIsOpen(node,updatedTree[i].children);
      } 
    }
    return updatedTree;
  }

  const onToggle = node => {
    let updatedTree=[...bookmarksFolderTree];
    setbookmarksTree(setIsOpen(node,updatedTree));
  };

  const onNodeSelect = node => {
    props.onSelect(node);
  };
  return (
    <div>
      {bookmarksFolderTree.map((item)=>
      {
        return (<TreeNode
          node={item}
          onToggle={onToggle}
          onNodeSelect={onNodeSelect}
          key={item.id}
        />)
      }
      )}
    </div>
  );
};
export default Tree;

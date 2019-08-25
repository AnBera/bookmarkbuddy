import React, { useState } from "react";

import TreeNode from "./TreeNode";
import { setIsSearchFolderDropDownOpen } from "../../redux/Actions/ActionTypes/DashBoardActions";

const Tree = props => {
  debugger;
  let [bookmarksFolderTree,setbookmarksTree] = useState(props.bookmarkFolderTree[0].children);
  bookmarksFolderTree.forEach((bookmark) => bookmark.isOpen = true);
  console.log(JSON.stringify(bookmarksFolderTree));

  // const getRootNodes = () => {
  //   if(bookmarksFolderTree.id === "0"){
  //     return bookmarksFolderTree.children;
  //   }
  // };


  const setIsOpen =(node,updatedTree)=> {
    debugger;
    for(let i=0; i<updatedTree.length; i++) {
      let folder = updatedTree[i];
      if(folder.id===node.id){
        folder.isOpen = !node.isOpen;
        break;
      }
      else{
        setIsOpen(node,folder.children);
      } 
    }
    return updatedTree;
  }

  // const findNodetoOpen=(node,updatedTree)=>{
  //   if(updatedTree.children.length>0){      
  //     updatedTree.children.forEach(element => {
  //       if(element.id===node.id){
  //         element.isOpen = !node.isOpen;
  //         return updatedTree;
  //       }
  //       else{
  //         findNodetoOpen(node,element);
  //       }
  //     });      
  //   }
  // }

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
        return (item.isOpen && <TreeNode
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

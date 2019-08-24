import React, { useState } from "react";

import TreeNode from "./TreeNode";
import { setIsSearchFolderDropDownOpen } from "../../redux/Actions/ActionTypes/DashBoardActions";

const Tree = props => {

  const [bookmarksFolderTree,setbookmarksTree] = useState(props.bookmarkFolderTree[0].children);
  console.log(JSON.stringify(bookmarksFolderTree));

  // const getRootNodes = () => {
  //   if(bookmarksFolderTree.id === "0"){
  //     return bookmarksFolderTree.children;
  //   }
  // };


  const setIsOpen =(node,updatedTree)=>{     
    debugger;
    updatedTree.map((folder)=>{
      if(folder.id===node.id){
        folder.isOpen = !node.isOpen;
        return updatedTree;
      }
      else{
        setIsOpen(node,folder.children);
      }
    })
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
        />)
      }
      )}
    </div>
  );
};
export default Tree;

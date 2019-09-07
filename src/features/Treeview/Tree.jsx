import React, { useState, useEffect } from "react";
import TreeNode from "./TreeNode";

const Tree = props => {
  let [bookmarksFolderTree, setbookmarksTree] = useState(
    props.bookmarkFolderTree[0].children
  );

  useEffect(() => {
    let updatedTree = [...bookmarksFolderTree];
    setbookmarksTree(preselectNode(updatedTree));
  }, []);

  const preselectNode = updatedTree => {
    // let openedFolderTree=[...bookmarksFolderTree];
    for (let i = 0; i < updatedTree.length; i++) {
      if (updatedTree[i].id === props.selectedBookmark.parentId) {
        updatedTree[i].isSelected = true;
        openParentNode(updatedTree[i]);
        // console.log(JSON.stringify(openedFolderTree));
        return updatedTree;
      } else {
        preselectNode(updatedTree[i].children);
      }
    }
    return updatedTree;
  };
  const openParentNode = (node) => {
    if(node.parent) {
      node.parent.isOpen = true;
      openParentNode(node.parent);
    }
  };

  const setIsOpen = (node, updatedTree, type) => {
    for (let i = 0; i < updatedTree.length; i++) {
      switch (type) {
        case "Collaps":
          if (updatedTree[i].id === node.id) {
            updatedTree[i].isOpen = !node.isOpen;
            break;
          } else {
            setIsOpen(node, updatedTree[i].children, type);
          }
          break;
        case "Select":
          if (updatedTree[i].id === node.id) {
            updatedTree[i].isSelected = true;
          } else {
            updatedTree[i].isSelected = false;
          }
          setIsOpen(node, updatedTree[i].children, type);
          break;
        default:
          break;
      }
    }
    return updatedTree;
  };

  const onToggle = node => {
    let updatedTree = [...bookmarksFolderTree];
    props.changedBookamrkFolder.push(node);
    setbookmarksTree(setIsOpen(node, updatedTree, "Collaps"));
  };

  const onNodeSelect = node => {
    let updatedTree = [...bookmarksFolderTree];
    props.changedBookamrkFolder.push(node);
    setbookmarksTree(setIsOpen(node, updatedTree, "Select"));
    props.onSelect(node);
  };
  return (
    <>
      {bookmarksFolderTree.map(item => {
        return (
          <TreeNode
            backgroundColor={props.backgroundColor}
            node={item}
            onToggle={onToggle}
            onNodeSelect={onNodeSelect}
            key={item.id}
          />
        );
      })}
    </>
  );
};
export default Tree;

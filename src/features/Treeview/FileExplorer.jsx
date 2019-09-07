import React from "react";
import Tree from "./Tree";
import "./TreeView.css";

const FileExplorer = (props) => {

  const onSelect=(selectedolder)=>{
    props.setselectedFolder(selectedolder);
  }

  return (
    <div className="tree-view-container">
      <div className="tree-wrapper">
        <Tree changedBookamrkFolder={props.changedBookamrkFolder} selectedBookmark={props.selectedBookmark} backgroundColor= {props.backgroundColor} bookmarkFolderTree={props.bookmarkFolderTree} onSelect={onSelect} key={props.bookmarkFolderTree.id} />
      </div>
    </div>
  );
};

export default FileExplorer;

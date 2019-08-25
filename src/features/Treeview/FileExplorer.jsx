import React, { useState } from "react";
import Tree from "./Tree";
import "./TreeView.css";

const FileExplorer = (props) => {

  const onSelect=(selectedolder)=>{
    props.setselectedFolder(selectedolder);
  }

  return (
    <div className="StyledFileExplorer">
      <div className="TreeWrapper">
        <Tree bookmarkFolderTree={props.bookmarkFolderTree} onSelect={onSelect} key={props.bookmarkFolderTree.id} />
      </div>
    </div>
  );
};

export default FileExplorer;

import React, { useState } from "react";
import Tree from "./Tree";
import "./TreeView.css";

const FileExplorer = () => {
  const [selectedFile, setselectedFile] = useState(null);

  const onSelect = file => setselectedFile(file);

  return (
    <div className="StyledFileExplorer">
      <div className="TreeWrapper">
        <Tree onSelect={onSelect} />
      </div>
      <div>
        {selectedFile && selectedFile.type === "file" && selectedFile.content}
      </div>
    </div>
  );
};

export default FileExplorer;

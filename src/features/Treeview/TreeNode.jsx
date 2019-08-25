import React from 'react';
import {FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import "./TreeView.css";

const TreeNode = (props) => {
    const { backgroundColor, node, level, onToggle, onNodeSelect } = props;
    const getPaddingLeft = ({level}) => {
        let paddingLeft = level * 20;
        return paddingLeft;
      }
      
      const StyledTreeNode = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px 8px;
        padding-left: ${(level, type) => getPaddingLeft(level, type)}px;
        &:hover {
          cursor: pointer;
        }
      `;
      
      const NodeIcon = styled.div`
        font-size: 12px;
        min-width: 12px;
        margin-right:  ${props => props.marginRight ? props.marginRight : "5"}px;
      `;
      
      const getNodeLabel = (node) => node.title;
  

  return (
    <>
      <StyledTreeNode level={level} className={node.isSelected?"folder-selected":""} role="button" onClick={() => onNodeSelect(node)}>
        <NodeIcon onClick={() => onToggle(node)}>
          { node.children.length>0 ? (node.isOpen ? <FaChevronDown /> : <FaChevronRight />):<></>}
        </NodeIcon>
        
        <NodeIcon marginRight={10}>
          {/* { node.type === 'file' && <FaFile /> } */}
          { node.isOpen === true && <FaFolderOpen /> }
          { !node.isOpen && <FaFolder /> }
        </NodeIcon>
        

        <span>
          { getNodeLabel(node) }
        </span>
      </StyledTreeNode>

      { node.isOpen && node.children.map(childNode => (
        <TreeNode 
          {...props}
          node={childNode}          
          level={level + 1}
          key={childNode.id}
        />
      ))}
    </>
  );
}

TreeNode.defaultProps = {
  level: 0,
};

export default TreeNode;
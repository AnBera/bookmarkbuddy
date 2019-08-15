import React, { useState } from 'react';
import values from 'lodash/values';

import TreeNode from './TreeNode';

const Tree =(onSelect)=> {
const data = {
        '/root': {
          path: '/root',
          type: 'folder',
          isRoot: true,
          children: ['/root/david', '/root/jslancer'],
        },
        '/root/david': {
          path: '/root/david',
          type: 'folder',
          children: ['/root/david/readme.md'],
        },
        '/root/david/readme.md': {
          path: '/root/david/readme.md',
          type: 'file',
          content: 'Thanks for reading me me. But there is nothing here.'
        },
        '/root/jslancer': {
          path: '/root/jslancer',
          type: 'folder',
          children: ['/root/jslancer/projects', '/root/jslancer/vblogs'],
        },
        '/root/jslancer/projects': {
          path: '/root/jslancer/projects',
          type: 'folder',
          children: ['/root/jslancer/projects/treeview'],
        },
        '/root/jslancer/projects/treeview': {
          path: '/root/jslancer/projects/treeview',
          type: 'folder',
          children: [],
        },
        '/root/jslancer/vblogs': {
          path: '/root/jslancer/vblogs',
          type: 'folder',
          children: [],
        },
      };
      
const [nodes,setNodes]= useState(data);

  const getRootNodes = () => {
    return values(nodes).filter(node => node.isRoot === true);
  }

  const getChildNodes = (node) => {
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  }  

  const onToggle = (node) => {
    nodes[node.path].isOpen = !node.isOpen;
    setNodes(nodes);
  }

  const onNodeSelect = node => {
    onSelect(node);
  }
  return (
      <div>
        { getRootNodes().map(node => (
          <TreeNode 
            node={node}
            getChildNodes={getChildNodes}
            onToggle={onToggle}
            onNodeSelect={onNodeSelect}
          />
        ))}
      </div>
    )
}
export default Tree;
import Bookmark from "../class/Bookmark";

export const flattenNode = (node, result) => {
  if (node.children) {
    node.children.forEach(child => {
      if (child.url && child.title) {
        result.push(
          new Bookmark(
            child.title,
            child.url,
            child.dateAdded,
            child.id,
            child.index,
            child.parentId,
            node.title
          )
        );
      }
      flattenNode(child, result);
    });
  }
};

/*global chrome*/

const flattenNode = (node, result = [], bookmarkCreationDates = [], bookmarkUrls = [], bookmarkFolderTree = [], parentFolder) => {
    const { children, id, dateAdded, index, parentId, title } = node;
    if (children) {
        const folderObj = {
            id,
            children: [],
            dateAdded,
            index,
            parentId,
            title,
            isSelected: false,
            isOpen: false,
            parent: parentFolder
        };
        bookmarkFolderTree.push(folderObj);
        node.children.forEach(child => {
            const { url, title, dateAdded, id, index, parentId } = child;
            if (url && title) {
                result.push({
                    title,
                    url,
                    dateAdded,
                    id,
                    index,
                    parentId,
                    category: node.title
                });
                bookmarkCreationDates.push(dateAdded);
                bookmarkUrls.push(url);
            }
            flattenNode(child, result, bookmarkCreationDates, bookmarkUrls, folderObj.children, folderObj);
        });
    }
};

const getChromeBookmarkTree = () => {
    chrome.bookmarks.getTree(treeNode => {
        flattenNode(treeNode[0]);
    });
}

chrome.extension.onConnect.addListener(port => {
    console.log("Connected .....");
    port.onMessage.addListener(() => {
        port.postMessage(flattenedBookmarks);
    });
});

chrome.bookmarks.onCreated.addListener(getChromeBookmarkTree);
chrome.bookmarks.onRemoved.addListener(getChromeBookmarkTree);
chrome.bookmarks.onChanged.addListener(getChromeBookmarkTree);

getChromeBookmarkTree();

/*global chrome*/
import React, { useState } from "react";
import { Button, Header, Image, Modal, Card, Icon } from "semantic-ui-react";
import FileExplorer from "../Treeview/FileExplorer";
import { debounce } from "../../app/common/util/Util";

const EditBookmark = props => {
  const [selectedFolder, updateselectedFolder] = useState(null);

  const updateChromeBookmark = bookmark => {
    chrome.bookmarks.update(
      bookmark.id,
      { title: bookmark.title, url: bookmark.url },
      err => {}
    );
    if (selectedFolder) {
      chrome.bookmarks.move(
        bookmark.id,
        {
          parentId: selectedFolder.id
        },
        result => {
          updateselectedFolder(null);
          props.closeModal("save");
        }
      );
    } else {
      props.closeModal("save");
    }
  };

  const setselectedFolder = selectedFolder => {
    updateselectedFolder(selectedFolder);
  };
  return (
    <Modal
      size="tiny"
      dimmer="blurring"
      open={props.isOpen}
      closeOnDimmerClick={false}
      style={{ boxShadow: "inset 0 0 25px #33373f" }}
    >
      <Modal.Header style={{ backgroundColor: "#282c34" }}>
        <Image
          className="padding-right-medium"
          src={`chrome://favicon/${props.selectedBookmark.Url}`}
          style={{ display: "inline", verticalAlign: "baseline" }}
        />
        <span style={{ color: "#FFF", display: "inline", fontSize: "1.2rem" }}>
          Edit Bookmark
        </span>
      </Modal.Header>
      <Modal.Content
        scrolling
        style={{ backgroundColor: "#282c34", paddingTop: 0 }}
      >
        <Card fluid style={{ boxShadow: "none" }}>
          <Card.Content>
            <form className="ui form">
              <div className="field">
                <label style={{ color: "#7e7e7e" }}>Bookmark Title</label>
                <input
                  style={{ backgroundColor: "#333842", color: "#FFF" }}
                  type="text"
                  onChange={e => {
                    debounce(
                      props.updateBookamark({
                        ...props.selectedBookmark,
                        title: e.target.value
                      }),
                      250
                    );
                  }}
                  required
                  name="title"
                  value={props.selectedBookmark.title}
                  placeholder="Title"
                />
              </div>
              <div className="field">
                <label style={{ color: "#7e7e7e" }}>Bookmark Url</label>
                <input
                  style={{ backgroundColor: "#333842", color: "#FFF" }}
                  onChange={e => {
                    props.updateBookamark(
                      debounce(
                        props.updateBookamark({
                          ...props.selectedBookmark,
                          url: e.target.value
                        })
                      ),
                      250
                    );
                  }}
                  type="text"
                  required
                  name="url"
                  value={props.selectedBookmark.url}
                  placeholder="Url"
                />
              </div>
              <div className="two fields">
                <div className="field">
                  <label style={{ color: "#7e7e7e" }}>Select Folder</label>
                  <FileExplorer
                    changedBookamrkFolder={props.changedBookamrkFolder}
                    selectedBookmark={props.selectedBookmark}
                    backgroundColor={
                      props.colorsMap[props.selectedBookmark.category]
                    }
                    setselectedFolder={node => setselectedFolder(node)}
                    bookmarkFolderTree={props.bookmarkFolderTree}
                  />
                </div>
              </div>
            </form>
          </Card.Content>
        </Card>
      </Modal.Content>
      <Modal.Actions style={{ backgroundColor: "#282c34" }}>
        <Button
          onClick={e => {
            e.preventDefault();
            props.closeModal("cancel");
          }}
          basic
          inverted
        >
          <Icon name="remove" /> Cancel
        </Button>
        <Button
          color="green"
          inverted
          onClick={e => {
            e.preventDefault();
            updateChromeBookmark(props.selectedBookmark);
          }}
        >
          <Icon name="save" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default EditBookmark;

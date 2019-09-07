/*global chrome*/
import React,{useState} from "react";
import { Button, Header, Image, Modal, Card } from "semantic-ui-react";
import FileExplorer from "../Treeview/FileExplorer";
import { debounce } from "../../app/common/util/Util";

const EditBookmark = props => {
const[selectedFolder,updateselectedFolder]=useState(null);

  const updateChromeBookmark = bookmark => {
    chrome.bookmarks.update(
      bookmark.id,
      { title: bookmark.title, url: bookmark.url },
      err => {
        props.closeModal();
      }
    );
    if (selectedFolder) {
      chrome.bookmarks.move(
        bookmark.id,
        {
          parentId: selectedFolder.id,
          index: selectedFolder.index
        },
        result => {
          updateselectedFolder(null);          
        }
      );
    }
  };

  const setselectedFolder = selectedFolder => {
    updateselectedFolder( selectedFolder);
  };
  return (
    <Modal dimmer={true} open={props.isOpen} closeOnDimmerClick={false} Close={props.closeModal}>
      <Modal.Header>
        <Image
          className="padding-right-medium"
          src={`chrome://favicon/${props.selectedBookmark.Url}`}
        />
        <Header>Edit Bookmark</Header>
      </Modal.Header>
      <Modal.Content>
        <Card fluid>
          <Card.Content>
            <form className="ui form">
              <div className="field">
                <label style={{ color: "#FFFFFF" }}>Bookmark Title</label>
                <input
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
                <label style={{ color: "#FFFFFF" }}>Bookmark Url</label>
                <input
                  onChange={e => {
                    props.updateBookamark(
                      debounce(
                        props.updateBookamark({
                          ...props.bookmark,
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
                  <label style={{ color: "#FFFFFF" }}>Select Folder</label>
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
      <Modal.Actions>
        <Button color="black"  onClick={e => {e.preventDefault();props.closeModal();}}>
          Cancel
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Save"
          onClick={e => {
            e.preventDefault();
            updateChromeBookmark(props.selectedBookmark);
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};
export default EditBookmark;

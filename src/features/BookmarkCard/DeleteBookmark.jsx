/*global chrome*/
import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const RemoveBookmark = props => {
  const removeBookmark = () => {
    chrome.bookmarks.remove(props.Objbookmark.id, () => {
      props.closeModal();
      window.location.reload();
    });
  };

  return (
    <>
      <Modal
        dimmer="blurring"
        open={props.isOpen}
        closeOnEscape={false}
        basic
        size="small"
      >
        <Header icon="trash alternate outline" content="Delete Bookmark" />
        <Modal.Content>
          <p>{`Do you want to remove ${props.Objbookmark.title}?`}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => props.closeModal()} basic inverted>
            <Icon name="remove" /> Cancel
          </Button>
          <Button onClick={() => removeBookmark()} color="red" inverted>
            <Icon name="trash alternate" /> Remove
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default RemoveBookmark;

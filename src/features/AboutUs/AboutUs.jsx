import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const AboutUs = props => {
//   const removeBookmark = () => {
//     chrome.bookmarks.remove(props.Objbookmark.id, () => {
//       props.closeModal();
//       window.location.reload();
//     });
//   };

  return (
    <>
      <Modal
        size='tiny' 
        dimmer="blurring"
        open={props.isOpen}
        // closeOnEscape={false}
      >
        <Header icon="trash alternate outline" content="About Bookmarkby" />
        <Modal.Content>
          <p>Thank you for using Bookmarkby! Hope you enjoyed using it.</p>
          <hr></hr>
          <p>If you found any bug please raise it here</p>
          <p>If you have any idea about a new feature or a feedback please let us know.</p>
          <hr></hr>
          Created by Bylabs
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => props.closeModal()} basic inverted>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default AboutUs;

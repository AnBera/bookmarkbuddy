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
        <Header className="modal-background" icon="info circle inverted" content="About Bookmarkby" style={{color:"#FFF"}} />
        <Modal.Content className="modal-background">
          <p>
              Hope you enjoyed using Bookmarkby! Please like / Follow our page in
              <br/><br/>
              <strong><a href="https://www.facebook.com/bookmarkby/" target="_blank" rel="noopener noreferrer"> 
                <i aria-hidden="true" class="facebook official icon"></i>
              Facebook </a></strong>
            
             <strong><a href="https://www.linkedin.com/company/bookmarkby/" target="_blank" rel="noopener noreferrer"> 
             <i aria-hidden="true" class="linkedin icon"></i>
             LinkedIn </a></strong>
            
             <strong><a href="https://twitter.com/bookmarkby/" target="_blank" rel="noopener noreferrer"> 
             <i aria-hidden="true" class="twitter square icon"></i>
             Twitter 
             </a></strong> 
            
             <strong><a href="https://www.instagram.com/bookmark_by/" target="_blank" rel="noopener noreferrer"> 
             <i aria-hidden="true" class="instagram icon"></i>
             Instagram </a></strong>
            
          </p>
          <p className="dashed-separator">If you come across any bug please raise it here. It will redirect you to github. You need to Click New issue button and then login to github.</p>
          <p>Do you have a brilliant idea about a new feature or you want to share any feedback? 
          <br/><br/>
          <strong><a href="#" target="_blank" rel="noopener noreferrer"> 
             <i aria-hidden="true" class="mail icon"></i>
             Please reach out to us</a></strong>
              </p>
          <p className="dashed-separator">Created by a bunch passionate engineers burning a lot of midnight oil.</p>
        </Modal.Content>
        <Modal.Actions className="modal-background">
          <Button onClick={() => props.closeModal()} basic inverted>
            got it
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default AboutUs;

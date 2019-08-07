/*global chrome*/
import React,{useState} from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const RemoveBookmark = props => {
    const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const removeBookmark=()=>{
    chrome.bookmarks.remove(props.Objbookmark.id, ()=>{
        close();
        window.location.reload();
    })
    } 
    const close=()=>{
        setisDeleteModalOpen(false);  
    }  

  return (
    <>
   <Icon onClick={e => {e.preventDefault(); setisDeleteModalOpen(true);}} size='large' name="trash"/>
    <Modal
    open={isDeleteModalOpen}
    closeOnEscape={false}
      basic
      size="small"
    >
      <Header icon="trash alternate outline" content="Delete Bookmark" />
      <Modal.Content>
        <p>{`Do you want to remove ${props.Objbookmark.title}?`}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => removeBookmark()} color="red" inverted>
          <Icon name="trash alternate" /> Remove
        </Button>
        <Button onClick={()=>close()} basic color="green" inverted>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
    </>
  );
};

export default RemoveBookmark;

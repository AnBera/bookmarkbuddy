class Bookmark {
  title;
  url;
  dateAdded;
  id;
  index;
  parentId;
  category;

  get Title() {
    return this.title;
  }

  set Title(title) {
    this.title = title;
  }

  get Url() {
    return this.url;
  }

  set Url(url) {
    this.url = url;
  }

  get DateAdded() {
    return this.dateAdded;
  }

  set DateAdded(dateAdded) {
    this.dateAdded = dateAdded;
  }

  get Id() {
    return this.id;
  }

  set Id(id) {
    this.id = id;
  }

  get Index() {
    return this.index;
  }

  set Index(index) {
    this.index = index;
  }

  get ParentId() {
    return this.parentId;
  }

  set ParentId(parentId) {
    this.parentId = parentId;
  }

  get CategoryName() {
    return this.category;
  }

  set CategoryName(category) {
    this.category = category;
  }

  constructor(title, url, dateAdded, id, index, parentId, category) {
    this.title = title;
    this.url = url;
    this.dateAdded = dateAdded;
    this.id = id;
    this.index = index;
    this.parentId = parentId;
    this.category = category;
  }
}

export default Bookmark;

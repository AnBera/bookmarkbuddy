import React from "react";
import BookmarkDashboard from "../../features/BookmarkDashboard/BookmarkDashboard";
import PopupContainer from "../../features/PopupContainer"
function App() {
  return (
    <div className="App">
     {window.location.search.includes("fullscreen=true")? <BookmarkDashboard/>:<PopupContainer/>}
    </div>
  );
}

export default App;

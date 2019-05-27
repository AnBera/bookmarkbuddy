import { fork } from "redux-saga/effects";
import watchBookmarkPreview from "./watchers/BookmarkPreview";

export default function* rootSaga() {
  yield fork(watchBookmarkPreview);
}

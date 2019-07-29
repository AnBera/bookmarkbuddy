import { takeLatest } from "redux-saga/effects";
import { previewBookmarkSaga, convertPreviewImagesSaga, saveUrlsToDBSaga } from "../sagas/previewBookmarkSaga";
import * as SagaActions from "../Actions/SagaActions";

export default function* watchConvertPreviewImages() {
  yield takeLatest(SagaActions.CALL_PREVIEW_BOOKMARK_API, previewBookmarkSaga);
  yield takeLatest(SagaActions.CALL_CONVERT_IMAGES_API, convertPreviewImagesSaga);
  yield takeLatest(SagaActions.CALL_SAVE_URLS_API, saveUrlsToDBSaga);
}

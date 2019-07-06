import { takeLatest } from "redux-saga/effects";
import { previewBookmarkSaga, convertPreviewImagesSaga } from "../sagas/previewBookmarkSaga";
import * as SagaActions from "../Actions/SagaActions";

export default function* watchConvertPreviewImages() {
  yield takeLatest(SagaActions.CALL_PREVIEW_BOOKMARK_API, previewBookmarkSaga);
  yield takeLatest(SagaActions.CALL_CONVERT_IMAGES_API, convertPreviewImagesSaga);
}

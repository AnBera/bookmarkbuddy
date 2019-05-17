import { takeLatest } from 'redux-saga/effects';
import { previewBookmarkSaga } from '../sagas/previewBookmarkSaga';

import * as SagaActions from '../Actions';


export default function* watchUserAuthentication() {
  yield takeLatest(SagaActions.CALL_PREVIEW_BOOKMARK_API, previewBookmarkSaga);
}
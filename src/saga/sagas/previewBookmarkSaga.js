import { put, call } from 'redux-saga/effects';
import { previewBookmarkService } from '../../services/PreviewBookmarkService';

import * as ReduxActions from '../../redux/Actions/ReduxActions'

export function* previewBookmarkSaga(siteUrl) {
  try {
    const response = yield call(previewBookmarkService, siteUrl);
    yield [
      put({ type: ReduxActions.SET_BOOKMARK_PREVIEW, response })
    ];
  } catch(error) {
    yield put({ type: ReduxActions.FAILED_TO_SET_BOOKMARK_PREVIEW, error });
  }
}

// export function* loginSaga(payload) {
//   try {
//     const response = yield call(loginUserService, payload);
//     yield [
//       put({ type: types.LOGIN_USER_SUCCESS, response })
//     ];
//   } catch(error) {
//     yield put({ type: types.LOGIN_USER_ERROR, error })
//   }
//}
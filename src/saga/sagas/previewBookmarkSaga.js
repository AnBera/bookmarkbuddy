import {
  put,
  call
} from "redux-saga/effects";
import {
  previewBookmarkService,
  convertPreviewImagesService,
  saveUrls
} from "../../services/PreviewBookmarkService";
import * as ReduxActions from "../../redux/Actions/ReduxActions";

export function* previewBookmarkSaga(siteUrl) {
  try {
    const response = yield call(previewBookmarkService, siteUrl);
    yield [put({
      type: ReduxActions.SET_BOOKMARK_PREVIEW,
      response
    })];
  } catch (error) {
    yield put({
      type: ReduxActions.FAILED_TO_SET_BOOKMARK_PREVIEW,
      error
    });
  }
}

export function* convertPreviewImagesSaga(imagesUrls) {
  try {
    const response = yield call(convertPreviewImagesService, imagesUrls.urls);
    if (response) {
      yield put({
        type: ReduxActions.GOT_IMAGES_SUCCESSFULLY,
        response
      });
    }
  } catch (error) {
    yield put({
      type: ReduxActions.FAILED_TO_GET_IMAGES,
      error
    });
  }
}

export function* saveUrlsToDBSaga(imagesUrls) {
  try {
    const response = yield call(saveUrls, imagesUrls.urlObj);
    if (response) {
      yield put({
        type: ReduxActions.SAVED_URLS_SUCCESSFULLY,
        response
      });
    }
  } catch (error) {
    yield put({
      type: ReduxActions.SAVED_URLS_FAILED,
      error
    });
  }
}
import * as types from"../action/actionTypes";

import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
} from "../action/actions";

import {
  loadUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
} from "../api/api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}



function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 201) {
      yield put(createUserSuccess(response.data));
    }
  } catch (error) {
    yield put(createUserError(error.response.data));
  }
}

function* onDeleteUserStartAsync(contactId) {
  try {
    const response = yield call(deleteUserApi, contactId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(contactId));
    }
  } catch (error) {
    yield put(deleteUserError(error.response.data));
  }
}

function* onUpdateUserStartAsync({ payload: { id, data } }) {
  try {
    const response = yield call(updateUserApi, id, data);
    if (response.status === 200) {
      yield put(updateUserSuccess());
    }
  } catch (error) {
    yield put(updateUserError(error.response.data));
  }
}

function* onDeleteUser() {
  while (true) {
    const { payload: contactId } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, contactId);
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

const contactSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
];

export default function* rootSaga() {
  yield all([...contactSagas]);
}

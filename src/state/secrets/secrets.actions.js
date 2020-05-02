import { put, takeEvery } from 'redux-saga/effects'
import { createAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export const addSecret = createAction('secret/add', () => ({
  payload: uuidv4(),
}))

export const updateSecret = createAction('secret/update')

// https://redux-toolkit.js.org/tutorials/advanced-tutorial

export const DELETE_SECRET_START = 'DELETE_SECRET_START'
export const deleteSecret = id => ({
  type: DELETE_SECRET_START,
  payload: id,
})

export const DELETE_SECRET_CANCEL = 'DELETE_SECRET_CANCEL'
export const cancelDeleteSecret = id => ({
  type: DELETE_SECRET_CANCEL,
  payload: id,
})

export const DELETE_TIMEOUT = 3000

export const DELETE_SECRET_CONFIRM = 'DELETE_SECRET_CONFIRM'
function* confirmDeleteSecret(action) {
  yield new Promise(resolve => setTimeout(resolve, DELETE_TIMEOUT))
  yield put({
    type: DELETE_SECRET_CONFIRM,
    payload: action.id,
  })
}

function* saga() {
  yield takeEvery('DELETE_SECRET_START', confirmDeleteSecret)
}

export default saga

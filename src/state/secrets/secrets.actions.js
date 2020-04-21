import { put, takeEvery } from 'redux-saga/effects'

export const ADD_SECRET = 'ADD_SECRET'
export const addSecret = () => ({
  type: ADD_SECRET,
})

export const UPDATE_SECRET = 'UPDATE_SECRET'
export const updateSecret = (id, toUpdate) => ({
  type: UPDATE_SECRET,
  id,
  toUpdate,
})

export const DELETE_SECRET_START = 'DELETE_SECRET_START'
export const deleteSecret = id => ({
  type: DELETE_SECRET_START,
  id,
})

export const DELETE_SECRET_CANCEL = 'DELETE_SECRET_CANCEL'
export const cancelDeleteSecret = id => ({
  type: DELETE_SECRET_CANCEL,
  id,
})

export const DELETE_TIMEOUT = 3000

export const DELETE_SECRET_CONFIRM = 'DELETE_SECRET_CONFIRM'
function* confirmDeleteSecret(action) {
  yield new Promise(resolve => setTimeout(resolve, DELETE_TIMEOUT))
  yield put({
    type: DELETE_SECRET_CONFIRM,
    id: action.id,
  })
}

function* saga() {
  yield takeEvery('DELETE_SECRET_START', confirmDeleteSecret)
}

export default saga

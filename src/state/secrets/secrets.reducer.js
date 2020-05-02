import { createReducer } from '@reduxjs/toolkit'
import remove from 'lodash/remove'

import {
  addSecret,
  updateSecret,
  DELETE_SECRET_START,
  DELETE_SECRET_CANCEL,
  DELETE_SECRET_CONFIRM,
} from './secrets.actions'

export const initState = {
  byId: {},
  ordered: [],
  saving: false,
}

export default createReducer(initState, {
  [addSecret]: (state, { payload: id }) => {
    state.byId[id] = {
      id,
      label: '',
      value: '',
      expirationDate: '',
    }
    state.ordered.push(id)
  },
  [updateSecret]: (state, action) => {
    const { id, ...toUpdate } = action.payload
    state.byId[id] = {
      ...state.byId[id],
      ...toUpdate,
    }
  },
  [DELETE_SECRET_START]: (state, action) => {
    const id = action.payload

    state.byId[id].isDeleting = true
  },
  [DELETE_SECRET_CANCEL]: (state, action) => {
    const id = action.payload

    state.byId[id].isDeleting = false
  },
  [DELETE_SECRET_CONFIRM]: (state, action) => {
    const id = action.payload

    if (state.byId[id].isDeleting) {
      delete state.byId[id]
      remove(state.ordered, i => i === id)
    }
  },
})

// export default (state = initState, action) => {
//   switch (action.type) {
//     case ADD_SECRET: {
//       const id = uuidv4()

//       return {
//         ...state,
//         byId: {
//           ...state.byId,
//           [id]: {
//             id,
//             label: '',
//             value: '',
//             expirationDate: '',
//           },
//         },
//         ordered: [...state.ordered, id],
//       }
//     }

//     case UPDATE_SECRET: {
//       const { id, toUpdate } = action

//       return {
//         ...state,
//         byId: {
//           ...state.byId,
//           [id]: {
//             ...state.byId[id],
//             ...toUpdate,
//           },
//         },
//       }
//     }

//     case DELETE_SECRET_START: {
//       const { id } = action

//       return {
//         ...state,
//         byId: {
//           ...state.byId,
//           [id]: {
//             ...state.byId[id],
//             isDeleting: true,
//           },
//         },
//       }
//     }

//     case DELETE_SECRET_CANCEL: {
//       const { id } = action

//       return {
//         ...state,
//         byId: {
//           ...state.byId,
//           [id]: {
//             ...state.byId[id],
//             isDeleting: false,
//           },
//         },
//       }
//     }

//     case DELETE_SECRET_CONFIRM: {
//       if (!state.byId[action.id].isDeleting) {
//         return state
//       }

//       const { byId } = state
//       delete byId[action.id]

//       return {
//         ...state,
//         byId,
//         ordered: state.ordered.filter(id => id !== action.id),
//       }
//     }

//     default:
//       return state
//   }
// }

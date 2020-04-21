import { v4 as uuidv4 } from 'uuid'

import {
  ADD_SECRET,
  UPDATE_SECRET,
  DELETE_SECRET_START,
  DELETE_SECRET_CANCEL,
  DELETE_SECRET_CONFIRM,
} from './secrets.actions'

export const initState = {
  byId: {},
  order: [],
  saving: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_SECRET: {
      const id = uuidv4()

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            id,
            label: '',
            value: '',
            expirationDate: '',
          },
        },
        order: [...state.order, id],
      }
    }

    case UPDATE_SECRET: {
      const { id, toUpdate } = action

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            ...toUpdate,
          },
        },
      }
    }

    case DELETE_SECRET_START: {
      const { id } = action

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            isDeleting: true,
          },
        },
      }
    }

    case DELETE_SECRET_CANCEL: {
      const { id } = action

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            isDeleting: false,
          },
        },
      }
    }

    case DELETE_SECRET_CONFIRM: {
      if (!state.byId[action.id].isDeleting) {
        return state
      }

      const { byId } = state
      delete byId[action.id]

      return {
        ...state,
        byId,
        order: state.order.filter(id => id !== action.id),
      }
    }

    default:
      return state
  }
}

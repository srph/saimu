const init = {
  data: [],
  id: 0
}

export default function reducer(state = init, action) {
  switch (action.type) {
    case 'toast:emit.data': {
      return {
        ...state,
        id: state.id + 1,
        data: [action.payload, ...state.data]
      }
    }

    case 'toast:remove': {
      return {
        ...state,
        data: state.data.filter(item => item.id === action.payload)
      }
    }
  }

  return state
}

export function toast(message) {
  return {
    type: 'toast:emit!',
    payload: message
  }
}
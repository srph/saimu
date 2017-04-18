const initial = {
  data: {},
  customizing: false,
  resolved: false
}

export default function config(state = initial, action) {
  switch(action.type) {
    case 'config:fetch.data': {
      return {
        ...state,
        data: action.payload,
        resolved: true
      }
    }

    case 'config:customize': {
      return {
        ...state,
        customizing: !state.customizing
      }
    }

    case 'config:create.data': {
      return {
        ...state,
        data: action.payload,
        customizing: false,
        resolved: true
      }
    }
  }

  return state
}

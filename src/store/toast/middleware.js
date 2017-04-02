export default function toast({dispatch, getState}) {
  return (next) => {
    return (action) => {
      const result = next(action)
      
      switch(action.type) {
        case 'toast:emit!': {
          const {id} = getState().toast

          dispatch({
            type: 'toast:emit.data',
            payload: {
              id,
              message: action.payload
            }
          })

          setTimeout(() => {
            dispatch({ type: 'toast:remove', payload: id })
          }, 10000)

          break
        }
      }

      return result
    }
  }
}
import store from 'app/store'

export default function toast(message) {
  return app.store.dispatch({
    type: 'toast:emit!',
    payload: message
  })
}
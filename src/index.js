import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import CommentApp from './containers/CommentApp'
import commentsReducer from './reducers/comment'
import './index.css'

const store = createStore(commentsReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <CommentApp />
  </Provider>
  , document.getElementById('root')
)

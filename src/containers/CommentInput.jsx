import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comment'

class CommentInputContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  componentWillMount () {
    this._loadUsername()
  }

  _loadUsername () {
    const username = window.localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _saveUsername (username) {
    window.localStorage.setItem('username', username)
  }

  handleSubmitComment (comment) {
    if (!comment) {
      return
    }
    if (!comment.username) {
      return window.alert('Please enter username!')
    }
    if (!comment.content) {
      return window.alert('Please enter content')
    }
    const newComments = [...this.props.comments, comment]
    window.localStorage.setItem('comments', JSON.stringify(newComments))
    if (this.props.onSubmit) {
      console.log(this.props.onSubmit, 'cool')
      this.props.onSubmit(comment)
    }
  }

  render () {
    return (
      <CommentInput
        username={this.username}
        onUsernameInputBlur={this._saveUsername.bind(this)}
        onSubmit={this.handleSubmitComment.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => ({ comments: state.comments })
const mapDispatchToProps = (dispatch) => ({
  onSubmit (comment) {
    dispatch(addComment(comment))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer)

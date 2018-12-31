import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initComments, deleteComment } from '../reducers/comment'
import CommentList from '../components/CommentList'

class CommentListContainer extends Component {
  componentWillMount () {
    this._loadComments()
  }

  _loadComments () {
    let comments = window.localStorage.getItem('comments')
    console.log(comments)
    comments = comments ? JSON.parse(comments) : []
    this.props.initComments(comments)
  }

  handleDeleteComment (index) {
    const { comments } = this.props
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ]
    window.localStorage.setItem('comments', newComments)
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render () {
    return (
      <CommentList
        comments={this.props.comments}
        onDeleteComment={this.handleDeleteComment.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => ({ comments: state.comments })

const mapDispatchToProps = (dispatch) => ({
  initComments (comments) {
    dispatch(initComments(comments))
  },
  onDeleteComment (commentIndex) {
    dispatch(deleteComment(commentIndex))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer)

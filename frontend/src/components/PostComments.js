import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { ModalStyles } from '../styles/ModalStyles';
import { selector } from '../selectors/';
import CommentForm from './CommentForm';
import Comment from './Comment';
import {
  startAddComment,
  startEditComment,
  startGetPostComments,
} from '../actions/comments';

class PostComments extends Component {
  state = {
    modalIsOpen: false,
    initialValues: {},
    editMode: false,
  }

  componentDidMount() {
    const { postID } = this.props;
    this.props.startGetPostComments(postID);
  }

  _toggleModal = () => {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen,
    }));
  }

  _openModal = (initialValues, editMode = false) => {
    this.setState(() => ({
      modalIsOpen: true,
      editMode,
      initialValues,
    }));
  }

  _submitComment = (values) => {
    const { editMode } = this.state;

    if (!editMode) {
      const comment = {
        parentId: this.props.postID,
        ...values,
      };

      this.props.startAddComment(comment);
    } else {
      this.props.startEditComment(values);
    }

    this._toggleModal();
  }

  render() {
    const {
      commentCount,
      filteredCommentCount,
      comments,
    } = this.props;

    const {
      editMode,
      initialValues,
    } = this.state;

    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          style={ModalStyles}
          onRequestClose={this._toggleModal}
        >
          <CommentForm
            initialValues={initialValues}
            onSubmit={this._submitComment}
            handleCancel={this._toggleModal}
            editMode={editMode}
          />
        </Modal>
        Showing {filteredCommentCount} of {commentCount} Comments
        <button
          onClick={() => this._openModal({}, false)}
        >New Comment
        </button>
        {comments.length > 0 && comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            openModal={(initialvalues) => this._openModal(initialvalues, true)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ comments: commentsObj, sorting }) => {
  let comments = Object.keys(commentsObj).map(commentId => commentsObj[commentId]);
  const commentCount = comments.length;

  comments = selector(comments, '', sorting); // Filter out da spam comments (if filter ON)

  const filteredCommentCount = comments.length;

  return {
    comments,
    commentCount,
    filteredCommentCount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddComment: (comment) => dispatch(startAddComment(comment)),
  startEditComment: (comment) => dispatch(startEditComment(comment)),
  startGetPostComments: (id) => dispatch(startGetPostComments(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostComments);

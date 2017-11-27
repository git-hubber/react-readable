import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { ModalStyles } from '../styles/ModalStyles';
import PostForm from './PostForm';
import Post from './Post';
import { startEditPost } from '../actions/posts';

class Posts extends Component {
  state = {
    modalIsOpen: false,
    initialValues: {},
  }

  _toggleModal = () => {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen,
    }));
  }

  _openModal = (initialValues) => {
    this.setState(() => ({
      modalIsOpen: true,
      initialValues,
    }));
  }

  _submitPost = (values) => {
    const editedPost = {
      id: this.state.initialValues.id,
      title: values.title,
      body: values.body,
    };

    this.props.startEditPost(editedPost);
    this._toggleModal();
  }

  render() {
    const { posts } = this.props;
    const {
      modalIsOpen,
      initialValues,
    } = this.state;

    return (
      <div>
        <h1>Posts [{posts.length}]</h1>
        <Modal
          isOpen={modalIsOpen}
          style={ModalStyles}
          onRequestClose={this._toggleModal}
        >
          <PostForm
            initialValues={initialValues}
            onSubmit={this._submitPost}
            handleCancel={this._toggleModal}
            editMode
          />
        </Modal>

        {posts.length > 0 && posts.map((post) => <Post key={post.id} post={post} openModal={this._openModal} />)}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEditPost: (post) => dispatch(startEditPost(post)),
});

export default connect(null, mapDispatchToProps)(Posts);


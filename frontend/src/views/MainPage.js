import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { ModalStyles } from '../styles/ModalStyles';
import PostForm from '../components/PostForm';
import SortingHeader from '../components/SortingHeader';
import Posts from '../components/Posts';
import { selector } from '../selectors/';

import { startAddPost } from '../actions/posts';

class MainPage extends Component {
  state = {
    modalIsOpen: false,
  }

  _toggleModal = () => {
    this.setState((prevState) => ({ modalIsOpen: !prevState.modalIsOpen }));
  }

  _submitPost = (values) => {
    this.props.startAddPost(values);
    this._toggleModal();
  }

  render() {
    const category = this.props.match.params.id;
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          style={ModalStyles}
          onRequestClose={this._toggleModal}
        >
          <PostForm
            initialValues={{ category }}
            onSubmit={this._submitPost}
            handleCancel={this._toggleModal}
            editMode={false}
          />
        </Modal>
        <button
          onClick={this._toggleModal}
        >New Post
        </button>
        <SortingHeader />
        {this.props.posts && <Posts posts={this.props.posts} />}
      </div>
    );
  }
}

const mapStateToProps = ({ posts, sorting }, { match: { params: { id: category } } }) => ({
  posts: selector(posts, category, sorting),
});

const mapDispatchToProps = (dispatch) => ({
  startAddPost: (post) => dispatch(startAddPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);


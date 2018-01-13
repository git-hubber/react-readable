import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { ModalStyles } from '../styles/ModalStyles';
import PostForm from '../components/PostForm';
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
    const { category } = this.props.match.params;
    return (
      <div className='container'>
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
        {this.props.posts && <Posts
          category={category}
          posts={this.props.posts}
          newPost={this._toggleModal}
        />}
      </div>
    );
  }
}

const mapStateToProps = ({ posts, sorting }, { match: { params: { category } } }) => ({
  posts: selector(posts, category, sorting),
});

const mapDispatchToProps = (dispatch) => ({
  startAddPost: (post) => dispatch(startAddPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);


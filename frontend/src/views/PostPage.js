import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { ModalStyles } from '../styles/ModalStyles';
import PostForm from '../components/PostForm';

import ItemVote from '../components/ItemVote';
import ItemFooter from '../components/ItemFooter';
import PostComments from '../components/PostComments';
import {
  startEditPost,
  startVotePost,
  startDeletePost,
} from '../actions/posts';

const defaultPost = {
  body: '',
  category: '',
  commentCount: 0,
  voteScore: 0,
  title: '',
  id: '',
  timestamp: 0,
  author: '',
};

class PostPage extends Component {
  state = {
    modalIsOpen: false,
  }

  _toggleModal = () => {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen,
    }));
  }

  _submitPost = (values) => {
    const editedPost = {
      id: this.props.post.id,
      title: values.title,
      body: values.body,
    };

    this.props.startEditPost(editedPost);
    this._toggleModal();
  }

  _castVote(option) {
    const {
      id,
    } = this.props.post;
    this.props.startVotePost(id, option);
  }

  _deletePost = () => {
    const {
      id,
    } = this.props.post;
    const deleteConfirm = window.confirm('Are you sure?');
    if (deleteConfirm) {
      this.props.startDeletePost(id);
      this.props.history.goBack();
    }
  }

  render() {
    const {
      modalIsOpen,
    } = this.state;

    const {
      match: { params: { id } },
      post: {
        body,
        voteScore,
        title,
        author,
        timestamp,
        category,
      },
    } = this.props;
    const datetime = moment(timestamp).format('DD MMMM YYYY HH:mm');

    return (
      <div className='container'>
        <div id="posts">
          <Modal
            isOpen={modalIsOpen}
            style={ModalStyles}
            onRequestClose={this._toggleModal}
          >
            <PostForm
              initialValues={{ title, body }}
              onSubmit={this._submitPost}
              handleCancel={this._toggleModal}
              editMode
            />
          </Modal>
          <div className="posts-header">
            {title}
          </div>
          <div className="post">
            <ItemVote
              castVote={(option) => this._castVote(option)}
              voteScore={voteScore}
            />
            <div className='post-content'>

              {body}

              <div className="dot-point"><span>@</span> {datetime}</div>
              <div className="dot-point"><span>by</span> {author} <span>in</span> {category}</div>

            </div>

            <ItemFooter
              openModal={this._toggleModal}
              deleteItem={this._deletePost}
            />
          </div>
        </div>
        <PostComments
          postID={id}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ posts }, { match: { params: { id } } }) => {
  const post = posts[id] || defaultPost;

  return {
    post,
  };
};

const mapDispatchToProps = (dispatch) => ({
  startEditPost: (post) => dispatch(startEditPost(post)),
  startVotePost: (id, option) => dispatch(startVotePost(id, option)),
  startDeletePost: (id) => dispatch(startDeletePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);

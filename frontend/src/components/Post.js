import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ItemVote from './ItemVote';
import ItemFooter from './ItemFooter';
import {
  startVotePost,
  startDeletePost,
} from '../actions/posts';
import { startGetPostComments } from '../actions/comments';

class Post extends Component {
  state = {
    commentCount: this.props.commentCount,
  };

  componentDidMount() {
    const { id } = this.props.post;
    this.props.startGetPostComments(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commentCount) {
      this.setState({ commentCount: nextProps.commentCount });
    }
  }

  _castVote = (option) => {
    const { id } = this.props.post;
    this.props.startVotePost(id, option);
  };

  _deletePost = () => {
    const { id } = this.props.post;
    this.props.startDeletePost(id);
  };

  _openModal = () => {
    const {
      id,
      title,
      body,
    } = this.props.post;
    this.props.openModal({ id, title, body });
  };

  render() {
    const {
      commentCount,
    } = this.state;

    const {
      id,
      voteScore,
      title,
      author,
      timestamp,
      category,
    } = this.props.post;
    const datetime = moment(timestamp).format('DD MMMM YYYY HH:mm');
    const fromNow = moment(timestamp).fromNow();

    return (
      <div>
        <ItemVote
          castVote={(option) => this._castVote(option)}
          voteScore={voteScore}
        />
        <Link to={`/post/${id}`}>{title}</Link> - {author} - {timestamp} - {datetime} - {category} - [{commentCount} Comments]
        <ItemFooter
          openModal={this._openModal}
          deleteItem={this._deletePost}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ comments: commentsObj, sorting }, ownProps) => {
  let comments = Object.keys(commentsObj).map(commentId => commentsObj[commentId]);
  comments = comments.filter(comment => ownProps.post.id === comment.parentId);
  const commentCount = comments.length;

  return {
    commentCount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  startVotePost: (id, option) => dispatch(startVotePost(id, option)),
  startDeletePost: (id) => dispatch(startDeletePost(id)),
  startGetPostComments: (id) => dispatch(startGetPostComments(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

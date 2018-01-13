import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import ItemVote from '../components/ItemVote';
import ItemFooter from './ItemFooter';
import {
  startVoteComment,
  startDeleteComment,
} from '../actions/comments';

const Comment = ({ comment, startVoteComment, startDeleteComment, openModal }) => {
  const {
    id,
    author,
    body,
    timestamp,
    voteScore,
  } = comment;

  const datetime = moment(timestamp).format('DD MMMM YYYY HH:mm');

  const _castVote = (option) => {
    startVoteComment(id, option);
  };

  const _deleteComment = () => {
    const deleteConfirm = window.confirm('Are you sure?');
    if (deleteConfirm) startDeleteComment(id);
  };

  const _openModal = () => {
    openModal({ id, body });
  };

  return (
    <div className='comment'>
      <ItemVote
        castVote={(option) => _castVote(option)}
        voteScore={voteScore}
      />
      <div className='comment-content'>
        {body}
        <div className="dot-point"><span>@</span> {datetime}</div>
        <div className="dot-point"><span>by</span> {author}</div>
      </div>

      <ItemFooter
        openModal={_openModal}
        deleteItem={_deleteComment}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startVoteComment: (id, option) => dispatch(startVoteComment(id, option)),
  startDeleteComment: (comment) => dispatch(startDeleteComment(comment)),
});

export default connect(null, mapDispatchToProps)(Comment);

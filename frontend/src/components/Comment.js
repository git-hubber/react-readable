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
  const fromNow = moment(timestamp).fromNow();

  const _castVote = (option) => {
    startVoteComment(id, option);
  };

  const _deleteComment = () => {
    startDeleteComment(id);
  };

  const _openModal = () => {
    openModal({ id, body });
  };

  return (
    <div>
      <ItemVote
        castVote={(option) => _castVote(option)}
        voteScore={voteScore}
      />
    Comment: {id} - {body} - by {author} - {timestamp} - {datetime} - {voteScore}
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

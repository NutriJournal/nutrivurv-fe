import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../../gql/mutations.js';
import { useFetchUser } from '../../lib/Auth0/user.js';

const AddComment = (props) => {
  // Holding the user's comment in state.
  const [commentBody, setCommentBody] = useState('');
  const postId = props.data.post_by_pk.id;
  const { user } = useFetchUser();

  const [addPostComment] = useMutation(ADD_COMMENT);

  const handleChange = (e) => {
    setCommentBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentBody) {
      alert("You didn't add a comment");
    } else {
      addPostComment({
        variables: {
          postId: postId,
          body: commentBody,
        },
      });
      setCommentBody('');
      props.refetch();
    }
  };

  return (
    <div className="w-full my-8">
      <p className="text-xs mb-2">Comment as {props.data.user.name}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="75"
          value={commentBody}
          className="w-full bg-gray-10 resize-none"
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="bg-cyan-300 text-white text-xs muli w-40 py-1 my-4 rounded float-right"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;

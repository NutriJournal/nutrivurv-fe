import React, { useState } from 'react';
import withApollo from '../../lib/apollo.js';
import { useMutation } from '@apollo/react-hooks';
import { ADD_POST } from '../../gql/mutations.js';
import { CenteredContainer } from '../../components/Layout/LayoutPrimitives.js';
import Layout from '../../components/Layout/index.js';
import { useRouter } from 'next/router';
import { useFetchUser } from '../../lib/Auth0/user.js';

const CreatePost = () => {
  const router = useRouter();
  const [postData, setPostData] = useState({});
  const [addPost] = useMutation(ADD_POST);
  const { user } = useFetchUser();

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({
      variables: {
        user_id: user.sub,
        title: postData.title,
        body: postData.body,
      },
    });
    router.push('/forum/posts');
  };

  return (
    <Layout>
      <CenteredContainer>
        <h1 className="text-xl muli my-2">Create a Post</h1>
        <div className="w-full mb-12">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <input
                placeholder="Title"
                className="my-4 p-2 border rounded-sm border-gray-100"
                name="title"
                onChange={handleChange}
              ></input>
              <textarea
                rows="15"
                cols="75"
                placeholder="Text"
                className="w-full resize-none p-2 border rounded-sm border-gray-100"
                name="body"
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="float-right muli text-xs rounded w-24 py-1 mx-2 my-4 bg-cyan-300 text-white"
            >
              Create
            </button>
            <button className="float-right muli text-xs rounded w-24 py-1 mx-2 my-4 text-cyan-300 border border-cyan-300">
              Cancel
            </button>
          </form>
        </div>
      </CenteredContainer>
    </Layout>
  );
};

export default withApollo(CreatePost);

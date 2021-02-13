import withApollo from '../../lib/apollo';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { GET_POST_DETAILS } from '../../gql/queries.js';
import Layout from '../../components/Layout/index';
import CommentCard from '../../components/forum/CommentCard.js';
import Comment from '../../components/forum/Comment.js';
import PostIcons from '../../components/forum/PostIcons';

const post = () => {
  const router = useRouter();
  const id = router.query;

  const { data, loading, error, refetch } = useQuery(GET_POST_DETAILS, {
    variables: { id: id.post },
  });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `There was an error getting the post, ${error}`;
  }

  return (
    <>
      <Layout>
        <div className=" px-64">
          <Link href="/forum/posts" replace>
            <button className="flex justify-start my-4">Back</button>
          </Link>
          <h1 className="muli text-2xl">{data.post_by_pk.title}</h1>

          <div className="flex justify-between my-4">
            <p>Posted by {data.post_by_pk.user.name}</p>
            <div className="flex justify-end w-1/2">
              <PostIcons data={data.post_by_pk} />
            </div>
          </div>

          <p>{data.post_by_pk.body}</p>

          <Comment data={data} refetch={refetch} />

          <div>
            {data.post_by_pk.comments.map((comment) => {
              return (
                <CommentCard key={comment.id} data={comment} me={data.me} />
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default withApollo(post, { ssr: true });

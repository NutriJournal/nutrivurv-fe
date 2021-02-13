import { useState } from 'react';
import MoreIconSVG from '../svg/MoreIconSVG.js';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_VIEW_COUNT, UPDATE_LIKE_COUNT } from '../../gql/mutations';
import Menu from './Menu.js';
import PostIcons from './PostIcons.js';
import { useFetchUser } from '../../lib/Auth0/user.js';

const TopicCard = (props) => {
  console.log(props.data);
  const router = useRouter();
  const { user } = useFetchUser();
  const [showMenu, setShowMenu] = useState(false);
  const isOwnPost = props.data.user.id === user.sub;

  /* Uncomment after fixing bug in the mutation 
    don't forget to uncomment the viewCount icon in PostIcons.js */

  // let previousViews = props.data.viewCount === null ? 0 : props.data.viewCount;

  // const [updateViews] = useMutation(UPDATE_VIEW_COUNT);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleChange = (e) => {
    e.preventDefault();
    // updateViews({
    //   variables: {
    //     id: props.data.id,
    //     viewCount: (previousViews += 1),
    //   },
    //   optimisticResponse: {
    //     __typename: "Mutation",
    //     updatePost: {
    //       id: props.data.id,
    //       __typename: "Post",
    //       viewCount: (previousViews++),
    //     },
    //   },
    // });
    router.push('/forum/[post]', `/forum/${props.data.id}`);
  };

  return (
    <div className="border-b-2 border-gray-50">
      <div className="flex">
        <div className="w-1/2">
          <h1
            className="muli text-2xl my-4 cursor-pointer"
            onClick={handleChange}
          >
            {props.data.title}
          </h1>
          <p className="mb-4">{props.data.user.name}</p>
        </div>
        <div className="flex flex-1"></div>
        <div className="flex align-middle">
          <PostIcons data={props.data} />
          <div
            className={`my-4 mx-2 w-1/4 ${isOwnPost ? 'cursor-pointer' : ''}`}
            onClick={isOwnPost ? toggleMenu : undefined}
          >
            {showMenu ? (
              <Menu
                data={props.data}
                showMenu={showMenu}
                toggleMenu={toggleMenu}
                refetch={props.refetch}
                isOwnPost={isOwnPost}
              />
            ) : (
              <MoreIconSVG />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;

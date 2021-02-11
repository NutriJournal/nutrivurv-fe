import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { CREATE_PROFILE, CREATE_WEIGHT_LOG } from '../../gql/mutations';
import { currentDate } from '../../lib/utils';
import { ME } from '../../gql/queries';

export default function Macros({ user, setUser }) {
  const router = useRouter();
  const date = new Date(Date.now());
  // Fields needed createProfile mutation
  const variables = {
    age: parseInt(user.age) || 0,
    height: parseInt(user.height) || 0,
    gender:
      user.gender === 'true' ? true : user.gender === 'false' ? false : null,
    weight: user.weight || 0,
    goal_weight: user.goalWeight || 0,
    activity_level: user.activityLevel || 0,
    fat: user.fat || 0,
    carbs: user.carbs || 0,
    protein: user.protein || 0,
    calories: user.calories || 0,
    diet: user.diet || '',
  };

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: parseInt(e.target.value) });
  }

  const [createProfile] = useMutation(CREATE_PROFILE);
  const [createWieghtLog] = useMutation(CREATE_WEIGHT_LOG);

  const handleSubmit = async () => {
    // createProfile
    const { loading, data: profileData, error } = await createProfile({
      variables: variables,
      refetchQueries: [
        {
          query: ME,
        },
      ],
    });

    if (error) {
      alert(`${error}`);
    }

    if (!loading && profileData) {
      // If success create a weightLog, so that the dashboard graph doesn't freak out once redirected
      const { loading, data } = await createWieghtLog({
        variables: {
          date: currentDate(),
          current_weight: user.weight,
        },
        refetchQueries: [
          {
            query: ME,
          },
        ],
      });

      if (error) {
        alert(`${error}`);
      }

      if (!loading && data) {
        router.push('/journal/[user]', `/journal/user`);
      }
    }
  };

  return (
    <>
      <h2 className="flex flex-col text-5xl self-center mb-8">
        Tracking Macros
      </h2>
      <h3 className="font-extrabold text-md self-start px-2 my-4">
        Enter your goal amount for each macro:
      </h3>
      <form className="flex flex-col w-full px-12 mb-12">
        <div className="flex my-8">
          <div className="w-1/2">Carbs</div>
          <input
            onChange={handleChange}
            name="carbs"
            className="w-1/2 flex-shrink border-b"
            placeholder="Daily Goal"
          />
        </div>
        <div className="flex my-8">
          <div className="w-1/2">Fat</div>
          <input
            onChange={handleChange}
            name="fat"
            className="w-1/2 flex-shrink border-b"
            placeholder="Daily Goal"
          />
        </div>
        <div className="flex my-8">
          <div className="w-1/2">Protein</div>
          <input
            onChange={handleChange}
            name="protein"
            className="w-1/2 flex-shrink border-b"
            placeholder="Daily Goal"
          />
        </div>
        <div className="flex my-8">
          <div className="w-1/2">Calories</div>
          <input
            onChange={handleChange}
            name="calories"
            className="w-1/2 flex-shrink border-b"
            placeholder="Daily Goal"
          />
        </div>
      </form>
      <button
        className="w-full py-2 text-white text-2xl bg-blue-400 rounded hover:bg-item-hover self-center"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </>
  );
}

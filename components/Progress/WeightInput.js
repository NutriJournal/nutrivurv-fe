import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import {
  UPDATE_WEIGHT_LOG,
  CREATE_WEIGHT_LOG,
  UPDATE_PROFILE,
} from '../../gql/mutations';
import { GET_WEIGHT_LOGS } from '../../gql/queries';
import { currentDate } from '../../lib/utils';

export default function WeightInput() {
  const [weight, setWeight] = useState();
  const [updateWeightLog] = useMutation(UPDATE_WEIGHT_LOG);
  const [createWeightLog] = useMutation(CREATE_WEIGHT_LOG);

  // Could get rid of this mutation with a circular reference to the user in MyWeightLogs
  const [updateProfileWeight] = useMutation(UPDATE_PROFILE);

  const { data, loading, error, refetch } = useQuery(GET_WEIGHT_LOGS);

  if (error) return `${error}`;
  if (loading) return 'Loading ...';

  const {
    weight_log,
    user: { profile },
  } = data;

  const handleChange = (e) => {
    setWeight(e.target.valueAsNumber);
  };

  const lastWeightLogId = weight_log[0].id;
  const lastWeightLogDate = weight_log[0].date;
  const date = new Date(Date.now());
  const today = currentDate;

  function updateDashWeight() {
    const { age, height } = profile;
    updateProfileWeight({
      variables: {
        age: age,
        weight: weight,
        height: height,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateProfile: {
          id: profile.id,
          __typename: 'Profile',
          weight: weight,
        },
      },
    });
  }

  function createWeight() {
    createWeightLog({
      variables: {
        date: today,
        current_weight: weight,
      },
    });
    updateDashWeight();
    setWeight(NaN);
    refetch();
  }

  function updateWeight() {
    updateWeightLog({
      variables: {
        id: lastWeightLogId,
        current_weight: weight,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateWeightLog: {
          id: lastWeightLogId,
          __typename: 'WeightLog',
          current_weight: weight,
        },
      },
    });
    updateDashWeight();
    setWeight(NaN);
  }

  const hasRecordForToday = today === lastWeightLogDate;

  const handleSubmit = () => {
    hasRecordForToday
      ? updateWeight() && updateDashWeight()
      : createWeight() && updateDashWeight();
  };

  return (
    <div className="flex border rounded w-full mt-6">
      <input
        className="flex-1 pl-2"
        type="number"
        placeholder={`${
          hasRecordForToday ? 'Update Weight' : "Enter Today's Weight"
        }`}
        name="dailyWeight"
        value={weight}
        onChange={handleChange}
      ></input>
      <button
        className="border rounded bg-blue-400 text-white px-6 py-2"
        onClick={handleSubmit}
      >
        Log Weight
      </button>
    </div>
  );
}

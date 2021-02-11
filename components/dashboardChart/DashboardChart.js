import { useState } from 'react';
import DashboardChartItem from './DashboardChartItem.js';
import { useMutation, useQuery } from '@apollo/react-hooks';

import {
  DELETE_FOOD_LOG_RECORD,
  ADD_FOOD,
  UPDATE_FAVORITE_STATUS,
} from '../../gql/mutations.js';
import { Spacer } from '../Layout/LayoutPrimitives.js';
import {
  GET_OPEN_LOG_STATE,
  GET_DOUGHNUT_DATA,
  GET_FOODJOURNAL_LOGS,
} from '../../gql/queries.js';
import { totalUpPropertyValuesInArray, chunkArr } from '../../lib/utils';

const DashboardChart = ({ records }) => {
  const [currChunk, setCurrChunk] = useState(0);

  const [updateFavStatus] = useMutation(UPDATE_FAVORITE_STATUS);

  const {
    loading,
    error,
    data: { mealType, logType },
  } = useQuery(GET_OPEN_LOG_STATE);

  const [deleteItem] = useMutation(DELETE_FOOD_LOG_RECORD);

  const [addFood, { client, data }] = useMutation(ADD_FOOD);

  async function deleteRecord(id) {
    await deleteItem({
      variables: { id: id },
      refetchQueries: [
        {
          query: GET_DOUGHNUT_DATA,
        },
        {
          query: GET_FOODJOURNAL_LOGS,
        },
      ],
    });
  }

  async function reLogFood(variables) {
    await addFood({ variables: variables });
    client.writeData({ data: { ...data, logType: 'daily' } });
  }

  if (loading) return 'Loading ...';
  if (error) return `${error}`;

  const toggleFav = (item) => {
    updateFavStatus({
      variables: {
        id: item.id,
        favorite: !item.favorite,
      },
    });
    const updateItem = { ...item, favorite: !item.favorite };
    return updateItem;
  };

  const activeRecords = records.filter(
    (record) => record.meal_type === mealType
  );

  const totalCalories = totalUpPropertyValuesInArray(activeRecords, 'calories');
  const isDailyRecord = logType === 'daily';
  const calorieLabel = isDailyRecord ? `${totalCalories} total calories` : '';

  const chunkedRecords = chunkArr(activeRecords, 5);

  return (
    <section className="dashboard-chart w-full flex flex-col">
      <div className="w-full flex">
        <div className="flex w-5/12 items-center justify-evenly py-3">
          <div className="w-1/3 text-sm">{`${activeRecords.length} items logged`}</div>
          <div className=" text-sm">{calorieLabel}</div>
        </div>
        <div className="flex w-7/12 justify-center items-center">
          <div className="w-1/6 text-sm text-center">Calories</div>
          <div className="w-1/6 text-sm text-center">Fats</div>
          <div className="w-1/6 text-sm text-center">Protein</div>
          <div className="w-1/6 text-sm text-center">Carbs</div>
          <Spacer />
        </div>
      </div>
      <div>
        {chunkedRecords.length !== 0 &&
          chunkedRecords[currChunk].map((cv) => {
            return (
              <DashboardChartItem
                data={cv}
                key={cv.id}
                toggleFav={toggleFav}
                deleteRecord={deleteRecord}
                reLogFood={reLogFood}
                isDailyRecord={isDailyRecord}
              />
            );
          })}
      </div>
      {
        <span
          className={`flex mt-40 ${
            chunkedRecords.length <= 1 ? 'hidden' : ''
          } pb-6`}
        >
          <Spacer />
          <button
            className="px-2 py-1 border w-1/6 disabled:text-gray-100 disabled:cursor-default"
            disabled={currChunk === 0}
            onClick={() => setCurrChunk(currChunk - 1)}
          >
            previous
          </button>
          <button
            className="px-2 py-1 border w-1/6 disabled:text-gray-100 disabled:cursor-default"
            disabled={currChunk === chunkedRecords.length - 1}
            onClick={() => setCurrChunk(currChunk + 1)}
          >
            next
          </button>
          <Spacer />
        </span>
      }
    </section>
  );
};

export default DashboardChart;

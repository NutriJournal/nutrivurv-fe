import { Spacer } from '../Layout/LayoutPrimitives';
import { useQuery } from '@apollo/react-hooks';
import { ME, GET_DOUGHNUT_DATA } from '../../gql/queries';
import DonutGraph from './DonutGraph';
import { useRouter } from 'next/router';
import { currentRecords } from '../../lib/utils';
import { useState, useEffect } from 'react';

const DonutContainer = () => {
  const { data } = useQuery(GET_DOUGHNUT_DATA);
  const router = useRouter();
  const [doughnutData, setDoughnutData] = useState({});
  // value useed to add negative bottom margin to the graph if on the food journal page
  const inJournal = router.asPath.split('/')[1] === 'journal';

  useEffect(() => {
    data && setDoughnutData(totals);
  }, [data]);

  const chartData = {
    datasets: [
      {
        data: [doughnutData.fat, doughnutData.carbs, doughnutData.protein],
        backgroundColor: ['#1F7DA2', '#9ABA19', '#00426C'],
        hoverBackgroundColor: ['#035c80', '#4D8037', '#002942'],
      },
    ],
    labels: ['Fat', 'Carbs', 'Protein'],
  };

  if (!data) return 'Loading...';

  const user = data.user[0];
  // Default values so the graph isn't busted if it's the first time they've visited for the day
  const defaultValuesForNoRecords = { fat: 0.33, carbs: 0.33, protein: 0.33 };
  // Filter for todays records
  const graphRecords = currentRecords(data.daily_record);

  const totals = !graphRecords.length
    ? defaultValuesForNoRecords
    : deriveDoughnutValues(graphRecords);

  // Written so that it can be exported to utils if there is use for it somewhere else down tha road
  function deriveDoughnutValues(dataObj) {
    let newObj = {};
    Object.keys(dataObj).map((record) => {
      Object.keys(dataObj[record]).map((prop) => {
        if (typeof dataObj[record][prop] === 'number') {
          newObj[prop]
            ? (newObj[prop] = newObj[prop] += dataObj[record][prop])
            : (newObj[prop] = dataObj[record][prop]);
        }
      });
    });
    return newObj;
  }

  return (
    <div
      className={`w-1/5 flex justify-around mt-16 -mr-32 ${
        inJournal ? '-mb-24' : ''
      }`}
    >
      <div className="flex flex-col -mr-12 justify-end text-center pb-6">
        <div className="flex items-baseline">
          <div className="text-3xl">
            {user.profile && user.profile.weight
              ? user.profile.weight
              : 'Add Your Weight!'}
          </div>
          <div>lbs</div>
        </div>
        <div>Weight</div>
      </div>
      <div className=" w-96 flex flex-col justify-center">
        <DonutGraph data={chartData} />
        <h2 className="w-full text-center font-semibold text-xl pt-4">
          Daily Intake
        </h2>
        <p
          className={`text-center ${!doughnutData.calories ? 'hidden' : ''}`}
        >{`${doughnutData.calories} Calories`}</p>
      </div>
      <div className="flex flex-col -ml-12 justify-end text-center pb-6">
        <div className="flex items-baseline">
          <div className="text-3xl">
            {data.weight_log ? data.weight_log.length : 'Start Tracking!'}
          </div>
          <div>days</div>
        </div>
        <div>Streak</div>
      </div>
    </div>
  );
};

export default DonutContainer;

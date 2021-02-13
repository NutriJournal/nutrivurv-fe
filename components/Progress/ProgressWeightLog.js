import { useState, useEffect } from 'react';
import ProgressWeightLogItem from './ProgressWeightLogItem.js';
import WeightInput from './WeightInput.js';

const ProgressWeightLog = (props) => {
  var sorted = {};

  // this is what will get mapped to generate elements
  const [sortedLogs, setSortedLogs] = useState({});

  // this object is used to pair string values to months
  const monthObj = {
    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  };

  const logs = () => {
    let logArr = [];
    props.data.weight_log.map((record) => {
      logArr.push({
        date: record.date,
        weight: record.current_weight,
      });
    });
    return logArr;
  };

  useEffect(() => {
    // expects an array of objects that have a date key
    // expects date key to be MM/DD/YYYY
    // matches the MM to a month string, sets the key of
    // sacrificial object
    // has a ternary operator to check for existence of current key
    // this is to prevent spreading not iterable error
    logs().map((cv) => {
      const monthChars = cv.date.split('/')[0];
      const currentMonth = Object.keys(monthObj).filter((curval) => {
        return monthObj[curval] == monthChars;
      })[0];
      return (sorted = {
        ...sorted,
        [currentMonth]: sorted[currentMonth]
          ? [...sorted[currentMonth], cv]
          : [cv],
      });
    });

    setSortedLogs(sorted);
  }, [props.data]);

  return (
    <div className="p-3">
      <h2 className="text-base muli font-normal">Your logs:</h2>
      {Object.keys(sortedLogs).length > 0
        ? Object.keys(sortedLogs).map((cv) => {
            return (
              <ProgressWeightLogItem
                key={`${cv}`}
                data={sortedLogs[cv]}
                month={cv}
              />
            );
          })
        : ''}
      <WeightInput />
    </div>
  );
};

export default ProgressWeightLog;

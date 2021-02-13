import React from 'react';
import { Line } from 'react-chartjs-2';

const Graph = (props) => {
  const formatDate = (date) => {
    let month = date.split('-')[1];
    let day = date.split('-')[2];
    if (month.split('')[0] === 0) {
      month = month.split('')[1];
    }

    if (day.split('')[0] === 0) {
      day = day.split('')[1];
    }
    return `${month}/${day}`;
  };

  const weightData = () => {
    let weightArr = [];
    props?.data?.map((record) => {
      weightArr.push(record.current_weight);
    });
    return weightArr;
  };

  const weightLabels = () => {
    let weightArr = [];
    props?.data?.map((record) => {
      weightArr.push(formatDate(record.date));
    });
    return weightArr;
  };

  const weightObj = {
    labels: weightLabels().reverse(),
    weights: weightData().reverse(),
  };

  const graphData = {
    datasets: [
      {
        labels: weightObj.labels,
        data: weightObj.weights,
        label: 'Weight',
      },
    ],
  };

  const graphOptions = {
    layout: {
      padding: 50,
    },

    maintainAspectRatio: false,

    title: {
      display: true,
      text: 'Your Progress',
    },

    scales: {
      yAxes: {
        ticks: {
          min: 100,
          max: 300,
        },
      },

      xAxes: [
        {
          type: 'category',
          labels: graphData.datasets[0].labels,
        },
      ],
    },
  };

  return (
    <div className=" h-96">
      <Line data={graphData} options={graphOptions} width={400} />
      <style jsx>{`
        canvas.chartjs-render-monitor {
          width: 100% !important;
          height: 65vh !important;
        }
      `}</style>
    </div>
  );
};

export default Graph;

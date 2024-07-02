'use client';

import { useAppSelector } from '@/redux/hooks';
import { faker } from '@faker-js/faker';
// import faker from 'faker';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const ChartEvents = () => {
  const { id } = useAppSelector((state) => state.user);
//   const { data: event } = useGetP({ id: id });

  const targetYear = 2024;

  // Initialize counts per month
  const eventsCountPerMonth = Array(12).fill(0);

//   if (event) {
//     Object.keys(event).forEach((key) => {
//       const date = new Date(event[Number(key)].createdAt);
//       if (date.getFullYear() === targetYear) {
//         const month = date.getMonth();
//         eventsCountPerMonth[month]++;
//       }
//     });
//   }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Statistic per Month in 2024',
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        // yAxisID: 'y',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ChartEvents;
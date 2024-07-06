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
import { FC } from 'react';
import { Line } from 'react-chartjs-2';

interface ShipmentCardProps {
  dataSet: number[] | undefined;  
  daysInMonth?: number;
  label: string;
  title: string;
}

const ChartEvents: FC<ShipmentCardProps> = ({
  dataSet,
  daysInMonth,
  label,
  title 
})=> {

  const labels: (number | string)[] = [];

if (daysInMonth) {
  for (let i = 1; i <= daysInMonth; i++) {
    labels.push(i);
  }
} else {
  labels.push(
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
    'December'
  );
}

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
        text: title,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: dataSet,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ChartEvents;
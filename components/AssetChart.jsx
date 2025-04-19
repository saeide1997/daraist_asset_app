'use client'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import Chance from 'chance';
  const chance = new Chance();


  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'دارایی',
        data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
        borderColor: 'rgb(227,179,74)',
        backgroundColor: 'rgb(227,179,74)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => chance.integer({ min: -1000, max: 1000 })),
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };
  
  export function AssetChart() {
    return <Line className='w-full' options={options} data={data} />;
  }
  
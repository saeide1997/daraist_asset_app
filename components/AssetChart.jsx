
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
import { useEffect, useState } from 'react';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' }); 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${Math.round(context.raw).toLocaleString()} تومان`;
        }
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return Number(value).toLocaleString(); // ۱٬۰۰۰٬۰۰۰
        }
      }
    }
  }
};

const formatMonth = (monthStr) => {
  const m = moment(monthStr, 'jYYYY-jMM');
  return `${m.format('jMMMM')} ${m.format('jYYYY')}`;
};

export function AssetChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (Array.isArray(data)) {
        data.sort((a, b) => a.month.localeCompare(b.month));

        const labels = data.map(item => formatMonth(item.month));
        const values = data.map(item => Math.round(item.average)); // بدون اعشار
        

        setChartData({
          labels,
          datasets: [
            {
              label: 'میانگین دارایی ماهانه',
              data: values,
              borderColor: 'rgb(227,179,74)',
              backgroundColor: 'rgba(227,179,74,0.4)',
              tension: 0.3,
              fill: true,
            },
          ],
        });
      }
    };

    fetchData();
  }, []);

  if (!chartData) return <p>در حال بارگذاری نمودار...</p>;

  return <Line className='w-full' options={options} data={chartData} />;
}

"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  BarController,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import inflationData from "../inflation.json";
import { formatScientificNotation } from "../utils/formatNymber";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 rounded-md ${className}`} />
);

ChartJS.register(
  LineController,
  BarController,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const InflationAssetChart = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات:", error);
      }
    };

    fetchData();
  }, []);

  if (!stats || stats.length === 0) {
    return (
      <div className="w-full ">
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  const labels = [];
  const assetNominal = [];
  const assetReal = [];
  const inflationRates = [];

  const statsMap = {};
  stats.forEach((item) => {
    const [year, month] = item.month.split("-");
    statsMap[`${year}/${month}`] = item.total;
  });

  let lastKnownAssetValue = null;

  inflationData.forEach((item) => {
    const month = String(item.month).padStart(2, "0");
    const key = `${item.year}/${month}`;

    labels.push(key);

    const nominal = statsMap[key];

    if (nominal != null) {
      lastKnownAssetValue = nominal;
    }

    assetNominal.push(lastKnownAssetValue ?? null);

    if (lastKnownAssetValue != null) {
      const real = lastKnownAssetValue / (1 + (item.inflation_rate ?? 0) / 100);
      assetReal.push(real);
    } else {
      assetReal.push(null);
    }

    inflationRates.push(item.inflation_rate);
  });

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "دارایی اسمی (تومان)",
        data: assetNominal,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        yAxisID: "y",
        tension: 0.4,
        spanGaps: true,
      },
      {
        type: "line",
        label: "دارایی واقعی (تومان)",
        data: assetReal,
        borderColor: "#10b981",
        backgroundColor: "#10b981",
        yAxisID: "y",
        tension: 0.4,
        spanGaps: true,
      },
      {
        type: "bar",
        label: "نرخ تورم (%)",
        data: inflationRates,
        backgroundColor: "#f59e0b",
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "مقدار دارایی (تومان)",
        },
        ticks: {
          callback: function (value) {
            return "\u202A" + formatScientificNotation(value);
          },
        },
      },
      y1: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "نرخ تورم (%)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            if (context.dataset.yAxisID === "y") {
              return new Intl.NumberFormat("fa-IR").format(value) + " تومان";
            }
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <div className="!w-full ">
      <Line className=" w-screen" data={data} options={options} />
    </div>
  );
};

export default InflationAssetChart;

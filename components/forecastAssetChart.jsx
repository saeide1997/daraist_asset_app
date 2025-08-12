"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { useEffect, useState } from "react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 rounded-md ${className}`} />
);

import inflationData from "../inflation.json";
import { formatScientificNotation } from "../utils/formatNymber";

ChartJS.register(
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const InflationAssetChart = () => {
  const [assetData, setAssetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setAssetData(data);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات:", error);
      }
    };

    fetchData();
  }, []);

  if (!assetData || assetData.length === 0) {
    return (
      <div className="w-full">
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  const monthAssetMap = {};
  assetData.forEach((asset) => {
    const monthKey = `${asset.month.substring(0, 4)}/${asset.month
      .substring(5, 7)
      .padStart(2, "0")}`;

    monthAssetMap[monthKey] = asset.total;
    console.log(monthAssetMap[monthKey]);
  });

  const labels = [];
  const assetNominal = [];
  const assetReal = [];
  const inflationRates = [];

  let lastKnownAssetValue = null;

  inflationData.forEach((inflation) => {
    const month = String(inflation.month).padStart(2, "0");
    const monthKey = `${inflation.year}/${month}`;
    labels.push(monthKey);

    const nominalValue = monthAssetMap[monthKey];

    if (nominalValue != null) {
      lastKnownAssetValue = nominalValue;
    }

    assetNominal.push(lastKnownAssetValue ?? null);

    if (lastKnownAssetValue != null) {
      const realValue =
        lastKnownAssetValue / (1 + (inflation.inflation_rate ?? 0) / 100);
      assetReal.push(realValue);
    } else {
      assetReal.push(null);
    }

    inflationRates.push(inflation.inflation_rate);
  });

  const lastInflations = inflationRates.slice(-6).filter((rate) => rate !== 0);
  const avgInflationRate =
    lastInflations.reduce((sum, rate) => sum + rate, 0) / lastInflations.length;

  const futureLabels = [];
  const predictedAssetNominal = [];
  const predictedAssetReal = [];

  const numMonthsToPredict = 6;
  let futureNominalValue = lastKnownAssetValue;

  const lastLabelParts = labels[labels.length - 1].split("/");
  let year = parseInt(lastLabelParts[0], 10);
  let month = parseInt(lastLabelParts[1], 10);

  for (let i = 1; i <= numMonthsToPredict; i++) {
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }

    const futureLabel = `${year}/${String(month).padStart(2, "0")}`;
    futureLabels.push(futureLabel);

    futureNominalValue *= 1 + avgInflationRate / 100;
    predictedAssetNominal.push(futureNominalValue);
    predictedAssetReal.push(futureNominalValue / (1 + avgInflationRate / 100));
  }

  const allLabels = [...labels, ...futureLabels];
  const fullNominal = [...assetNominal, ...predictedAssetNominal];
  const fullReal = [...assetReal, ...predictedAssetReal];
  const futureInflation = Array(numMonthsToPredict).fill(avgInflationRate);
  const fullInflationRates = [...inflationRates, ...futureInflation];

  const data = {
    labels: allLabels,
    datasets: [
      {
        type: "line",
        label: "دارایی اسمی (تاریخی + پیش‌بینی)",
        data: fullNominal,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        yAxisID: "y",
        tension: 0.4,
        spanGaps: true,
        borderDash: (ctx) => {
          if (!ctx || typeof ctx.dataIndex !== "number") return [];
          return ctx.dataIndex >= assetNominal.length ? [5, 5] : [];
        },
      },
      {
        type: "line",
        label: "دارایی واقعی (تاریخی + پیش‌بینی)",
        data: fullReal,
        borderColor: "#10b981",
        backgroundColor: "#10b981",
        yAxisID: "y",
        tension: 0.4,
        spanGaps: true,
        borderDash: (ctx) => {
          if (!ctx || typeof ctx.dataIndex !== "number") return [];
          return ctx.dataIndex >= assetReal.length ? [5, 5] : [];
        },
      },
      {
        type: "bar",
        label: "نرخ تورم (%)",
        data: fullInflationRates,
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
            label: (context) => {
              const value = context.parsed.y;
              if (context.dataset.yAxisID === "y") {
                return new Intl.NumberFormat("fa-IR").format(value) + " تومان";
              }
              return value + "%";
            };
          },
        },
      },
    },
  };

  return (
    <div className="!w-full ">
      <Line data={data} options={options} />
    </div>
  );
};

export default InflationAssetChart;

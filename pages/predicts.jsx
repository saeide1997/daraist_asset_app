// pages/predicts.jsx
import { CalendarMonth, HourglassEmpty, QueryBuilder } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function PredictsPage() {
  const MyDatePicker = ({ date, setDate }) => {
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        style={{
          width: "100%",
          border: "1px solid #e3b34a",
          borderRadius: "6px",
          padding: "10px",
          backgroundColor: "#f8fafc", // slate-50
          height: '3rem',
          direction: 'ltr'
        }}
      />
    );
  };
  const [date, setDate] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const assetId = searchParams.get("_id");
  const allParams = {};
  for (const [key, value] of searchParams.entries()) {
    allParams[key] = value;
  }
  console.log(allParams);
  const user_id = "663ab0e1f08b8a0010f4ad8b"; // در حالت واقعی از session یا context استفاده کن

  const handlePredict = async () => {
    if (!date) {
      setError("لطفاً یک تاریخ انتخاب کنید");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, user_id }),
      });

      if (!res.ok) {
        throw new Error("خطا در دریافت پاسخ از سرور");
      }

      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error(err);
      setError("خطا در پیش‌بینی. لطفاً بعداً تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-200/50 shadow-xl rounded-xl !h-screen">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl mb-4">
        <span className="text-3xl mx-2">پیش‌بینی ارزش دارایی</span>
        <HourglassEmpty className="!text-5xl text-[#e3b34a]" />
      </div>

      <div className="flex flex-col space-y-4 mx-8">
        <label className="block font-medium text-gray-700">تاریخ مد نظر:</label>
        <MyDatePicker
          date={date}
          setDate={(d) => setDate(d?.format?.("YYYY/MM/DD"))}
        />

        <button
          onClick={handlePredict}
          className="w-full bg-[#234350] text-white px-4 py-2 boxShadow hover:shadow-2xl rounded cursor-pointer hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "در حال پیش‌بینی..." : "پیش‌بینی کن"}
        </button>

        {prediction !== null && (
          <div className="bg-green-100 text-green-800 p-3 rounded mt-4 text-center font-medium">
            💰 پیش‌بینی مقدار دارایی:{" "}
            <strong>{prediction.toLocaleString()}</strong> تومان
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded mt-4 text-center font-medium">
            ❌ {error}
          </div>
        )}
      </div>
    </div>
  );
}

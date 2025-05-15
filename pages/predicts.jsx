// pages/predicts.jsx
import { useState } from 'react';

export default function PredictsPage() {
  const [date, setDate] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const user_id = '663ab0e1f08b8a0010f4ad8b'; // در حالت واقعی از session یا context استفاده کن

  const handlePredict = async () => {
    if (!date) {
      setError('لطفاً یک تاریخ انتخاب کنید');
      return;
    }

    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, user_id }),
      });

      if (!res.ok) {
        throw new Error('خطا در دریافت پاسخ از سرور');
      }

      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error(err);
      setError('خطا در پیش‌بینی. لطفاً بعداً تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6 mt-10">
      <h2 className="text-xl font-bold text-center">پیش‌بینی ارزش دارایی</h2>

      <div className="flex flex-col gap-3">
        <label className="font-medium">تاریخ مد نظر:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <button
          onClick={handlePredict}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
          disabled={loading}
        >
          {loading ? 'در حال پیش‌بینی...' : 'پیش‌بینی کن'}
        </button>

        {prediction !== null && (
          <div className="bg-green-100 text-green-800 p-3 rounded mt-4">
            💰 پیش‌بینی مقدار دارایی: <strong>{prediction.toLocaleString()}</strong> تومان
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded mt-4">
            ❌ {error}
          </div>
        )}
      </div>
    </div>
  );
}

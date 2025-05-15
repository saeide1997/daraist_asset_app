// 'use client';

// import { useState } from 'react';
// import { train } from '../lib/ml/model';
// // import { predictPrice } from '../lib/ml/predict';

// export default function PricePredictor() {
//   const [date, setDate] = useState('');
//   const [result, setResult] = useState(null);

//   const handleTrain = async () => {
//     await train();
//     alert('مدل آموزش داده شد!');
//   };

//   const handlePredict = async () => {
//     const predicted = await predictPrice(parseInt(date));
//     setResult(predicted);
//   };

//   return (
//     <div className="p-4">
//       <button onClick={handleTrain}>آموزش مدل</button>
//       <br />
//       <input
//         type="number"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         placeholder="مثلاً 6"
//       />
//       <button className='bg-red-500' onClick={handlePredict}>پیش‌بینی قیمت</button>
//       {result && <p>قیمت پیش‌بینی شده: {Math.round(result)} تومان</p>}
//     </div>
//   );
// }

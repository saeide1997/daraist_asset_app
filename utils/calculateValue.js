import inflationData from '../inflation.json'; // داده‌های تورم

// تابعی برای محاسبه تغییرات بر اساس تورم
export function calculateRealValue(initialValue, year) {
  // پیدا کردن نرخ تورم سال جاری
  const inflationRate = inflationData.find(data => data.year === year)?.inflation_rate;
  
  if (!inflationRate) {
    throw new Error('نرخ تورم برای سال مورد نظر پیدا نشد.');
  }

  // محاسبه ارزش واقعی با توجه به تورم
  const realValue = initialValue * (1 + inflationRate / 100);
  return realValue;
}

import SimpleLinearRegression from 'ml-regression-simple-linear';

/**
 * آموزش مدل رگرسیون خطی با داده‌های تاریخ و مقدار
 * @param {Array} data - آرایه‌ای از آبجکت‌ها با { date, totalValue }
 * @returns مدل آموزش‌دیده و اطلاعات کمکی
 */
export function trainModel(data) {
  // تبدیل تاریخ به timestamp
  const X = data.map(d => new Date(d.date).getTime());
  const y = data.map(d => d.totalValue);

  const regression = new SimpleLinearRegression(X, y);
  return regression;
}

/**
 * پیش‌بینی مقدار دارایی در یک تاریخ خاص
 * @param {Object} model - مدل آموزش‌دیده
 * @param {String|Date} date - تاریخ برای پیش‌بینی
 * @returns مقدار پیش‌بینی‌شده
 */
export function predictValue(model, date) {
  const timestamp = new Date(date).getTime();
  return model.predict(timestamp);
}

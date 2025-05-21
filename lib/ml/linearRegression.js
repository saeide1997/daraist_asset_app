const { SimpleLinearRegression } = require('ml-regression');

/**
 * مدل رگرسیون خطی ساده است که رابطه‌ای بین تاریخ (X) و مجموع دارایی (Y) پیدا می‌کند و بر اساس این رابطه، می‌تونه:
در تاریخ مشخصی (در آینده یا گذشته)، مجموع دارایی (totalValue) چقدر خواهد بود؟
 * آموزش مدل رگرسیون خطی با داده‌های تاریخ و مقدار
 * @param {Array} data - آرایه‌ای از آبجکت‌ها با { date, totalValue }
 * @returns مدل آموزش‌دیده
 */
function trainModel(data) {
  const X = data.map(d => new Date(d.date).getTime());
  const y = data.map(d => Number(d.totalValue));

  const regression = new SimpleLinearRegression(X, y);
  // console.log('X', X);
  // console.log('y', y);
  console.log(regression);
  return regression;
}

/**
 * پیش‌بینی مقدار دارایی در یک تاریخ خاص
 * @param {Object} model - مدل آموزش‌دیده
 * @param {String|Date} date - تاریخ برای پیش‌بینی
 * @returns مقدار پیش‌بینی‌شده
 */
function predictValue(model, date) {
  const timestamp = new Date(date).getTime();
  return model.predict(timestamp);
}

module.exports = { trainModel, predictValue };

// utils/formatNumber.js

export const formatNumber = (number) => {
    return new Intl.NumberFormat('fa-IR').format(number);
  };
  
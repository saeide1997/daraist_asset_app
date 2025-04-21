export function formatMonth(monthNumber) {
    const months = [
      "فروردین", "اردیبهشت", "خرداد",
      "تیر", "مرداد", "شهریور",
      "مهر", "آبان", "آذر",
      "دی", "بهمن", "اسفند"
    ];
    return months[monthNumber - 1] || "نامشخص";
  }
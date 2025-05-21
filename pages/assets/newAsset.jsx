"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormatListBulletedAdd } from "@mui/icons-material";

export default function NewAssetPage() {
  const [form, setForm] = useState({
    assetType: "",
    assetAmount: "",
    assetAmountType: "",
    currency: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const preparedForm = {
      ...form,
      assetAmount: Number(form.assetAmount),
    };

    const res = await fetch("/api/addAsset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preparedForm),
    });

    if (res.ok) {
      router.push("/");
    } else {
      console.error("خطا در افزودن دارایی");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-200/50 shadow-xl rounded-xl !min-h-screen">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl mb-4">
        <span className="text-3xl mx-2">ایجاد دارایی جدید</span>
        <FormatListBulletedAdd className="!text-5xl text-[#e3b34a]" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mx-8 pb-12">
        <select
          name="assetType"
          className="w-full bg-slate-50 boxShadow border border-[#e3b34a] p-2 rounded"
          value={form.assetType}
          onChange={handleChange}
        >
          <option value="">نام دارایی</option>
          <optgroup label="طلا و سکه">
            <option value="IR_GOLD_18K">طلا ۱۸عیار</option>
            <option value="IR_GOLD_24K">طلا ۲۴عیار</option>
            <option value="IR_COIN_EMAMI">تمام سکه امامی</option>
            <option value="IR_COIN_BAHAR">تمام سکه بهار آزادی</option>
            <option value="IR_COIN_HALF">نیم سکه</option>
            <option value="IR_COIN_QUARTER">ربع سکه</option>
            <option value="IR_COIN_1G">سکه گرمی</option>
          </optgroup>
          <optgroup label="ارز و رمز‌ارز">
            <option value="usd">دلار</option>
            <option value="eur">یورو</option>
            <option value="btc">بیت‌کوین</option>
            <option value="eth">اتریوم</option>
            <option value="usdt">تتر</option>
          </optgroup>
          <optgroup label="بازار سرمایه و ملک">
            <option value="stock">سهام (بورس)</option>
            <option value="real_estate">ملک</option>
          </optgroup>
        </select>

        <select
          name="assetAmountType"
          className="w-full border border-[#e3b34a] bg-slate-50 boxShadow p-2 rounded"
          value={form.assetAmountType}
          onChange={handleChange}
        >
          <option value="">انتخاب واحد دارایی</option>
          <option value="gram">گرم</option>
          <option value="number">عدد</option>
          <option value="share">سهم</option>
          <option value="meter">متر مربع</option>
        </select>

        <input
          name="assetAmount"
          placeholder="مقدار دارایی"
          type="number"
          className="w-full border border-[#e3b34a] bg-slate-50 boxShadow p-2 rounded"
          value={form.assetAmount}
          onChange={handleChange}
        />

        <select
          name="currency"
          className="w-full border border-[#e3b34a] bg-slate-50 boxShadow p-2 rounded"
          value={form.currency}
          onChange={handleChange}
        >
          <option value="IRR">ریال</option>
          <option value="TOMAN">تومان</option>
          <option value="USD">دلار</option>
          <option value="USDT">تتر</option>
        </select>

        <textarea
          name="description"
          placeholder="توضیحات (اختیاری)"
          className="w-full border border-[#e3b34a] bg-slate-50 boxShadow p-2 rounded"
          value={form.description}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-[#234350] text-white px-4 py-2 boxShadow hover:shadow-2xl rounded cursor-pointer hover:bg-blue-700"
        >
          ذخیره
        </button>
      </form>
    </div>
  );
}

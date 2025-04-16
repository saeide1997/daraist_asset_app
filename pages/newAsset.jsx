"use client";

import { useState } from "react";
import Menu from "../components/Menu";
import { useRouter } from "next/navigation";
import { FormatListBulletedAdd } from "@mui/icons-material";

export default function NewAssetPage() {
  const [form, setForm] = useState({
    assetType: "",
    assetAmount: "",
    assetAmountType: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

    const preparedForm = {
      ...form,
      assetAmount: Number(form.assetAmount), // تبدیل به عدد
    };


    // ارسال اطلاعات به API
    const res = await fetch("/api/addAsset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preparedForm),
    });

    if (res.ok) {
      // هدایت به صفحه اصلی در صورت موفقیت
      router.push("/");
    } else {
      console.error("Error in adding asset");
    }
  };
  



  return (
    <div className="max-w-xl mx-auto bg-slate-200/50 shadow-xl rounded-xl !h-screen">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl mb-4">
        <span className="text-3xl mx-2">ایجاد دارایی جدید</span>
        <FormatListBulletedAdd className="!text-5xl text-[#e3b34a]"/>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mx-8">
        <select
          name="assetType"
          className="w-full bg-slate-50 boxShadow border border-[#e3b34a] p-2 rounded"
          value={form.assetType}
          onChange={handleChange}
        >
          <option value="">نام دارایی</option>
          <option value="IR_GOLD_18K">طلا ۱۸عیار</option>
          <option value="IR_GOLD_24K">طلا ۲۴عیار</option>
          <option value="IR_COIN_EMAMI">تمام سکه امامی</option>
          <option value="IR_COIN_BAHAR">تمام سکه بهار آزادی</option>
          <option value="IR_COIN_HALF">نیم سکه</option>
          <option value="IR_COIN_QUARTER">ربع سکه</option>
          <option value="IR_COIN_1G">سکه گرمی</option>
          <option value="usd">دلار</option>
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
        </select>

        <input
          name="assetAmount"
          placeholder="مقدار "
          type="number"
          className="w-full border border-[#e3b34a] bg-slate-50 boxShadow p-2 rounded"
          value={form.assetAmount}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="توضیحات"
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
      <Menu />
    </div>
  );
}

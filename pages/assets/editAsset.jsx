"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EditSquare } from "@mui/icons-material";

export default function NewAssetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get("_id");
  const allParams = {};
  for (const [key, value] of searchParams.entries()) {
    allParams[key] = value;
  }
  console.log(allParams);
  
  
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        // اینجا شناسه را به URL اضافه می‌کنیم
        const response = await fetch(`/api/asset?id=${assetId}`);
        
        if (response.ok) {
          const data = await response.json();
          
          setAssets(data);
        } else {
          setError("خطا در بارگذاری دارایی‌ها");
        }
      } catch (err) {
        setError("خطا در برقراری ارتباط با سرور");
      } finally {
        setLoading(false);
      }
    };

    if (assetId) {
      fetchAssets();
    }
  }, [assetId]);

  if (loading) {
    return (
      <div className="loader-container h-screen flex flex-col justify-center items-center">
        <div className="loader"></div>
        <div className="text-[#234350]">در حال بارگذاری...</div>
      </div>
    );
  }

  const handleChange = (e) => {
    setAssets({ ...assets, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

    const preparedForm = {
      ...assets,
      assetAmount: Number(assets.assetAmount), // تبدیل به عدد
    };

    delete preparedForm._id;

    // ارسال اطلاعات به API
    const res = await fetch("/api/asset", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: assetId, updateData: preparedForm }),
    });
    console.log('res', res);
    

    if (res.ok) {
      // هدایت به صفحه اصلی در صورت موفقیت
      router.push("/assets/list");
    } else {
      console.error("Error in adding asset");
    }
  };
  if (error) {
    return <div>{error}</div>;
  }
  console.log("assets", assets);

  return (
    <div className="max-w-xl mx-auto bg-slate-200/50 shadow-xl rounded-xl !h-screen">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl mb-4">
        <span className="text-3xl mx-2">ویرایش دارایی</span>
        <EditSquare className="!text-5xl text-[#e3b34a]"/>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mx-8">
        <select
          name="assetType"
          className="w-full bg-slate-50 boxShadow border border-[#e3b34a] p-2 rounded"
          value={assets.assetType}
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
          value={assets.assetAmountType}
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
          value={assets.assetAmount}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="توضیحات"
          className="w-full border border-[#e3b34a] bg-slate-50 boxShadow p-2 rounded"
          value={assets.description}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-[#234350] text-white px-4 py-2 boxShadow hover:shadow-2xl rounded cursor-pointer hover:bg-blue-700"
        >
          ویرایش
        </button>
      </form>
    </div>
  );
}

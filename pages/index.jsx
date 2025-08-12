"use client"; // این خط باعث میشه صفحه فقط کلاینتی رندر بشه

import { useEffect, useState } from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import Asset from "../components/Asset";
import { AssetChart } from "../components/AssetChart";
import Link from "next/link";
import { formatNumber } from '../utils/formatNymber';
import { useRouter } from "next/router";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [data, setData] = useState([]);
  const [assets, setAssets] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch("/api/auth/checkToken", {
          credentials: "include",
        });
        const data = await res.json();
        if (!data.valid) {
          router.push("/login");
        }
      } catch (err) {
        console.error("Token check error", err);
        router.push("/login");
      }
    };

    if (hasMounted) {
      checkToken();
    }
  }, [hasMounted, router]);

  useEffect(() => {
    if (hasMounted) {
      setIsOnline(navigator.onLine);

      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, [hasMounted]);

  useEffect(() => {
    if (isOnline) {
      const fetchAssets = async () => {
        try {
          const response = await fetch("/api/assets", {
            method: "GET",
            credentials: "include",
          });

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

      const fetchPrices = async () => {
        try {
          const response = await fetch("/api/prices");

          if (response.ok) {
            const data = await response.json();
            setPrices(data);
          } else {
            setError("خطا در بارگذاری قیمت‌ها");
          }
        } catch (err) {
          setError("خطا در برقراری ارتباط با سرور");
        } finally {
          setLoading(false);
        }
      };

      const fetchStats = async () => {
        try {
          const res = await fetch("/api/stats");
          const json = await res.json();
          setData(json);
          console.log('stat', json);
        } catch (err) {
          console.error('Error fetching stats', err);
        }
      };

      fetchAssets();
      fetchPrices();
      fetchStats();

      fetch("/api/saveTotalAsset"); // ذخیره مجموع دارایی بدون نیاز به صبر
    }
  }, [isOnline]);

  if (!hasMounted) {
    return null; // جلوگیری از mismatch
  }

  if (!isOnline) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#234350] mb-4">اتصال اینترنت برقرار نیست</div>
          <div className="text-lg text-gray-500">لطفاً اینترنت خود را وصل کنید تا ادامه دهید.</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loader-container h-screen flex flex-col justify-center items-center">
        <div className="loader"></div>
        <div className="text-[#234350]">در حال بارگذاری...</div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  let totalValue = 0;

  assets.forEach((item) => {
    const price = prices?.gold?.find((itemm) => itemm.symbol === item.assetType);
    if (!price) return;
    const value = item.assetAmount * price?.price;
    totalValue += value;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-200/50">
      <div className="bg-[#234350] h-24 mb-3 text-white flex justify-center items-center rounded-b-4xl">
        <span className="text-3xl mx-2">دارایی‌های من</span>
        <div>
          <SavingsIcon className="!text-5xl text-[#e3b34a]" />
        </div>
      </div>

      <div className="flex-grow py-2 grid gap-2">
        {assets.slice(0, 3).map((item, index) => {
          let assetType = "";
          let assetAmountType = "";
          let value = 0;

          switch (item.assetType) {
            case "IR_GOLD_18K":
              assetType = "طلا ۱۸ عیار";
              break;
            case "IR_GOLD_24K":
              assetType = "طلا ۲۴ عیار";
              break;
            case "IR_COIN_EMAMI":
              assetType = "سکه امامی";
              break;
            case "IR_COIN_BAHAR":
              assetType = "سکه بهار آزادی";
              break;
            case "IR_COIN_HALF":
              assetType = "نیم سکه";
              break;
            case "IR_COIN_QUARTER":
              assetType = "ربع سکه";
              break;
            case "IR_COIN_1G":
              assetType = "گرمی سکه";
              break;
            case "usd":
              assetType = "دلار";
              break;
            default:
              assetType = item.assetType;
          }

          switch (item.assetAmountType) {
            case "gram":
              assetAmountType = "گرم";
              break;
            case "number":
              assetAmountType = "عدد";
              break;
            default:
              assetAmountType = item.assetAmountType;
          }

          const price = prices?.gold?.find((itemm) => itemm.symbol === item.assetType);
          if (!price) return null;

          value = item.assetAmount * price?.price;
          return (
            <Asset
              key={item._id || index}
              amount={assetType}
              assType={formatNumber(item.assetAmount)}
              amountType={assetAmountType || "واحد"}
              asset={formatNumber(value)+' تومان'}
            />
          );
        })}
      </div>

      {/* جمع کل دارایی */}
      <div className="bg-[#234350] h-16 mx-4 mb-3 text-white flex justify-center items-center boxShadow rounded-4xl">
        <span className="text-lg mx-2">جمع کل دارایی بروز: </span>
        <span className="text-xl">{formatNumber(totalValue)}</span>
        <span className="text-xl mx-1">تومان</span>
      </div>

      {/* نمودار دارایی */}
      <div className="boxShadow mx-4 mb-3">
        <AssetChart />
      </div>

      {/* دکمه افزودن دارایی */}
      <div className="mb-4">
        <Link href="/assets/newAsset">
          <div className="bg-[#e3b34a] h-16 mx-4 text-white flex justify-center items-center boxShadow rounded-4xl text-2xl font-bold">
            افزودن دارایی جدید
          </div>
        </Link>
      </div>

      {/* منو پایین صفحه */}
      <div className="h-[90px]"></div>
    </div>
  );
}

import { EditSquare, FormatListBulleted, RemoveCircleOutline } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatNumber } from '../../utils/formatNymber';
import InflationAssetChart from '../../components/clcAssetChange';

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch("/api/assets");
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

    fetchAssets();
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/prices");

        if (response.ok) {
          const data = await response.json();
          setPrices(data);
        } else {
          setError("خطا در بارگذاری دارایی‌ها");
        }
      } catch (err) {
        setError("خطا در برقراری ارتباط با سرور");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm("آیا مطمئن هستید که می‌خواهید این دارایی را حذف کنید؟");
  
    if (!confirmDelete) return;
  
    try {
      const res = await fetch("/api/asset", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id:id }),
      });
  
      if (res.ok) {
        setAssets((prev) => prev.filter((item) => item._id !== id));
      } else {
        setError("خطا در حذف دارایی");
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور");
    }
  };

  if (loading) {
    return (
      <div className="loader-container h-screen flex flex-col justify-center items-center">
        <div className="loader"></div>
        <div className="text-[#234350]">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-200/50">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl">
        <span className="text-3xl mx-2">لیست دارایی‌ها</span>
        <div>
          <FormatListBulleted className="!text-5xl text-[#e3b34a]" />
        </div>
      </div>
      <div className="flex-grow grid gap-5 mt-4">
        {assets.map((item, index) => {
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
              assetType = " سکه گرمی";
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

          const price = prices?.gold?.find(
            (itemm) => itemm.symbol == item.assetType
          );

          if (!price) return;

          value = item.assetAmount * price?.price;

          return (
            <div
              key={index}
              className="h-24 px-4 boxShadow rounded-2xl bg-white mx-4 text-[#234350] flex justify-center items-start"
            >
              <div className="h-24 flex flex-col w-5/6 justify-center items-start">
                <div className="w-5/6">
                  <div className="flex w-full mb-3">
                    <div className="w-1/5 text-2xl font-bold">
                      {formatNumber(item.assetAmount)}
                    </div>
                    <div className="w-4/5 text-2xl font-bold">{assetType}</div>
                  </div>
                  <div className="flex w-full">
                    <div className="w-1/5 ">{assetAmountType}</div>
                    <div className="w-4/5">= {formatNumber(value)+' تومان'}</div>
                  </div>
                </div>
              </div>
              <div className="h-24 w-1/6 flex justify-center items-center">
                <Link
                  href={{
                    pathname: "/assets/editAsset",
                    query: {
                      type: item.assetType,
                      amount: item.assetAmount,
                      amountType: item.assetAmountType,
                      _id: item._id,
                    },
                  }}
                >
                  <EditSquare className="!text-2xl ml-2 text-[#e3b34a]" />
                </Link>
                <RemoveCircleOutline
                  className="!text-2xl text-red-400 cursor-pointer"
                  onClick={() => deleteHandler(item._id)}
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* منو پایین صفحه */}
      <div className="h-[90px]"></div>
    </div>
  );
}

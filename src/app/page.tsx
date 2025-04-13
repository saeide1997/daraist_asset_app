// pages/index.tsx

import Image from "next/image";
import SavingsIcon from "@mui/icons-material/Savings";
import Asset from "./components/Asset";
import { AssetChart } from "./components/AssetChart";
import Menu from "./components/Menu";
import { getAssets, fetchMarketPrices } from "./lib/actions";
import { AssetType } from "./types/asset";
import Link from "next/link";
import data from './data.js';

export default async function Home() {
  const assets: AssetType[] = await getAssets();
  const prices = data //await fetchMarketPrices();
  // console.log(prices);

  let totalValue = 0;

  assets.forEach((item) => {
    const price = prices?.gold?.find(itemm=> itemm.symbol == item.assetType); // قیمت واحد
console.log('price',price);

    if (!price) return; // اگر قیمت برای اون دارایی نبود، رد کن

    const value = item.assetAmount * price?.price; // ارزش دارایی
    totalValue += value;
  });

  return (
    <div className="grid gap-3 !h-[calc(100vh-8rem)] bg-slate-200/50">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl">
        <span className="text-3xl mx-2">دارایی‌های من</span>
        <div>
          <SavingsIcon className="!text-5xl" />
        </div>
      </div>

      <div className="py-2 grid gap-2">
        {assets.slice(0, 3).map((item, index) => {
          let assetType = "";
          let assetAmountType = "";

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

          return (
            <Asset
              key={item._id || index}
              amount={assetType}
              assType={item.assetAmount}
              amountType={assetAmountType || "واحد"}
              asset="0"
            />
          );
        })}
      </div>

      <div className="bg-[#234350] h-16 mx-4 text-white flex justify-center items-center boxShadow rounded-4xl">
        <span className="text-lg mx-2">جمع کل دارایی بروز: </span>
        <span className="text-xl">{totalValue}</span>
        <span className="text-xl mx-1">ریال</span>
      </div>

      <div className="boxShadow mx-4">
        <AssetChart />
      </div>

      <div>
        <Link href="/newAsset">
          <div className="bg-[#e3b34a] h-16 mx-4 text-white flex justify-center items-center boxShadow rounded-4xl text-2xl font-bold">
            افزودن دارایی جدید
          </div>
        </Link>
      </div>

      <Menu />
    </div>
  );
}
